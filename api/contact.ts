import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory rate limiter (for single instance)
// For production with multiple instances, consider Vercel KV or Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
};

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Clean up expired entries
  if (record && now > record.resetTime) {
    rateLimitMap.delete(identifier);
  }

  const current = rateLimitMap.get(identifier) || {
    count: 0,
    resetTime: now + RATE_LIMIT.windowMs,
  };

  if (current.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  current.count++;
  rateLimitMap.set(identifier, current);

  return { allowed: true, remaining: RATE_LIMIT.maxRequests - current.count };
}

function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function validateString(value: unknown, minLength: number, maxLength: number): boolean {
  return typeof value === 'string' && value.length >= minLength && value.length <= maxLength;
}

async function createGitHubIssue(message: string, contact: string, metadata: any) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration missing');
  }

  const sanitizedMessage = sanitizeInput(message);
  const sanitizedContact = contact ? sanitizeInput(contact) : 'Not provided';

  // Build issue body with metadata
  const issueBody = `## 💬 Message

${sanitizedMessage}

---

## 📋 Contact Information

${sanitizedContact}

---

## 🔍 Debug Information

- **Page URL**: ${metadata.pageUrl || 'Unknown'}
- **Timestamp**: ${metadata.timestamp || new Date().toISOString()}
- **User Agent**: ${metadata.userAgent || 'Unknown'}
- **Screen**: ${metadata.screenResolution || 'Unknown'}
- **Viewport**: ${metadata.viewport || 'Unknown'}

${metadata.recentErrors && metadata.recentErrors.length > 0 ? `---

## ⚠️ Recent Errors

\`\`\`
${metadata.recentErrors.join('\n\n')}
\`\`\`
` : ''}

---

_This issue was automatically created from the website contact form._`;

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: '[Contact] New message from website',
      body: issueBody,
      labels: ['💬 contact', '🤖 automated'],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
  }

  return await response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Rate limiting based on IP
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    const identifier = Array.isArray(ip) ? ip[0] : ip;

    const rateLimit = checkRateLimit(identifier);

    if (!rateLimit.allowed) {
      return res.status(429).json({
        success: false,
        error: 'Too many submissions. Please try again later.',
      });
    }

    // Parse and validate input
    const { message, contact, metadata } = req.body;

    if (!validateString(message, 1, 5000)) {
      return res.status(400).json({
        success: false,
        error: 'Message must be between 1 and 5000 characters',
      });
    }

    if (contact && !validateString(contact, 0, 200)) {
      return res.status(400).json({
        success: false,
        error: 'Contact info must be less than 200 characters',
      });
    }

    // Create GitHub issue
    const issue = await createGitHubIssue(message, contact, metadata || {});

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      issueUrl: issue.html_url,
    });
  } catch (error) {
    console.error('Error creating GitHub issue:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    });
  }
}
