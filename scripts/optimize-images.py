#!/usr/bin/env python3
"""Build WebP copies of every JPG/PNG under public/images into public/_webp.

server.js serves these automatically to browsers that accept WebP, so page
markup keeps its original /images/... paths. Re-run after adding images:
    python3 scripts/optimize-images.py
"""
import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'public', 'images')
DST = os.path.join(ROOT, 'public', '_webp')
MAX_W = 1920       # hero images
MAX_W_SMALL = 960  # cards, dropdowns, screenshots inside cards
SMALL_DIRS = ('cards', 'sections', 'floralwhispers', 'sparklights', 'thestems', 'whitelight', 'mohaafinest', 'Speakers')

def main():
    made = skipped = 0
    before = after = 0
    for dirpath, _, files in os.walk(SRC):
        for name in files:
            if not name.lower().endswith(('.jpg', '.jpeg', '.png')):
                continue
            src = os.path.join(dirpath, name)
            rel = os.path.relpath(src, SRC)
            dst = os.path.join(DST, rel) + '.webp'
            if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
                skipped += 1
                continue
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            try:
                im = Image.open(src)
            except Exception:
                print(f'  not an image, skipped: {rel}')
                continue
            with im:
                limit = MAX_W_SMALL if rel.split(os.sep)[0] in SMALL_DIRS else MAX_W
                if im.width > limit:
                    im = im.resize((limit, round(im.height * limit / im.width)), Image.LANCZOS)
                has_alpha = im.mode in ('RGBA', 'LA', 'P')
                im = im.convert('RGBA' if has_alpha else 'RGB')
                im.save(dst, 'WEBP', quality=78, method=6)
            before += os.path.getsize(src)
            after += os.path.getsize(dst)
            made += 1
    print(f'webp: {made} built, {skipped} up to date')
    if made:
        print(f'  {before / 1e6:.1f} MB -> {after / 1e6:.1f} MB')

if __name__ == '__main__':
    sys.exit(main())
