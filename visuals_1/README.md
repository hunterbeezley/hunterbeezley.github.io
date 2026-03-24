# Visuals Page - Cinematic Gallery

A redesigned visual showcase page featuring a cinematic navigation-based gallery for TouchDesigner and creative coding works.

## Features

- **Landing Section**: ASCII art title with animated starfield background
- **Gallery Grid**: Thumbnail previews with hover-to-play functionality
- **Cinematic Player**: Full-screen immersive video viewing experience
- **Keyboard Navigation**: Arrow keys, ESC, spacebar, and 'i' key controls
- **Technical HUD**: Display resolution, FPS, and codec information
- **Responsive Design**: Mobile-friendly with touch support
- **Glassmorphism UI**: Modern frosted-glass aesthetic

## Video Files Required

Create a `videos/` directory in the `visuals_1/` folder and add your video files:

### Full Videos (for cinematic player):
- `creative-coding.mp4`
- `eemmuu.mp4`
- `raymarch.mp4`
- `particleshrooms.mp4`

### Preview Clips (for gallery thumbnails):
- `creative-coding-preview.mp4` (2-3 seconds, small file size)
- `eemmuu-preview.mp4`
- `raymarch-preview.mp4`
- `particleshrooms-preview.mp4`

## Video Conversion Tips

Convert .mov to .mp4 for better web performance:

```bash
# High quality full video
ffmpeg -i input.mov -c:v libx264 -crf 18 -preset slow -c:a aac -b:a 192k output.mp4

# Small preview clip (first 3 seconds)
ffmpeg -i input.mov -t 3 -c:v libx264 -crf 23 -vf scale=854:480 -c:a aac -b:a 128k output-preview.mp4
```

## Adding/Removing Videos

Edit the `videoData` array in `scripts.js`:

```javascript
const videoData = [
    {
        id: 0,
        title: "Your Video Title",
        description: "Description of your work...",
        meta: "2024 | TouchDesigner, GLSL",
        videoSrc: "videos/your-video.mp4",
        previewSrc: "videos/your-video-preview.mp4",
        res: "1920x1080",
        fps: "60",
        codec: "H.264"
    },
    // Add more videos here
];
```

Then update the HTML in `index.html` to add corresponding gallery items.

## Controls

### Gallery:
- **Hover**: Preview plays in loop
- **Click**: Opens cinematic player

### Cinematic Player:
- **ESC**: Close player
- **Arrow Left/Right**: Navigate between videos
- **Spacebar**: Play/pause
- **i**: Toggle info panel
- **Click X button**: Close player
- **Click outside video**: Close player

## File Structure

```
visuals_1/
├── index.html          # Main HTML structure
├── styles.css          # All styling (gallery + cinematic mode)
├── scripts.js          # Interactive functionality
├── README.md          # This file
└── videos/            # Video files (you need to create this)
    ├── *.mp4          # Full videos
    └── *-preview.mp4  # Thumbnail previews
```

## Technical Details

- **Framework**: Vanilla JavaScript with p5.js for starfield
- **Video Format**: MP4 (H.264 codec recommended)
- **Responsive**: Breakpoints at 1024px, 768px, and 480px
- **Accessibility**: Reduced motion support, keyboard navigation, ARIA labels
- **Performance**: Lazy loading, thumbnail previews, efficient animations

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- WebGL shader effects overlay
- Fullscreen API integration
- Video scrubbing timeline
- Social sharing buttons
- Lightbox zoom on info cards
