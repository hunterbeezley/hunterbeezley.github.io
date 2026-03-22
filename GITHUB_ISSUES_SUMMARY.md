# GitHub Issues Created - Website Improvements

## Summary
Created **31 total issues** tracking all website improvements:
- **6 completed and closed** (priority recommendations already implemented)
- **25 open issues** (to-do items remaining)

## View All Issues
https://github.com/hunterbeezley/hunterbeezley.github.io/issues

---

## ✅ COMPLETED ISSUES (Already Done)

### #25 - Add navigation menu to all pages
- **Labels:** enhancement, accessibility
- **Status:** CLOSED ✅

### #26 - Add SEO meta tags to all pages
- **Labels:** seo, enhancement
- **Status:** CLOSED ✅

### #27 - Implement prefers-reduced-motion support
- **Labels:** accessibility, enhancement
- **Status:** CLOSED ✅

### #28 - Add keyboard navigation support
- **Labels:** accessibility, enhancement
- **Status:** CLOSED ✅

### #29 - Fix broken button on contact page
- **Labels:** bug
- **Status:** CLOSED ✅

### #30 - Create maintenance page
- **Labels:** enhancement
- **Status:** CLOSED ✅

---

## 🔴 HIGH PRIORITY (Action Required Before Go-Live)

### #2 - Update About section with real bio content
- **Labels:** content, enhancement
- **Action:** Replace boilerplate text in index.backup.html
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/2

### #3 - Create and add resume PDF to website
- **Labels:** content, enhancement
- **Action:** Export resume as PDF and place in root directory
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/3

### #4 - Write descriptions for all video projects
- **Labels:** content, documentation
- **Action:** Add descriptions, dates, tools for 4 videos
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/4

---

## 🟡 MEDIUM PRIORITY (SEO & Performance)

### #5 - Implement lazy loading for video embeds
- **Labels:** performance, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/5

### #6 - Create Open Graph preview image for social sharing
- **Labels:** seo, design, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/6

### #7 - Create sitemap.xml for better SEO
- **Labels:** seo, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/7

### #8 - Create robots.txt file
- **Labels:** seo, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/8

### #13 - Add loading indicators for p5.js canvases
- **Labels:** ux, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/13

### #19 - Add build process and minify assets
- **Labels:** performance, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/19

### #20 - Add fallback for CDN dependencies
- **Labels:** bug, performance
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/20

---

## 🟢 ACCESSIBILITY IMPROVEMENTS

### #9 - Add 'Skip to Content' link for accessibility
- **Labels:** accessibility, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/9

### #10 - Test website with screen readers
- **Labels:** accessibility, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/10

### #11 - Add semantic HTML5 structure
- **Labels:** accessibility, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/11

---

## 🎨 DESIGN & UX IMPROVEMENTS

### #12 - Improve UX of bouncing boxes on home page
- **Labels:** ux, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/12

### #15 - Create consistent color palette and brand identity
- **Labels:** design, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/15

### #16 - Design logo and add favicon
- **Labels:** design, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/16

### #24 - Create custom 404 error page
- **Labels:** enhancement, ux
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/24

---

## 📝 CONTENT & FEATURES

### #14 - Add contact form or email link
- **Labels:** enhancement, content
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/14

### #21 - Fix or remove 'Coming Soon' overlay on EEMMUU video
- **Labels:** content, bug
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/21

### #22 - Add skills/tools section to website
- **Labels:** content, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/22

### #23 - Set up website analytics
- **Labels:** enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/23

---

## 🧪 TESTING & QUALITY

### #17 - Test website on real mobile devices
- **Labels:** ux, enhancement
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/17

### #18 - Improve code organization and maintainability
- **Labels:** enhancement, documentation
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/18

---

## 📋 WORKFLOW

### #31 - Establish GitHub Issues workflow for all to-do items
- **Labels:** documentation, enhancement
- **Status:** OPEN (this defines our new workflow)
- **Link:** https://github.com/hunterbeezley/hunterbeezley.github.io/issues/31

---

## Labels Created

The following labels were created for better organization:
- `accessibility` - Accessibility improvements (green)
- `seo` - SEO and discoverability (blue)
- `performance` - Performance and optimization (yellow)
- `design` - Visual design and UI (pink)
- `content` - Content updates and writing (light blue)
- `ux` - User experience improvements (light blue)

Plus standard GitHub labels:
- `bug`, `enhancement`, `documentation`, `question`, etc.

---

## New Workflow Rule

**From now on, we create a GitHub issue for every to-do item before starting work.**

### Process

1. **Before starting any work:**
   ```bash
   gh issue create --title "Feature/fix title" \
     --body "Description of work" \
     --label "appropriate-label"
   ```

2. **When committing:**
   ```bash
   git commit -m "Implement feature (#123)"
   ```

3. **When completing:**
   ```bash
   gh issue close 123 --comment "Completed!"
   ```

---

## Quick Commands

View all open issues:
```bash
gh issue list
```

View issues by label:
```bash
gh issue list --label "content"
gh issue list --label "accessibility"
```

View issues in browser:
```bash
gh issue list --web
```

Create new issue:
```bash
gh issue create --title "Title" --body "Description" --label "label-name"
```

Close issue:
```bash
gh issue close 123 --comment "Completed!"
```

---

## Next Steps

1. **Prioritize issues** - Decide what to work on first
2. **Work on high-priority content** - Issues #2, #3, #4
3. **Follow new workflow** - Always create issues for new to-dos
4. **Reference issues in commits** - Use `#issue-number` in commit messages
5. **Close issues when done** - Document what was completed

---

## View All Issues
🔗 https://github.com/hunterbeezley/hunterbeezley.github.io/issues
