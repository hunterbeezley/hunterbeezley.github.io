# Deployment Guide

Quick guide for deploying the serverless contact form.

## First-Time Setup

### 1. Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens/new
2. Give it a descriptive name: "Portfolio Contact Form"
3. Select scope: **`repo`** (Full control of private repositories)
4. Click "Generate token"
5. **Copy and save the token immediately** (you won't see it again)

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Local Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your values:
```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=hunterbeezley
GITHUB_REPO=hunterbeezley.github.io
```

### 4. Test Locally (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally
vercel dev
```

Visit `http://localhost:3000` and test the contact form.

### 5. Deploy to Vercel

```bash
# First deployment
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - What's your project's name? hunterbeezley-portfolio (or keep default)
# - In which directory is your code located? ./
# - Override settings? No
```

### 6. Add Environment Variables to Vercel

**Option A: Via Dashboard**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - `GITHUB_TOKEN`: Your personal access token
   - `GITHUB_OWNER`: `hunterbeezley`
   - `GITHUB_REPO`: `hunterbeezley.github.io`
5. Select all environments (Production, Preview, Development)

**Option B: Via CLI**
```bash
vercel env add GITHUB_TOKEN production
# Paste your token when prompted

vercel env add GITHUB_OWNER production
# Enter: hunterbeezley

vercel env add GITHUB_REPO production
# Enter: hunterbeezley.github.io
```

### 7. Deploy to Production

```bash
vercel --prod
```

## Continuous Deployment

After initial setup, every push to `main` automatically deploys:

```bash
git add .
git commit -m "Update site"
git push origin main
```

Vercel will automatically:
- Build your site
- Deploy to production
- Update your live site

## Testing the Contact Form

1. Visit your live site
2. Click the contact button
3. Fill out and submit the form
4. Check:
   - Success message appears
   - GitHub issue is created in your repo
   - You receive an email notification from GitHub

## Troubleshooting

### Form returns "GitHub configuration missing"
- **Cause:** Environment variables not set in Vercel
- **Fix:** Add `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` in Vercel dashboard

### Form returns "Failed to send message"
- **Cause:** GitHub API error (often invalid token or insufficient permissions)
- **Fix:**
  1. Verify token has `repo` scope
  2. Check token hasn't expired
  3. Verify repo name is correct

### Rate limit exceeded
- **Cause:** More than 5 submissions in 1 hour from same IP
- **Fix:** Wait an hour or test from different IP/network

### Form works locally but not in production
- **Cause:** Environment variables not set in production environment
- **Fix:** Ensure environment variables are added to "Production" environment in Vercel

## Monitoring

### View Logs in Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Deployments → Select latest → View Function Logs
4. Check for errors in `/api/contact` function

### View GitHub Issues
All contact form submissions appear as issues:
https://github.com/hunterbeezley/hunterbeezley.github.io/issues

Filter by label: `💬 contact` or `🤖 automated`

## Security Notes

- ✅ **Never commit `.env` or `.env.local`** to git (already in .gitignore)
- ✅ **Rotate GitHub token periodically** for security
- ✅ **Token only needs `repo` scope**, nothing more
- ✅ **Rate limiting prevents abuse** (5 requests/hour per IP)
- ✅ **Input is validated and sanitized** to prevent XSS attacks

## Cost

Vercel's free Hobby tier includes:
- Unlimited serverless function invocations
- 100GB bandwidth/month
- Automatic HTTPS

Perfect for a personal portfolio site!

## Support

If you run into issues:
1. Check Vercel function logs
2. Verify environment variables are set
3. Test GitHub token with: `curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user`
