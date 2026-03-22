# PWA Icons

This directory should contain app icons in various sizes for the Progressive Web App.

## Required Sizes

### Standard Icons (purpose: "any")
- icon-72.png (72x72)
- icon-96.png (96x96)
- icon-128.png (128x128)
- icon-144.png (144x144)
- icon-152.png (152x152)
- icon-192.png (192x192) - **Required for PWA**
- icon-384.png (384x384)
- icon-512.png (512x512) - **Required for PWA**

### Maskable Icons (purpose: "maskable")
- icon-192-maskable.png (192x192)
- icon-512-maskable.png (512x512)

## How to Create Icons

### Option 1: Use Online Generator
1. Visit https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload a square image (at least 512x512px)
3. Download all generated sizes
4. Place them in this directory

### Option 2: Create with Design Tool
1. Create a square design in Figma/Photoshop/Illustrator
2. Design should work at small sizes (simple, bold shapes)
3. Export as PNG in all required sizes
4. Use safe zone for maskable icons (80% of canvas)

### Option 3: Simple Text/Initial Icon
For a quick placeholder, create a simple icon with your initials:
- Black background (#000000)
- White text "HB" centered
- Simple, readable font
- Export in all sizes

### Maskable Icons
Maskable icons need extra padding because different platforms may crop them:
- Keep important content in the center 80% of the canvas
- Use the full canvas for background color/pattern
- Test at https://maskable.app/

## Temporary Placeholder

Until you create proper icons, the PWA will still work but won't have custom app icons. The browser will use a default icon or screenshot of your site.

## Icon Design Tips
- Use high contrast (your black/white theme works great)
- Keep it simple and recognizable at small sizes
- Consider using:
  - Your initials "HB"
  - A geometric shape
  - An abstract symbol
  - A simplified logo
- Make sure it's distinguishable from other apps
