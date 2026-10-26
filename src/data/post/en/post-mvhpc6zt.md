---
title: "Midjourney V6 Prompt Guide: Maintain Consistent Character Faces Across 20 Scenes"
description: "Master Midjourney V6 face consistency for multi-scene storytelling. Learn exact prompt formulas to keep characters identical across 20 cuts."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpcgc6-1-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Midjourney V6", "Prompt Engineering", "Character Consistency", "AI Workflow"]
theme: "Retro Monokai"
---

## 1. Critical AI Hallucination & Output Collapse Crisis

It was 8:45 PM on a Tuesday at our Manhattan marketing agency. Our morning sync with the executive board was scheduled for 9:00 AM sharp, and the pitch deck for our major rebranding campaign was completely missing its visual storyboard. My director walked over to my desk with a caffeine-fueled panic in his eyes: "We need 20 distinct storyboard scenes of our lead persona, Maya, going through her daily routine. But every time I run Midjourney V6, Maya turns into a completely different person in every frame. The client will tear us apart!" He was right. In scene one, she was a brunette with sharp cheekbones; in scene two, she had blonde hair and a round face. Traditional prompt stitching and vague descriptions like "same woman" were failing completely, threatening to derail a six-figure enterprise presentation.

<div style="border-left: 4px solid #a6e22e; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>The Workflow Crisis:</strong> Standard Midjourney prompts treat every generation as an isolated event. Without structural anchor tokens and precise parameter chaining, V6's advanced natural language parser will drift, altering facial bone structure, age, and ethnicity across multiple outputs.
</div>

![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpcgc6-1-b/1000/550.jpg)

## 2. Root Cause Breakdown of Prompt Failures and Logic Flaws of Prompt Failures and Logic Flaws of Prompt Failures and Logic Flaws Why Standard Prompts Fail at Character Continuity

If you simply type "A 30-year-old female tech executive named Maya working at a desk" and then change the action to "Maya drinking coffee in a cafe," Midjourney V6 relies on probabilistic token distribution. The model re-rolls the latent space seed for the character's facial topology with every new action phrase. 

To lock down facial consistency across 20 distinct scenes, we have to bypass generic descriptions and build a deterministic prompt architecture. This relies on three core components:
1. The Anchor Identity Token: A hyper-specific, multi-word physical descriptor that remains 100% immutable across all 20 prompts.

2. The --cref Parameter: Midjourney's character reference feature, which acts as a visual anchor by referencing the image URL of your baseline character design.

3. Environmental Isolation: Separating the character description from the changing background action so the rendering engine doesn't bleed environmental traits into the face.

## 3. Copy-and-Paste Master Prompt Engineering Template & Step-by-Step Workflow

To fix our executive presentation crisis, I built a structured prompt template in Claude, then deployed it directly into our Midjourney batch workflow. Here is the exact template you can copy, paste, and adapt for your own multi-scene projects.

```markdown
[Base Character Definition]: A 30-year-old female tech executive, sharp angular jawline, almond-shaped hazel eyes, neatly tied dark brown sleek bob haircut, minimal subtle makeup, wearing a minimalist charcoal blazer --ar 16:9 --v 6.0 --s 250

[Scene Action]: [Insert Scene Action, e.g., sitting at a modern glass desk reviewing financial charts on dual monitors] --cref [Insert_Baseline_Image_URL] --cw 100
```

<div style="border-left: 4px solid #a6e22e; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Pro Tip on Weighting (--cw):</strong> Notice the parameter <code>--cw 100</code> at the end of the scene prompt. This stands for character weight. Setting it to 100 forces Midjourney to copy the face, hair, and clothing from your reference image. If you only want to keep the face and change the outfit across scenes, drop this value down to 0 (<code>--cw 0</code>).
</div>

### Executing the 20-Scene Pipeline

1. Generate the Master Reference: Run your baseline prompt first without the `--cref` tag. Pick the absolute best output where the face is clear and high-resolution.

2. Grab the Image URL: Right-click your chosen master image in Discord, copy the link, and save it to your scratchpad.

3. Populate the Variables: Keep your `[Base Character Definition]` identical across all 20 scene prompts, append your `--cref [URL]` and `--cw 100` (or `--cw 0`), and only modify the `[Scene Action]` and lighting tags.

## 4. Professional Prompt Architect Precautions & Tips

When producing 20 or more sequential scenes, you will inevitably run into minor inconsistencies or style drift. Here is how to debug common Midjourney V6 issues:

- Wardrobe Bleed: If Maya's charcoal blazer from the base definition persists even when she is supposed to be in casual weekend wear, use `--cw 0` and explicitly redefine her clothing in the scene action (e.g., "...wearing a casual beige cashmere sweater").
- Lighting Discrepancies: Midjourney V6 can sometimes render harsh studio lighting even in outdoor scenes. Combat this by adding strict environmental lighting tags at the end of your prompts, such as `soft overcast morning window light` or `warm neon cyberpunk city glow`.
- Aspect Ratio Locking: Always keep `--ar 16:9` or `--ar 9:16` consistent across all prompts in your storyboard. Changing aspect ratios mid-sequence forces the composition engine to recalculate facial geometry, which triggers noticeable face morphing.

## 5. Frequently Asked Questions (FAQ) (FAQ) (FAQ)

### Can I use character reference (--cref) with multiple characters in one scene?
No. Midjourney V6's `--cref` parameter is currently designed to track a single dominant character reference URL. If your scene requires two consistent characters, you will need to generate them separately using image-to-image workflows or composite them in post-production.

### How do I prevent minor eye color or hairstyle drift across scenes?
Always place your non-negotiable facial anchors—such as `almond-shaped hazel eyes` and `dark brown sleek bob haircut`—at the very front of your prompt string. Midjourney's parser assigns higher attention weights to tokens appearing earlier in the prompt sentence.

### Is `--cw 100` always better than `--cw 0` for storytelling?
Not necessarily. While `--cw 100` maintains maximum fidelity (including hair and clothing), it limits your ability to show the character in different outfits or settings. Use `--cw 100` when your character wears a uniform or signature look, and `--cw 0` when you need wardrobe changes while retaining facial bone structure.
