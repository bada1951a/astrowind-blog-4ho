---
title: "Gestructureerde data extraheren met Few-Shot Prompts"
description: "Voorkom kwaliteitsverschillen binnen je team. Leer hoe je unstructured tekst omzet in foutloze tabellen met een herbruikbare system prompt."
publishDate: 2026-10-25T03:40:00.000Z
image: 'https://picsum.photos/seed/prompt-mvmqqmvv-8-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips"]
theme: "High-Contrast Charcoal"
---

## 1. De chaos aan de Zuidas: Waarom iedereen andere resultaten krijgt

Gisteren om 16:30 uur hadden we een crisis op kantoor in Amsterdam-Zuid. Voor een grote fusie-analyse moesten we vijftig juridische PDF-documenten en rommelige e-mails omzetten naar een gestructureerde Excel-tabel. Ik gaf al mijn teamleden dezelfde simpele opdracht: *"Haal de contractvoorwaarden en bedragen uit deze documenten."* 

Het resultaat? Pure chaos. De een leverde een Markdown-tabel aan met vreemde valuta-notaties, de ander miste de helft van de datums, en een derde kreeg hallucinerende bedragen voorgeschoteld omdat het model de context verkeerd begreep. Elk teamlid gebruikte zijn eigen stijl en interpretatie, waardoor we uren kwijt waren aan handmatige controle en correctie. We misten een centrale, gestandaardiseerde aanpak. Dit kon zo niet langer; we hadden een robuuste, herbruikbare systeemprompt nodig die ongeacht de gebruiker exact dezelfde betrouwbare tabelstructuur oplevert.

<div style="border-left: 4px solid #e11d48; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Beveiligingswaarschuwing:</strong> Let op bij het verwerken van vertrouwelijke bedrijfsdata of persoonsgegevens via publieke AI-tools. Zorg ervoor dat je altijd conformeert aan de AVG-richtlijnen en gebruik bij voorkeur enterprise-omgevingen met databeschermingsgaranties.
</div>

![How to Write Few-Shot Prompts to Extract Tabular Data from Unstructured Text Prompt Guide](https://picsum.photos/seed/prompt-mvmqqmvv-8-b/1000/550.jpg)

## 2. Waarom simpele prompts falen en de kracht van Few-Shot Learning

Als je een AI alleen een instructie geeft ("Maak hier een tabel van"), geef je te veel ruimte aan interpretatie. Grote taalmodellen zoals ChatGPT en Claude zijn talig ingesteld en proberen gaten op te vullen als een instructie te vaag is. Dit leidt tot inconsistenties in kolommen, ontbrekende rijen en inconsistent datumformaat.

De oplossing hiervoor is **Few-Shot Prompting**. In plaats van te leunen op een kale instructie, geef je het model direct in de prompt een concreet voorbeeld van de input én de gewenste output (een zogenaamde *shot*). Door het model te tonen wat goed gedrag is, dwing je een voorspelbaar patroon af. Het model hoeft niet meer te raden hoe jij je tabel wilt; het kopieert simpelweg de aangeboden structuur.

## 3. Direct bruikbare master prompt template Template voor Data-extractie

Hier is de gestandaardiseerde systeemprompt die we inmiddels binnen onze hele organisatie gebruiken. Kopieer deze template naar je **ChatGPT Custom Instructions**,**Claude Project Instructions** of zet hem direct bovenaan je venster.

```markdown
### Rol & Doel
Je bent een nauwkeurige data-analist gespecialiseerd in het omzetten van ongestructureerde tekst naar gestructureerde tabellen. Je verzint nooit data; wat niet in de brontekst staat, laat je leeg of geef je aan als "Niet vermeld".

### Output Formaat
Geef het resultaat uitsluitend terug als een valide Markdown-tabel met de volgende kolommen:
| Document_ID | Bedrijfsprijs | Contractstart | Type_Dienst | Status |

### Voorbeeld (Few-Shot Shot)
[INPUT]
"Op 12 januari 2024 heeft Innovate BV een overeenkomst getekend voor Cloudhosting. De maandelijkse kosten bedragen 1.250 euro. Het contract loopt nog."
[OUTPUT]
| Document_ID | Bedrijfsprijs | Contractstart | Type_Dienst | Status |
|---|---|---|---|---|
| DOC-01 | EUR 1.250 | 12-01-2024 | Cloudhosting | Actief |

### Te verwerken data
[PLAATS HIER JE ONGESTRUCTUREERDE TEKST]
```

## 4. Praktische Variaties en Veiligheidstips

Om deze prompt optimaal te laten functioneren binnen jouw dagelijkse workflow, zijn er een aantal technische en praktische randvoorwaarden waar je rekening mee moet houden:

* **Strikte JSON-output:** Heb je de data nodig voor een database of API? Vervang het Markdown-tabelformaat in de prompt eenvoudig door een strikt JSON-array schema. Modellen zoals Claude 3.5 Sonnet en GPT-4o blinken uit in JSON-validatie.
* **Token-beheer:** Plak geen complete boeken in één keer. Deel grote documenten op in brokken van 2.000 tot 3.000 woorden. Dit voorkomt dat het model aan het einde van de tekst concentratie verliest (het zogenaamde *lost-in-the-middle* fenomeen).
* **Temperatuurinstelling:**Zet de**Temperature**(indien beschikbaar in de API of instellingen) op `0` of maximaal `0.2`. Dit minimaliseert creativiteit en maximaliseert feitelijke nauwkeurigheid.

## 5. Veelgestelde Vragen

**Q:** Wat moet ik doen als de ongestructureerde tekst spelfouten of afkortingen bevat?

**A:** Je kunt in de systeeminstructie een extra regel toevoegen: "Corrigeer kleine spelfouten in bedrijfsnamen en datums automatisch naar een gestandaardiseerd formaat (DD-MM-YYYY), maar verander nooit de feitelijke inhoud."

**Q:** Hoe zorg ik ervoor dat het team exact dezelfde prompt blijft gebruiken?

**A:** Sla deze prompt op in een centrale documentatieomgeving of stel hem in als vaste**System Instructions** binnen de teamomgeving van jullie enterprise AI-abonnement. Zo kan niemand afwijken van de standaard.

**Q:** Kan ik deze prompt ook gebruiken voor het extraheren van facturen en bonnen?

**A:** Zeker. Pas simpelweg de kolomnamen in de prompt aan naar bijvoorbeeld `Factuurnummer`, `BTW_Bedrag`, `Totaal_Inclusief` en voeg een specifiek voorbeeld toe van een factuurregel.
