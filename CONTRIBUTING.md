# Contributing to hunterbeezley.github.io

This document outlines the workflow for managing work on this portfolio website.

## GitHub Issues Workflow

**Rule: Create a GitHub issue for every to-do item before starting work.**

### Benefits
- ✅ Trackable progress with clear history
- ✅ Organized backlog and priorities
- ✅ Clear documentation for future reference
- ✅ Easy collaboration and feedback
- ✅ Professional portfolio showcase

## Process

### 1. Creating Issues

Before implementing anything new:

```bash
gh issue create --title "Feature/fix title" \
  --body "Description of work" \
  --label "enhancement"
```

**Issue Template:**
```markdown
## Problem
Describe what needs to be solved or improved

## What's Needed
List specific tasks or requirements

## Acceptance Criteria
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
```

### 2. Working on Issues

**Reference issues in commits:**
```bash
git commit -m "Implement feature

Resolves #123

- Detail 1
- Detail 2

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Keywords that auto-close issues:**
- `Resolves #123`
- `Fixes #123`
- `Closes #123`

### 3. Closing Issues

**With a comment:**
```bash
gh issue close 123 --comment "Completed. Details about the implementation..."
```

**What to include in closing comment:**
- Summary of what was done
- Any notable changes or decisions
- Links to relevant commits
- Testing notes or considerations

## Labels

Use these labels to categorize issues:

| Label | Description | Use When |
|-------|-------------|----------|
| `bug` | Something is broken | Fixing errors, broken features |
| `enhancement` | New feature or improvement | Adding functionality, improving UX |
| `documentation` | Docs updates | README, guides, comments |
| `accessibility` | A11y improvements | Screen readers, keyboard nav, ARIA |
| `seo` | SEO/discoverability | Meta tags, sitemap, structured data |
| `performance` | Performance optimization | Speed, bundle size, loading times |
| `design` | Visual design | Colors, layout, typography |
| `content` | Content updates | Text, images, copy writing |
| `ux` | User experience | Interactions, flows, usability |
| `question` | Needs discussion | Decisions, clarifications |
| `feedback` | User feedback | Issues from feedback form |

## Examples

### Good Issue
```markdown
Title: Add dark mode toggle to settings

## Problem
Users have requested ability to switch between light and dark themes.
Current site only supports dark theme.

## What's Needed
1. Create theme toggle component
2. Implement light theme CSS variables
3. Store preference in localStorage
4. Add toggle to navigation menu

## Acceptance Criteria
- [ ] Toggle button in navigation
- [ ] Light theme styles defined
- [ ] Preference persists across sessions
- [ ] Respects prefers-color-scheme
- [ ] Smooth transition between themes
```

### Good Commit Message
```
Add dark mode toggle to navigation

Resolves #42

- Create theme toggle component with sun/moon icons
- Define light theme CSS variables
- Store theme preference in localStorage
- Add smooth transitions between themes
- Respect system prefers-color-scheme on first visit

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Good Closing Comment
```
Implemented dark mode toggle!

Changes:
- Toggle button appears in top-right of navigation
- Smooth fade transition between themes (0.3s)
- Preference saved to localStorage
- Defaults to system preference on first visit
- All pages respect the selected theme

Tested on Chrome, Firefox, Safari (desktop and mobile).

Deployed in commit abc123f
```

## Issue Management

### Triaging Issues
- Review new issues regularly
- Add appropriate labels
- Ask clarifying questions if needed
- Close duplicates or outdated issues

### Prioritization
Use these guidelines:
1. **Critical bugs** - Fix immediately
2. **User-reported feedback** - High priority
3. **Accessibility issues** - High priority
4. **Quick wins** - Do when time allows
5. **Nice-to-haves** - Backlog

### Keeping Issues Updated
- Comment with progress updates on long-running work
- Update issue description if scope changes
- Link related issues
- Add screenshots/videos when relevant

## Automation

### Issue Templates
Create issue templates in `.github/ISSUE_TEMPLATE/`:
- `bug_report.md` - For bug reports
- `feature_request.md` - For new features
- `feedback.md` - For user feedback

### GitHub Actions
Consider automating:
- Auto-labeling based on title/content
- Stale issue detection
- Auto-close on PR merge
- Deployment notifications

## Best Practices

### DO ✅
- Create issues before starting work
- Write clear, actionable descriptions
- Include acceptance criteria
- Reference issues in commits
- Close issues with detailed comments
- Update issues with progress
- Use labels consistently

### DON'T ❌
- Start work without an issue
- Create vague issues like "fix stuff"
- Leave issues open after completion
- Close without explanation
- Mix multiple unrelated changes in one issue

## Tools

### GitHub CLI
```bash
# List issues
gh issue list --state open

# View issue
gh issue view 123

# Create issue
gh issue create --title "Title" --body "Body" --label "enhancement"

# Close issue
gh issue close 123 --comment "Done!"

# Reopen issue
gh issue reopen 123
```

### Git Commands
```bash
# Commit with issue reference
git commit -m "Fix bug (#123)"

# Push and auto-close issue
git commit -m "Fix bug\n\nResolves #123"
git push
```

## Questions?

For questions about this workflow or the project:
- Open an issue with the `question` label
- Use the feedback button on the website
- Reach out via social media links on the site

---

**Last Updated:** March 22, 2026
**Maintained By:** Hunter Beezley
