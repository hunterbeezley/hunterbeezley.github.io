# Claude Workflows for hunterbeezley.github.io

This directory contains workflows for systematic project management using Claude Code.

## Available Workflows

### GitHub Issue Workflow

**Purpose**: Systematically tackle GitHub issues with built-in safeguards for token usage and security.

**Files**:
- `issue-workflow.md` - Complete workflow documentation
- `issue-workflow.sh` - Helper script for workflow automation

## Quick Start

### 1. Initialize the Workflow

```bash
.claude/workflows/issue-workflow.sh init managed
```

Or for automated mode:

```bash
.claude/workflows/issue-workflow.sh init automated
```

### 2. Start Working on Issues

Ask Claude:

```
Claude, run the GitHub issue workflow in [managed|automated] mode.
```

### 3. Claude Will:

1. ✅ Fetch all open issues from GitHub
2. ✅ Analyze and prioritize them
3. ✅ Work through issues systematically
4. ✅ Close each issue after fixing (unless it's phased work)
5. ✅ Run security audits (automated mode)
6. ✅ Prompt you every 5 completed issues

### 4. Monitor Progress

```bash
# Check workflow status
.claude/workflows/issue-workflow.sh status

# See all open issues
gh issue list --state open

# See recently closed issues
gh issue list --state closed --search "closed:>=$(date -u -v-1d +%Y-%m-%d)"
```

### 5. After 5 Issues

When Claude pauses after 5 completed issues:

```bash
# Continue with more issues
.claude/workflows/issue-workflow.sh continue
```

Or tell Claude:

```
Continue with the next batch of issues.
```

## Workflow Modes

### Managed Mode (Recommended)
- **Approval Required**: Yes, for all actions
- **Security Audits**: As needed
- **Best For**: Regular development, learning, careful review

### Automated Mode (Advanced)
- **Approval Required**: Reduced (skip workflow decisions, but not tool approvals)
- **Security Audits**: **MANDATORY before every push**
- **5-Issue Limit**: **MANDATORY check**
- **Best For**: Streamlined development with safeguards

⚠️ **Limitations**:
- Claude Code's built-in tool approval prompts cannot be bypassed (Write, Edit, Bash operations)
- Automated mode skips workflow-level questions ("should I proceed?") but not system-level safety prompts
- Security checks and 5-issue prompts are never skipped

## Security Features

The workflow includes mandatory security audits that check for:

1. ✅ Hardcoded secrets (passwords, API keys, tokens)
2. ✅ Security-sensitive files (.env, credentials, etc.)
3. ✅ Unsafe code patterns (eval, innerHTML, etc.)
4. ✅ Internal URLs (localhost, private IPs)
5. ✅ Debug code that might leak data

**All checks must pass before pushing in automated mode.**

## Helper Commands

```bash
# Initialize workflow
./issue-workflow.sh init [managed|automated]

# Change mode
./issue-workflow.sh set-mode automated

# Fetch issues
./issue-workflow.sh fetch

# Run security audit manually
./issue-workflow.sh audit

# Mark issue complete (used by Claude)
./issue-workflow.sh increment

# Continue after 5-issue pause
./issue-workflow.sh continue

# Stop workflow
./issue-workflow.sh stop

# Check status
./issue-workflow.sh status

# Reset counter
./issue-workflow.sh reset
```

## Priority System

Issues are automatically prioritized:

- **P0 (Critical)**: Security, major bugs, site broken
- **P1 (High)**: Accessibility, UX, SEO, performance
- **P2 (Medium)**: Features, content, design
- **P3 (Low)**: Code organization, nice-to-haves

## Safeguards

### Built-in Protections

1. **5-Issue Limit**: Prevents runaway development and token exhaustion
2. **Security Audits**: Prevents committing sensitive data
3. **Status Tracking**: Monitor progress and completed work
4. **Clear Documentation**: Commit messages reference issues

### Manual Overrides

If you need to reset or stop:

```bash
# Stop everything
./issue-workflow.sh stop

# Reset counter only
./issue-workflow.sh reset
```

## Troubleshooting

### Workflow stuck or acting strange?

```bash
# Check status
./issue-workflow.sh status

# Reset and restart
./issue-workflow.sh stop
./issue-workflow.sh init managed
```

### Security audit failing?

```bash
# Run audit manually to see details
./issue-workflow.sh audit

# Review changes
git diff main

# Fix issues, then re-run
./issue-workflow.sh audit
```

### Want to change modes?

```bash
./issue-workflow.sh set-mode automated
# or
./issue-workflow.sh set-mode managed
```

## Examples

### Example Session (Managed Mode)

```
You: Claude, run the GitHub issue workflow in managed mode.

Claude:
1. Fetches 10 open issues
2. Prioritizes them (P0-P3)
3. Starts with highest priority
4. Asks approval for each change
5. Commits and pushes with your approval
6. Closes issue
7. After 5 issues: "I've completed 5 issues. Continue?"

You: Continue with the next batch.

Claude: Resets counter and continues...
```

### Example Session (Automated Mode)

```
You: Claude, run the GitHub issue workflow in automated mode.

Claude:
1. Fetches issues
2. Prioritizes
3. Works on issue #1
4. Runs security audit ✅
5. Pushes (no approval needed)
6. Closes issue
7. ... repeats for issues #2-5
8. After 5: "I've completed 5 issues. Continue?"

You: Yes, continue.

Claude: Continues with issues #6-10...
```

## Best Practices

1. **Start in Managed Mode** - Get familiar with the workflow
2. **Close Issues Promptly** - After each fix, close the issue unless it's phased work
3. **Review Automated Work** - Periodically check automated commits
4. **Use Status Command** - Monitor progress regularly
5. **Don't Override Security** - If audit fails, fix the issue
6. **Respect the 5-Issue Limit** - It's there for a reason
7. **One Issue at a Time** - Complete and close before moving to the next

## Need Help?

- Read the full workflow: `issue-workflow.md`
- Check status: `./issue-workflow.sh status`
- Ask Claude: "Explain the issue workflow to me"

---

**Remember**: This workflow is designed to be safe, systematic, and efficient. The safeguards (security audits and 5-issue limit) are non-negotiable in automated mode to protect you and your project.
