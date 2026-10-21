---
title: "Midjourney V6: Identische Gesichter über 20 Szenen hinweg garantieren"
description: "Wie wir im Frankfurter Consulting-Alltag fotorealistische Geschäftsberichte mit konsistenten Charakteren automatisieren."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpcyoe-3-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Midjourney V6", "Prompt Engineering", "Geschäftsberichte", "Consulting", "KI Automatisierung"]
theme: "Acid Lime Hacker Space"
---


Es ist Dienstag, exakt 21:45 Uhr im Konferenzraum eines Frankfurter Consulting-Hauses. Morgen Früh um 9:00 Uhr muss der finale Pitch-Deck-Entwurf für einen neuen Mandanten aus dem Bankensektor stehen: 20 verschiedene Szenarien, die denselben Projektleiter in unterschiedlichen Arbeitsumgebungen zeigen. Das Problem? Jedes Mal, wenn ich in Midjourney V6 einen neuen Prompt abschicke, generiert die KI eine völlig andere Person. Mal hat der Mann Vollbart und blonde Haare, im nächsten Bild trägt er Brille und hat dunkles, kurzes Haar. Für einen professionellen Geschäftsbericht ist das ein absolutes KO-Kriterium. Die Zeit sitzt mir im Nacken, und die traditionellen Ansätze wie einfaches Text-Prompting greifen hier schlichtweg zu kurz.

### Warum einfache Prompts im Banken- und Consulting-Umfeld scheitern

![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpcyoe-3-b/1000/550.jpg)

Wer versucht, konsistente Gesichter nur über verbale Beschreibungen wie "35-year-old German banker with sharp jawline" zu steuern, wird schnell scheitern. Midjourney V6 interpretiert jedes Mal den latenten Raum neu. Das Resultat ist eine visuelle Lotterie, die für automatisierte Reporting-Prozesse unbrauchbar ist.

Die Lösung liegt in einer präzisen Kombination aus Bild-Referenzierung (`--cref`), Gewichtung (`--cw`) und einem modularen Prompt-Aufbau, der Kernattribute einfriert, während sich die Umgebung dynamisch anpasst.

<div style="border-left: 4px solid #84cc16; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Architekten-Tipp für Midjourney V6:</strong> Nutzen Sie den Parameter `--cref` (Character Reference) zusammen mit einer hohen Gewichtung von `--cw 100`, um das Gesicht exakt zu fixieren, während Sie Kleidung und Hintergrund im Text anpassen.
</div>

### Das Master-Prompt-Template für konsistente Charaktere

Um den Workflow zu automatisieren, nutzen wir ein standardisiertes Template. Kopieren Sie diese Struktur und passen Sie lediglich die Szenenbeschreibung an.

```markdown
[Basis-Setup] + [Charakter-ID] + [Szenen-Beschreibung] + [Technische Parameter]
```

Ein konkretes, sofort einsatzbereites Beispiel für Szene 01 (Analysen am Bildschirm im Frankfurter Büroturm):

```text
A professional 35-year-old German male consultant, sharp jawline, neat dark-brown hair, wearing a tailored charcoal-gray business suit, intently analyzing financial graphs on dual ultra-wide monitors, modern Frankfurt high-rise office background with floor-to-ceiling windows showing twilight skyline, cinematic lighting, photorealistic corporate photography --ar 16:9 --v 6.0 --cref https://link-zu-ihrem-referenzbild.jpg --cw 100
```

### Schritt-für-Schritt-Anleitung für alle 20 Szenen

1. **Das Master-Bild definieren:** Generieren Sie zuerst *ein* perfektes Porträt Ihres Charakters und speichern Sie die URL dieses Bildes.
2. **Den Parameter `--cref` einsetzen:** Fügen Sie am Ende jedes neuen Prompts die URL des Master-Bildes ein.
3. **Gewichtung steuern (`--cw`):** 
   - `--cw 100` kopiert Gesicht, Haare und Kleidung.
   - `--cw 0` kopiert **nur** das Gesicht und erlaubt Ihnen, in jeder Szene die Kleidung (z.B. Hemd ohne Sakko, Outdoor-Jacke) komplett zu verändern. Perfekt für narrative Geschäftsberichte!

<div style="border-left: 4px solid #84cc16; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Häufige Fehlerquelle:</strong> Wenn Sie `--cw 100` verwenden, aber im Text eine andere Krawattenfarbe oder Jacke fordern, gerät Midjourney in einen Konflikt. Nutzen Sie `--cw 0` für maximale Flexibilität bei der Kleidung bei gleichbleibendem Gesicht.
</div>

### Häufig gestellte Fragen (FAQ)

**Frage 1: Kann ich `--cref` auch für weibliche Charaktere und diverse Teams nutzen?**
Ja, das Prinzip funktioniert universell. Wichtig ist lediglich, dass das zugrundeliegende Referenzbild (`--cref`) eine hohe Auflösung und eine klare frontale oder leicht gedrehte Ansicht des Gesichts zeigt.

**Frage 2: Was tun, wenn Midjourney V6 das Gesicht trotz `--cref` leicht verfälscht?**
Erhöhen Sie die Prompt-Stabilität, indem Sie den Stil-Parameter anpassen oder das Referenzbild über `--iw` (Image Weight) in einem Multi-Image-Prompt verstärken. Nutzen Sie zudem exakte Ausdrücke wie "the same man from the reference image".

**Frage 3: Wie automatisiere ich diesen Prozess für 20 Szenen am effizientesten?**
Erstellen Sie sich in ChatGPT oder Claude eine Text-Matrix. Füttern Sie die KI mit den 20 gewünschten Report-Kapiteln und lassen Sie sich automatisiert die passenden Midjourney-Prompts inklusive der angepassten `--cref`-URL und veränderten `--cw`-Werten ausgeben.
