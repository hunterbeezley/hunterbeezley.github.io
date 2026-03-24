Place your video files in this directory.

Required files:
================

FULL VIDEOS (for cinematic player):
- creative-coding.mp4
- eemmuu.mp4
- raymarch.mp4
- particleshrooms.mp4

PREVIEW CLIPS (2-3 seconds for thumbnails):
- creative-coding-preview.mp4
- eemmuu-preview.mp4
- raymarch-preview.mp4
- particleshrooms-preview.mp4

Convert .mov to .mp4 with ffmpeg:
==================================

Full video (high quality):
ffmpeg -i input.mov -c:v libx264 -crf 18 -preset slow -c:a aac -b:a 192k output.mp4

Preview clip (first 3 seconds, smaller size):
ffmpeg -i input.mov -t 3 -c:v libx264 -crf 23 -vf scale=854:480 -c:a aac -b:a 128k output-preview.mp4
