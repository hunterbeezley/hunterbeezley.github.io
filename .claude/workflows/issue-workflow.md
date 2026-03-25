# GitHub Issue Workflow

## Purpose
This workflow systematically tackles GitHub issues for the hunterbeezley.github.io project with built-in safeguards for token usage and security.

## Modes

### Managed Mode (Default)
- User must approve all actions
- Standard Claude Code behavior
- Suitable for regular development

### Vibe Mode 🎵
- Reduces approval requests for workflow decisions
- Works through issues systematically without asking "should I proceed?"
- Just vibes through the work with minimal interruption
- **IMPORTANT**: Cannot bypass Claude Code's built-in tool approval prompts (Write, Edit, Bash, etc.)
- **MANDATORY**: Security audit before every push
- **MANDATORY**: Prompt user after every 5 completed issues
- Use for streamlined development with safeguards

**Limitation**: Claude Code may still show system-level approval prompts for file operations and git commands. These safety mechanisms cannot be bypassed by the workflow.

## Workflow Steps

### 1. Initialize
```bash
# Set mode (managed or vibe)
MODE="managed"  # or "vibe"
COMPLETED_COUNT=0
```

### 2. Fetch All Issues
```bash
gh issue list --limit 100 --json number,title,state,labels,assignees,milestone,createdAt,updatedAt --state open
```

### 3. Priority Assessment

Analyze each issue and assign priority:

**P0 (Critical) - Security, major bugs, site broken**
- Security vulnerabilities
- Site unavailable or critically broken
- Data loss potential

**P1 (High) - User-facing issues**
- Accessibility issues
- Major UX problems
- SEO issues affecting discoverability
- Performance degradation

**P2 (Medium) - Enhancements**
- New features
- Content updates
- Design improvements
- Documentation

**P3 (Low) - Nice-to-have**
- Code organization
- Future improvements
- Non-critical polish

### 4. Issue Prioritization Matrix

Consider these factors for each issue:
1. **Labels**: bug > accessibility > enhancement
2. **User Impact**: High (all users) > Medium (some users) > Low (edge cases)
3. **Effort**: Quick wins (< 1 hour) boost priority
4. **Dependencies**: Blocking other issues increases priority
5. **Age**: Older issues slightly elevated

### 5. Execute Issues Iteratively

For each issue (in priority order):

#### A. Read Issue Details
```bash
gh issue view <number> --json title,body,labels,comments
```

#### B. Understand Context
- Read relevant code files
- Check related issues/PRs
- Understand dependencies

#### C. Implement Solution
- Make necessary code changes
- Test changes locally if possible
- Follow project conventions

#### D. Commit Changes
```bash
git add <files>
git commit -m "<type>: <description> (fixes #<issue>)

<detailed explanation>"
```

**Commit Types:**
- `fix:` for bug fixes
- `feat:` for new features
- `docs:` for documentation
- `style:` for design/visual changes
- `refactor:` for code improvements
- `perf:` for performance improvements
- `test:` for testing
- `chore:` for maintenance

#### E. Security Audit (VIBE MODE ONLY - MANDATORY)

Before pushing, run security checks:

```bash
# Check for sensitive data
echo "=== SECURITY AUDIT ==="
echo "Checking for sensitive data..."

# Scan for common secrets
git diff main | grep -i -E "(password|secret|api[_-]?key|token|credential|private[_-]?key|auth)" && echo "⚠️  WARNING: Possible sensitive data detected" || echo "✓ No obvious secrets found"

# Check for security-sensitive files
git diff main --name-only | grep -E "(\.env|config\.json|secrets\.|credentials\.|private)" && echo "⚠️  WARNING: Security-sensitive files modified" || echo "✓ No sensitive files in changes"

# Check for suspicious patterns in new code
git diff main | grep -E "(eval\(|exec\(|innerHTML|dangerouslySetInnerHTML)" && echo "⚠️  WARNING: Potentially unsafe code patterns" || echo "✓ No obvious unsafe patterns"

# Verify no hardcoded URLs to internal systems
git diff main | grep -E "https?://(localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)" && echo "⚠️  WARNING: Internal URLs detected" || echo "✓ No internal URLs found"

echo "=== AUDIT COMPLETE ==="
```

**If ANY warnings appear:**
1. Review the flagged content
2. Remove or sanitize sensitive data
3. Re-run audit
4. Only proceed when clean

#### F. Push Changes

```bash
# Push changes
git push origin main
```

#### G. Close Issue (MANDATORY)

**IMPORTANT**: After every push and issue fix, the issue MUST be closed before moving to the next issue.

**Exception**: Only keep an issue open if it is explicitly phased/iterative work that will be completed over multiple sessions.

```bash
# Close issue with comment
gh issue close <number> --comment "✅ Completed in commit <sha>

Changes made:
- <summary of changes>

Tested: <testing notes>"
```

**Decision Tree for Closing Issues:**

```
Is the issue fixed?
├─ YES: Is this a phased/iterative issue with more work planned?
│      ├─ YES: Add progress comment, leave OPEN, note in session log
│      └─ NO: CLOSE THE ISSUE immediately
└─ NO: Continue working on it (don't move to next issue)
```

**Examples of phased/iterative issues:**
- "Build out 'Apps' showcase page" - Multiple apps to add over time
- "Improve code organization" - Ongoing refactoring across multiple files
- "Set up website analytics" - Multiple analytics tools/features to add

**Examples that should be CLOSED immediately:**
- "Fix broken button on contact page" - One-time fix
- "Add favicon" - One-time addition
- "Create 404 page" - One-time creation
- Most bug fixes, feature additions, and content updates

#### H. Increment Counter
```bash
COMPLETED_COUNT=$((COMPLETED_COUNT + 1))
```

**Note**: Increment counter whether issue is closed OR left open (for phased work). The counter tracks completed work items, not just closed issues.

#### I. Check Counter (MANDATORY - ALL MODES)

```bash
if [ $COMPLETED_COUNT -ge 5 ]; then
    echo "=== 5 ISSUES COMPLETED ==="
    echo "Issues completed this session: $COMPLETED_COUNT"
    echo ""
    echo "PAUSING FOR USER CONFIRMATION"
    echo "Continue with more issues? (prevents runaway tokens/development)"

    # MUST prompt user here
    # Reset counter after user confirms continuation
    COMPLETED_COUNT=0
fi
```

### 6. Loop Until Complete

Return to Step 5 until:
- All prioritized issues are complete
- User requests stop
- 5-issue limit reached (must get user approval to continue)

## Safety Rules

### Vibe Mode Requirements
1. ✅ **ALWAYS** run security audit before pushing
2. ✅ **ALWAYS** prompt after 5 completed issues
3. ✅ **NEVER** skip security checks
4. ✅ **NEVER** push without audit passing
5. ✅ **NEVER** commit credentials, API keys, tokens
6. ✅ **NEVER** proceed if audit shows warnings without resolution

### General Rules
1. **ALWAYS** close issues after fix is pushed (unless phased/iterative work)
2. Test changes before committing
3. Write clear commit messages
4. Reference issue numbers in commits (e.g., "fixes #42")
5. Add detailed comments to issues when closing
6. Keep changes focused per issue
7. Don't combine unrelated changes
8. Verify git status before commits
9. Move to next issue only after current issue is closed OR marked for phased work

## Usage

To start the workflow:

```
Claude, run the GitHub issue workflow in [managed|vibe] mode.
```

To resume after 5-issue pause:

```
Continue with the next batch of issues.
```

To stop:

```
Stop the workflow.
```

## Monitoring

Track progress with:
```bash
# See completed issues today
gh issue list --state closed --search "closed:>=$(date -u -v-1d +%Y-%m-%d)"

# See remaining open issues
gh issue list --state open

# Check recent commits
git log --oneline -10
```

## Emergency Stop

If something goes wrong:
1. Stop the workflow immediately
2. Review recent commits: `git log -5`
3. Review recent changes: `git diff HEAD~5`
4. Rollback if needed: `git reset --hard HEAD~1`
5. Force push if already pushed: `git push --force origin main` (USE WITH CAUTION)

## Notes

- This workflow is designed for personal projects
- Automated mode is powerful but requires vigilance
- Security audits are non-negotiable
- The 5-issue limit prevents token exhaustion
- Always review automated changes periodically
