---
title: "Midjourney V6 Prompt Gids: Consistent Karaktergezicht Behouden over 20 Scènes"
description: "Ontdek hoe je met Midjourney V6 en slimme prompt-sjablonen exact hetzelfde gezicht behoudt over twintig verschillende scènes voor jouw corporate project."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpe6ny-8-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Midjourney V6", "Prompt Engineering", "Character Consistency", "AI Design", "Zuidas"]
theme: "Solarized Amber Warm"
---


Het is kwart over acht op een regenachtige dinsdagmorgen op de Zuidas in Amsterdam. Om tien uur moet ik een volledige pitchpresentatie opleveren voor een nieuwe fintech-campagne, bestaande uit twintig unieke scènes met dezelfde hoofdpersoon: een Nederlandse financial professional genaamd Sophie. Het probleem? Bij elke nieuwe generatie in Midjourney V6 verandert Sophie in een totaal iemand anders. De ene keer heeft ze steil blond haar en blauwe ogen, de volgende keer verschijnt ze als een brunette met een bril. Mijn deadline hijgt in mijn nek, de stakeholder wacht op de visuals, en mijn oude prompts leveren alleen maar frustratie en visuele inconsistentie op.

Simpele prompts zoals "a corporate woman in Amsterdam" of zelfs het toevoegen van een willekeurige naam in Midjourney V6 werken simpelweg niet voor serieuze commerciële producties. Midjourney herkent natuurlijke taal steeds beter, maar mist contextuele geheugenkoppelingen tussen verschillende opdrachten. Zonder een systematische aanpak van vaste visuele ankers, seed-nummers en de `--cref` (Character Reference) parameter, blijft het genereren van een verhaallijn een loterij.

<div style="border-left: 4px solid #d97706; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Praktische Tip van de AI Architect:</strong> Verlies geen tijd met het oneindig opnieuw rollen van dezelfde vage beschrijving. Gebruik een vaste anatomische omschrijving gecombineerd met de `--cref` parameter van Midjourney V6 om de visuele identiteit van je karakter moeiteloos te vergrendelen over al je scènes.
</div>

Hieronder vind je de geteste, efficiënte methode om dit direct op te lossen. We vergelijken ook direct hoe je deze workflow optimaliseert met behulp van ChatGPT en Claude als jouw persoonlijke prompt-assistenten.

## De Architectuur: Waarom Standaard Prompts Falen

Wanneer je in Midjourney V6 een scène genereert, berekent het model een willekeurige wiskundige ruismatrix op basis van jouw tekst. Zelfs als je exact dezelfde tekst herhaalt met een andere seed, verandert de gelaatsstructuur fundamenteel. Om dit op te lossen, splitsen we de prompt op in vier vaste componenten:

1. De Visuele Basis (Anchor): Specifieke gelaatstrekken die niet veranderen (bijv. "angular jawline, subtle freckles on nose, tied-back dirty blonde hair").

2. De Omgeving & Actie (Context): Wat doet het personage en waar is het (bijv. "working on a laptop in a glass-walled Zuidas office").

3. De Stijl & Belichting (Aesthetic): Cinematografie, camera-instellingen en kleurenpalet (bijv. "shot on 35mm lens, moody overcast lighting, corporate editorial style").

4. De Parameters: Technische instructies zoals `--cref [URL]` en `--ar 16:9`.

---

## Het Meester-Prompt Sjabloon (Kopieer & Plak)

Gebruik dit sjabloon in jouw favoriete AI-assistent (ChatGPT of Claude) om snel twintig unieke scènes te genereren met behoud van hetzelfde karakter.

```markdown
[Karakter-Anker]: A 32-year-old Dutch woman with an angular jawline, subtle freckles across her nose, tied-back dirty blonde hair, sharp hazel eyes, professional minimalist look --cref https://link-naar-jouw-originele-referentie-afbeelding.jpg --cw 100
[Scène & Actie]: [Voeg hier de specifieke handeling in, bijvoorbeeld: walking briskly through Amsterdam central station during rush hour, carrying a leather briefcase]
[Stijl & Belichting]: Cinematic corporate photography, editorial lighting, photorealistic textures, shot on 85mm lens, f/1.8 --v 6.0 --ar 16:9
```

---

## Modelvergelijking: ChatGPT vs. Claude voor Prompt-Optimalisatie

Om het proces van twintig scènes te versnellen, gebruik ik een LLM om de variaties te schrijven. Hier is hoe je kiest tussen ChatGPT en Claude voor deze taak:

| Kenmerk | ChatGPT (GPT-4o) | Claude 3.5 Sonnet |
| :--- | :--- | :--- |
| Snelheid | Zeer snel voor directe iteraties | Uitstekend voor langere, verhalendecontinuity |
| Structuur | Goed in het volgen van strakke tabellen | Superieur in het handhaven van consistente verhaallijnen over 20+ scènes |
| Formattering | Handig voor snelle JSON-exports | Perfect voor rijke Markdown-uitvoer en gedetailleerde omgevingsbeschrijvingen |
| Aanbevolen gebruik | Snelle variaties genereren op de werkvloer | Complexe storyboard-scenario's uitschrijven |

<div style="border-left: 4px solid #d97706; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Let op bij het gebruik van --cref:</strong> Zorg ervoor dat de referentie-afbeelding een helder portret is met neutrale belichting. Als je `--cw 0` gebruikt, kopieert Midjourney alleen de kleding en het haar, terwijl `--cw 100` (standaard) het hele gezicht, kapsel en kleding overneemt. Voor onze twintig scènes met wisselende kleding in een kantooromgeving werkt `--cw 50` vaak het beste.
</div>

---

## Veelgestelde Vragen (FAQ)

### 1. Hoe zorg ik ervoor dat de kleding van mijn karakter verandert per scène, maar het gezicht hetzelfde blijft?
In Midjourney V6 pas je de `--cw` (Character Weight) parameter aan naar `--cw 30` of `--cw 50`. Hiermee zeg je tegen het model dat het alleen de gezichtskenmerken van de referentie-afbeelding (`--cref`) moet overnemen, terwijl je in de tekst-prompt nieuwe kleding beschrijft (bijvoorbeeld "wearing a dark blue tailored suit" in plaats van de eerdere outfit).



![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpe6ny-8-b/1000/550.jpg)

### 2. Wat is de beste aanpak als het gezicht toch subtiel begint te verschuiven na scène 10?
Sla de meest gelukte generatie uit scène 5 of 6 op als jouw nieuwe referentie-afbeelding. Vervang de URL in je `--cref` parameter met deze nieuwe afbeelding. Dit voorkomt dat het model te ver afdwaalt van de oorspronkelijke stijl ("drift" genoemd in generative AI).

### 3. Kan ik dit hele proces automatiseren voor twintig scènes tegelijk?
Ja. Je kunt Claude of ChatGPT vragen om een JSON-tabel te genereren met daarin de twintig unieke scènes, waarbij het vaste karakter-anker en de `--cref` URL automatisch worden toegevoegd aan elke individuele prompt. Deze kopieer je vervolgens stuk voor stuk naar Discord of je Midjourney Alpha webinterface.
