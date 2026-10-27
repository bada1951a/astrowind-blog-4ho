---
title: "Stop AI Hallucinaties: Zotem je ChatGPT en Claude voor Zuivere Data"
description: "Voorkom dat AI verzint tijdens het analyseren van transcripten. Ontdek de ultieme system prompts voor feitelijke extractie zonder nonsens."
publishDate: 2026-10-24T03:40:00.000Z
image: 'https://picsum.photos/seed/prompt-mvlbirgn-8-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips", "Nederland"]
theme: "Solarized Amber Warm"
---

## 1. Noodsituatie door AI-hallucinaties en onbruikbare output

Het is dinsdagochtend op de Zuidas in Amsterdam. Om tien uur hebben we een cruciale strategische bespreking gehad met een groot internationaal fintech-consortium. De hele sessie is opgenomen en uitgetyped naar een ruw transcript van achtendertig pagina's vol spreektaal, Engelse vakjargontermen en oeverloos geklets over iemands weekend en de koffieautomaat. Mijn manager stapt mijn kantoor binnen met de vraag of ik even snel per spreker de kernstandpunten en actiepunten kan aanleveren. Ik gooi het transcript in ChatGPT, druk op enter en wacht vol verwachting op een strak overzicht. Wat krijg ik terug? Een prachtig vormgegeven lijst vol verzonnen stellingen, namen van mensen die niet eens bij de meeting waren, en actiepunten die helemaal nooit zijn uitgesproken. Klassieke hallucinaties. De AI probeert te behulpzaam te zijn en vult de gaten op met fantasie.

Dit is het moment waarop je merkt dat standaard vragen niet werken. Als je een AI vraagt om een samenvatting te maken van een rommelig transcript,activeer je de creatieve schrijfmodus van het model in plaats van de analytische modus. ChatGPT en Claude gaan extrapoleren, verbanden leggen die er niet zijn en data verzinnen om jouw prompt te beantwoorden. Dat kost je uren aan handmatige controle. Om dit te stoppen, moeten we de AI dwingen tot extreme precisie. We moeten de vrijheid ontnemen om dingen te verzinnen en een strikte grens instellen: wat niet in de tekst staat, bestaat simpelweg niet.

![Best System Prompts to Stop ChatGPT and Claude from Hallucinating Data Prompt Guide](https://picsum.photos/seed/prompt-mvlbirgn-8-b/1000/550.jpg)

<div style="border-left: 4px solid #d97706; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
Praktische tip voor de Zuidas: Laat AI nooit direct los op ruwe audio-transcripts zonder harde restricties. Definieer vooraf exact welke rollen het model mag aannemen en verbied het expliciet om gaten op te vullen met aannames.
</div>

Hieronder vind je de ultieme master prompt die je direct kunt kopieermaken in ChatGPT of Claude. Deze system prompt dwingt het model om alleen te werken met feiten uit de aangeleverde bron en alle ruis erbuiten te laten.

```markdown
Je bent een uiterst nauwkeurige data-analist en notulist. Je taak is om uit het hieronder geplaatste vergadertranscript uitsluitend de werkelijk uitgesproken kernstandpunten per spreker en de concrete actiepunten (To-Do's) te extraheren.

STRICTE REGELS CONTRA HALLUCINATIES:
1. Gebruik uitsluitend feitelijke informatie die letterlijk of direct impliciet in de onderstaande tekst staat.

2. Verzin, extrapoleer of assumeer nooit iets. Als een spreker een punt niet expliciet maakt, neem dit dan niet op.

3. Negeer alle beleefdheidsvormen, koffiepauze-anekdotes, grappen en irrelevante zijsprongen.

4. Als er geen actiepunt aan een spreker kan worden gekoppeld op basis van de tekst, schrijf dan expliciet: "Geen actiepunt vermeld."

OUTPUT FORMAAT (GEBRUIK EXACT DEZE STRUCTUUR):

Spreker: [Naam]
- Kernstandpunt: [Eén krachtige zin met de hoofdgedachte]
- Actiepunt (To-Do): [Concreet vervolgstappenplan inclusief eigenaar, indien genoemd]

Hier is het transcript om te analyseren:
[Plak hier je ruwe vergadertranscript]
```

Naast deze master prompt is het slim om te begrijpen hoe je deze instructies kunt inzetten in verschillende modellen. Zowel ChatGPT als Claude reageren net iets anders op dit soort commando's.

| Model | Sterke punten bij data-extractie | Aanbevolen instelling of System Prompt |
| :--- | :--- | :--- |
| ChatGPT (GPT-4o) | Snel in het parsen van grote tekstblokken en volgt strikte markdown structuren feilloos op. | Gebruik de Custom Instructions of zet de prompt in als voorafgaande system message. |
| Claude (3.5 Sonnet) | Uitstekend in het begrijpen van subtiele context in lange dialogen en nuance in spreektaal. | Ideaal voor projecten in de Artifacts-functie; laat de output direct genereren als een net overzicht. |

Om te zorgen dat je nooit meer tegen vage samenvattingen aanloopt, zijn er nog een aantal praktische veiligheidstips die je workflow direct optimaliseren. Zorg ervoor dat je de temperatuurinstelling van het model, indien beschikbaar via de API of geavanceerde instellingen, verlaagt naar 0.0 of 0.

2. Dit minimaliseert de creativiteit van de AI en zorgt voor een deterministisch resultaat. Geef bovendien in de prompt aan dat het model bij twijfel over een uitspraak moet melden dat de data onvoldoende helder is, in plaats van zelf een invulling te kiezen.

Hieronder volgen de antwoorden op de meest gestelde vragen over het tegengaan van AI-hallucinaties bij data-extractie.

**Q1.** Waarom blijft ChatGPT ondanks deze strenge regels soms toch kleine details verzinnen?

**A1.** Dat komt door de probabilistische aard van Large Language Models. Als het transcript erg vaag is of ontbreekt aan duidelijke informatie, probeert het model toch een compleet antwoord te geven om de gebruiker te behagen. Door in je prompt op te nemen dat het model expliciet mag melden als informatie ontbreekt, neem je die druk weg.

**Q2.** Moet ik deze prompt elke keer opnieuw invoeren of kan ik dit opslaan?

**A2.** Het is het handigst om deze prompt op te slaan in je persoonlijke promptbibliotheek of te verwerken in de Custom Instructions van ChatGPT of Projects-functie van Claude. Zo hoef je alleen nog maar je transcript eronder te plakken en direct op verzenden te klikken.

**Q3.** Werkt deze methode ook voor Nederlandstalige zakelijke teksten met veel Engels jargon?

**A3.** Zeker weten. Moderne modellen zoals GPT-4o en Claude 3.5 Sonnet begrijpen Nederlands en Engels door elkaar uitstekend. De instructies in de prompt zorgen ervoor dat de AI niet in de war raakt van vakterminologie en puur filtert op de feitelijke inhoud per spreker.
