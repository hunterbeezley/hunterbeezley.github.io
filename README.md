# Hunter Beezley - Portfolio Website

Personal portfolio website showcasing creative technology work, generative art, and interactive visual experiences.

🔗 **Live Site:** [hunterbeezley.github.io](https://hunterbeezley.github.io)

## Features

- 🎨 **Clean, Modern Design** - Minimalist aesthetic with animated background video
- 📱 **Progressive Web App** - Installable with offline support
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation and reduced motion support
- 🚀 **Performance Optimized** - Fast loading with optimized assets
- 🎯 **SEO Ready** - Meta tags, Open Graph, sitemap, and structured data
- 💬 **User Feedback** - Built-in feedback system creates GitHub issues
- 🔐 **Admin Workspace** - Password-protected admin dashboard for site management

## Tech Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Graphics:** p5.js for animated feedback button
- **Icons & Assets:** Custom-generated from logo using ImageMagick
- **Hosting:** GitHub Pages
- **Version Control:** Git + GitHub
- **Deployment:** Automatic via GitHub Pages on push to main

## Project Structure

```
.
├── index.html              # Homepage
├── resume.html             # Resume page
├── admin.html              # Admin workspace (password-protected)
├── contact.html            # Contact page
├── 404.html                # Custom 404 error page
├── visuals_1/              # Visual projects showcase
├── icons/                  # PWA icons and favicons
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── pwa-register.js         # Service worker registration
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
└── CONTRIBUTING.md         # Development workflow guide

Static Assets:
├── logo.png                # Site logo
├── favicon.ico             # Browser favicon
├── apple-touch-icon.png    # iOS home screen icon
├── og-image.jpg            # Open Graph preview image
└── background-animation.mp4 # Background video
```

## Development

### Prerequisites

- Git
- Modern web browser
- [GitHub CLI](https://cli.github.com/) (optional, for issue management)
- ImageMagick (optional, for generating icons)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/hunterbeezley/hunterbeezley.github.io.git
   cd hunterbeezley.github.io
   ```

2. **Serve locally**
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Or using Node.js http-server
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Making Changes

Follow the GitHub Issues workflow documented in [CONTRIBUTING.md](CONTRIBUTING.md):

1. Create an issue for your work
2. Make your changes
3. Commit with issue reference: `git commit -m "Description (#issue-number)"`
4. Push to main branch
5. Changes deploy automatically via GitHub Pages

### Admin Access

The admin workspace (`/admin.html`) is password-protected. Default password: `admin`

**⚠️ Change the password in admin.html line 342 for production use.**

## Color Palette

```css
--primary: #00d9ff    /* Cyan - Interactive elements */
--secondary: #ff006e  /* Pink - Accents */
--accent: #ffbe0b     /* Yellow - Tags and special elements */
--bg: #0a0a0a         /* Near-black background */
--text: #ffffff       /* White text */
--text-dim: #a0a0a0   /* Dimmed text */
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## Performance

- ✅ Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3.0s
- ✅ Cumulative Layout Shift: < 0.1

## Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation throughout
- ✅ Screen reader compatible
- ✅ Respects prefers-reduced-motion
- ✅ High contrast ratios (4.5:1 minimum)
- ✅ Semantic HTML5

## Contributing

This is a personal portfolio site, but feedback and suggestions are welcome!

- 💬 Use the feedback button on the site
- 🐛 Report bugs via [GitHub Issues](https://github.com/hunterbeezley/hunterbeezley.github.io/issues)
- 📖 Read the full [Contributing Guide](CONTRIBUTING.md)

## Deployment

The site deploys automatically via GitHub Pages when changes are pushed to the `main` branch.

**Deployment Process:**
1. Push to main: `git push origin main`
2. GitHub Pages builds automatically
3. Changes live in ~1 minute at hunterbeezley.github.io

## License

© 2026 Hunter Beezley. All rights reserved.

The code structure and techniques are available for learning purposes. Please don't copy the content, design, or personal information.

## Contact

- 🌐 Website: [hunterbeezley.github.io](https://hunterbeezley.github.io)
- 📧 Email: contact@hunterbeezley.com
- 💼 LinkedIn: [linkedin.com/in/hunterbeezley](https://www.linkedin.com/in/hunterbeezley/)
- 💻 GitHub: [@hunterbeezley](https://github.com/hunterbeezley)

---

Built with ❤️ and code by Hunter Beezley
