#!/usr/bin/env python3
"""Build branded 1200x630 share images (Open Graph) into public/images/og.

    python3 scripts/build-og-images.py

server.js picks /images/og/<name>.png for each path in OG_IMAGES; other pages use default.png.
Fonts: Outfit and Figtree (SIL Open Font License) in scripts/fonts.
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'images', 'og')
FONTS = os.path.join(ROOT, 'scripts', 'fonts')
NAVY, DEEP, ORANGE, CYAN, MUTED = (36, 48, 72), (20, 29, 46), (243, 146, 35), (27, 169, 191), (201, 211, 224)

# name: (eyebrow, headline)
CARDS = {
    'default': ('Cres Dynamics Ltd · Nairobi', 'AI systems, business operating systems and websites that run companies'),
    'ai-systems': ('AI systems', 'AI systems for companies in Kenya'),
    'ai-forecasting': ('AI forecasting', 'Predict the next 3 to 6 months. Tell directors what to do.'),
    'logistics-ai': ('Logistics AI', 'Know what to stock, what to discount, and what is about to go bad'),
    'school-management-system': ('Education', 'School management system for Kenyan schools'),
    'business-operating-system': ('Business OS', 'One platform that runs your business and thinks ahead'),
    'cresos': ('CresOS', 'One system. Every department.'),
    'websites': ('Websites', 'High-end website design in Kenya'),
    'e-commerce': ('Ecommerce', 'Ecommerce websites that sell while you sleep'),
    'erp': ('Custom ERP', 'One system. Everything connected.'),
    'ai-automation': ('AI agents', 'AI agents that answer, qualify and follow up 24/7'),
    'finance-platforms': ('Finance', 'Know where your money is before it moves'),
    'software': ('Custom software', 'Software built around how your business works'),
    'industries': ('Industries', 'Systems for logistics, FMCG, finance, property, education and more'),
    'expand-into-east-africa': ('Expanding into East Africa', 'The systems partner on the ground in Kenya'),
    'hire-kenyan-developers': ('Engineering team', 'Hire a Kenyan software engineering team'),
    'multi-branch-business-system': ('Multi-branch', 'Open the next branch without another spreadsheet'),
    'case-studies': ('Case studies', 'Systems running in production across Africa and the US'),
    'projects': ('Projects', 'AI systems, business platforms and websites in production'),
    'blog': ('Insights', 'Systems, AI and growth for companies in Kenya'),
    'contact': ('Contact', 'Tell us what you need built'),
}


def font(name, size, weight):
    f = ImageFont.truetype(os.path.join(FONTS, name), size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def wrap(draw, text, f, width):
    words, lines, line = text.split(), [], ''
    for w in words:
        test = (line + ' ' + w).strip()
        if draw.textlength(test, font=f) <= width:
            line = test
        else:
            lines.append(line)
            line = w
    lines.append(line)
    return lines


def card(name, eyebrow, headline):
    W, H = 1200, 630
    img = Image.new('RGB', (W, H), DEEP)
    d = ImageDraw.Draw(img)
    # soft brand glows
    glow = Image.new('RGB', (W, H), DEEP)
    gd = ImageDraw.Draw(glow)
    for r, col, cx, cy in [(520, (24, 62, 84), 1080, -40), (420, (60, 44, 30), -60, 700)]:
        gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    img = Image.blend(img, glow, 0.55)
    d = ImageDraw.Draw(img)
    d.rectangle([0, H - 10, W, H], fill=ORANGE)
    logo = Image.open(os.path.join(ROOT, 'public', 'images', 'logo.png')).convert('RGBA').resize((96, 96))
    mask = Image.new('L', (96, 96), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, 95, 95], fill=255)
    img.paste(logo, (72, 64), mask)
    d.text((188, 82), 'CRES', font=font('Outfit.ttf', 40, b'ExtraBold'), fill=(255, 255, 255))
    d.text((188 + d.textlength('CRES ', font=font('Outfit.ttf', 40, b'ExtraBold')), 82), 'DYNAMICS', font=font('Outfit.ttf', 40, b'ExtraBold'), fill=ORANGE)
    d.text((72, 228), eyebrow.upper(), font=font('Figtree.ttf', 26, b'Bold'), fill=CYAN)
    hf = font('Outfit.ttf', 64, b'Bold')
    lines = wrap(d, headline, hf, W - 144)
    if len(lines) > 3:
        hf = font('Outfit.ttf', 54, b'Bold')
        lines = wrap(d, headline, hf, W - 144)
    y = 278
    for ln in lines[:4]:
        d.text((72, y), ln, font=hf, fill=(255, 255, 255))
        y += int(hf.size * 1.15)
    d.text((72, H - 66), 'cresdynamics.com  ·  Westlands and Rongai, Nairobi', font=font('Figtree.ttf', 24, b'SemiBold'), fill=MUTED)
    img.save(os.path.join(OUT, f'{name}.png'), optimize=True)


os.makedirs(OUT, exist_ok=True)
for n, (e, h) in CARDS.items():
    card(n, e, h)
print(f'built {len(CARDS)} share images in public/images/og')
