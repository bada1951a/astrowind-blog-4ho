---
title: "Claude Artifacts Prompt: Maak Professionele SVG Iconen en Web Illustraties"
description: "Herstel je verouderde prompts na de mais-update van AI-modellen. Bouw direct strakke, schaalbare web-illustraties met Claude Artifacts."
publishDate: 2026-10-26T03:40:00.000Z
image: 'https://picsum.photos/seed/prompt-mvovcw9c-8-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "Claude", "SVG", "Web Design", "Artifacts"]
theme: "Retro Monokai"
---


## 1. Het Moment van Paniek op de Zuidas

Gisteren om 14:00 uur stond ik midden in een sprintreview bij een fintech-startup aan de Amsterdamse Zuidas. We moesten binnen een uur een compleet nieuwe set custom SVG-iconen presenteren voor onze vernieuwde dashboardinterface. Mijn vertrouwde, tot in de puntjes geoptimaliseerde Claude-prompt die de afgelopen maanden feilloos werkte voor web-illustraties, gaf opeens totaal niet thuis. 

Na de recente achterliggende modelupdates spuugde Claude ineens slordige, incompleta code uit met afgebroken viewBox-attributen en raster-achtige artefacten in plaats van schone, vectorgetrouwe SVG's. De oude prompt vertrouwde te veel op impliciete stijlinstructies en liet te veel over aan de vernieuwde, strengere interne logica van de AI. Mijn workflow lag volledig plat en de stakeholders zaten in onze nek te heugen. Tijd voor een grondige renovatie van de prompt-architectuur.

<div style="border-left: 4px solid #a6e22e; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Spoedrevisie Nodig:</strong> Moderne AI-modellen hebben striurdere contextbeperkingen en strengere output-parsers gekregen. Als je prompts geen expliciete technische parameters en strakke markup-grenzen bevatten, mislukt de generatie van complexe Claude Artifacts direct.
</div>



![Claude Artifacts Prompt to Create Custom SVG Icons and Web Illustrations Prompt Guide](https://picsum.photos/seed/prompt-mvovcw9c-8-b/1000/550.jpg)

## 2. Waarom de Oude Aanpak Faalde

Simpele prompts zoals *"Maak een mooi SVG-icoon van een slotje"* werken niet meer betrouwbaar in de nieuwste generatie LLM's. Dit komt door drie hoofdoorzaken:

* **Contextuele Drift:** Het model raakt de draad kwijt tussen tekstuele uitleg en de eigenlijke code-output wanneer de instructies te vaag zijn.
* **Ontbrekende Structuur:** Zonder expliciete eisen voor de `<svg>` tag, `viewBox`, en **CSS-variabelen** vervalt het model naar standaard, generieke styling.
* **Artifacts Isolatie:** Claude gebruikt **Artifacts** om code af te schermen, maar als de output niet als volledig, zelfstandig bestand wordt gedefinieerd, snijdt het model de code voortijdig af.

Onze nieuwe strategie draait om **stricte deterministische prompt-structuren**. We geven Claude geen vrije hand meer, maar behandelen het model als een junior frontend developer die een heel specifiek technisch contract moet naleven.

## 3. Master Prompt Template

Kopieer en plak deze masterprompt in **Claude** om direct foutloze, schaalbare SVG-iconen en web-illustraties te genereren via Artifacts. Pas de variabelen tussen de rechte haken aan naar jouw projectbehoefte.

```markdown
# Role & Context
You are an expert UI/UX illustrator and senior frontend engineer specialized in clean, accessible, and scalable vector graphics (SVG).

# Objective
Create a custom SVG [insert asset type, e.g., dashboard icon / hero illustration] representing [insert core concept, e.g., secure data encryption].

# Technical Constraints & Requirements
- Output format: Valid, standalone SVG code inside a Claude Artifacts block.
- Dimensions: Responsive with `viewBox="0 0 24 24"` (for icons) or `viewBox="0 0 800 600"` (for illustrations).
- Styling: Use semantic CSS classes or inline properties with a modern [insert stylistic theme, e.g., Monokai / minimalist tech] color palette. Primary accent: [insert hex code, e.g., #a6e22e].
- Structure: Clean, semantic tags (<path>, <g>, <circle>), properly closed, with zero extraneous wrapper divs or markdown text inside the artifact.
- Accessibility: Include appropriate <title> and <desc> elements within the SVG root.

# Output Delivery
Provide ONLY the clean SVG code inside the artifact window. No conversational filler before or after the code block.
```

<div style="border-left: 4px solid #a6e22e; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Pro-Tip voor Claude Artifacts:</strong> Vraag het model nadat de eerste SVG is gegenereerd direct om specifieke micro-aanpassingen via een vervolgbericht, zoals: <em>"Zet de hoeken van alle rechthoeken om naar `rx='4'` en verhoog het contrast van de secundaire lijnen."</em>
</div>

## 4. Praktische Variaties en Veiligheidstips

Om te zorgen dat je prompts onder alle omstandigheden robuust blijven, kun je onderstaande variaties toepassen:

* **Voor Complexe Scènes:** Verander de `viewBox` naar grotere waarden zoals `0 0 1200 800` en voeg de eis toe: *"Gebruik gelaagde `<g>` groepen met duidelijke ID-attributen zodat elementen animatie-klaar zijn voor CSS of Framer Motion."*
* **Token Besparing:** Voeg achteraan de systeeminstructie toe: *"Genereer geen uitleg over het ontwerpproces; lever uitsluitend de geoptimaliseerde code."* Dit bespaart onnodige tokens en voorkomt dat Claude halverwege de zin stopt door limieten.
* **Brand Consistency:** Voeg je vaste kleurenpalet toe als een lijst met hex-codes in de prompt om te voorkomen dat Claude willekeurige kleuren kiest.

## 5. Veelgestelde Vragen

Q: Waarom breekt Claude de SVG-code soms midden in een pad af?

A: Dit gebeurt wanneer de output-tokenlimiet van het model wordt overschreden door te complexe instructies. Vraag in dat geval in je prompt om minder gedetailleerde paden of splits de illustratie op in meerdere componenten.

Q: Kan ik deze prompt ook gebruiken in ChatGPT of Gemini?

A: Ja, hoewel Claude speciaal geoptimaliseerd is voor Artifacts, kun je in ChatGPT en Gemini simpelweg vragen om de output in een standaard ```xml of ```html codeblok te plaatsen.

Q: Hoe zorg ik ervoor dat de SVG direct responsive is op mobiele schermen?

A: Zorg ervoor dat de prompt expliciet vraagt om `width="100%"` en `height="100%"` in combinatie met een vaste `viewBox`, zodat de browser de schaalbaarheid automatisch afhandelt.
