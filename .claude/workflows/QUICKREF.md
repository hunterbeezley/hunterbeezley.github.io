# Workflow Quick Reference

## 🚀 Start Workflow

```bash
# Tell Claude to start
"Claude, run the GitHub issue workflow in managed mode"
# or
"Claude, run the GitHub issue workflow in vibe mode"
```

## 📊 Check Status

```bash
.claude/workflows/issue-workflow.sh status
```

## ▶️ Continue After 5 Issues

```bash
.claude/workflows/issue-workflow.sh continue
# or tell Claude
"Continue with the next batch of issues"
```

## 🛑 Stop Workflow

```bash
.claude/workflows/issue-workflow.sh stop
```

## 🔒 Run Security Audit

```bash
.claude/workflows/issue-workflow.sh audit
```

## 🔄 Change Mode

```bash
# Switch to automated
.claude/workflows/issue-workflow.sh set-mode automated

# Switch to managed
.claude/workflows/issue-workflow.sh set-mode managed
```

## 📋 View Issues

```bash
# Fetch and display
.claude/workflows/issue-workflow.sh fetch

# Or use gh directly
gh issue list --state open
```

## 🔢 Manual Counter Control

```bash
# Reset counter
.claude/workflows/issue-workflow.sh reset

# Increment counter (used by Claude)
.claude/workflows/issue-workflow.sh increment
```

---

## ⚡ Key Rules

1. **Close issues after fixing** (unless phased/iterative work)
2. **One issue at a time** - Complete before moving to next
3. **5-issue limit** - Mandatory pause to prevent runaway work
4. **Security audits** - Mandatory in automated mode before push

---

## Mode Comparison

| Feature | Managed | Vibe Mode 🎵 |
|---------|---------|--------------|
| Workflow Approvals | ✅ Yes | ❌ No |
| Tool Approvals (Claude Code) | ✅ Yes | ✅ Yes* |
| Close Issues After Fix | ✅ **ALWAYS** | ✅ **ALWAYS** |
| Security Audits | As needed | ✅ **MANDATORY** |
| 5-Issue Limit | ✅ **MANDATORY** | ✅ **MANDATORY** |
| Speed | Slower | Faster |
| Safety | High | High (with checks) |

*Tool approvals are Claude Code system-level prompts that cannot be bypassed

## Priority Levels

- **P0**: 🔴 Critical (security, site broken)
- **P1**: 🟠 High (accessibility, UX, SEO)
- **P2**: 🟡 Medium (features, content)
- **P3**: 🟢 Low (nice-to-have)

## Security Checks

✅ Secrets (passwords, API keys, tokens)
✅ Sensitive files (.env, credentials)
✅ Unsafe code (eval, innerHTML)
✅ Internal URLs (localhost, private IPs)
✅ Debug code (console.log)

---

**Pro Tip**: Start with managed mode to learn the workflow, then switch to vibe mode to just vibe through issues! 🎵
