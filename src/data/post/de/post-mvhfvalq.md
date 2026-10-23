---
title: "Interaktive Dashboards mit Claude 3.5 Sonnet Artifacts bauen"
description: "Erfahren Sie, wie Sie komplexe Geschäftsberichte im Frankfurter Banken- und Consultingbereich durch Claude Artifacts in interaktive Dashboards verwandeln."
publishDate: 2026-10-21T12:15:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhfw2vu-3-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Claude Sonnet", "Artifacts", "Dashboard", "Finanzen", "Prompt Engineering"]
theme: "Nordic Clean Ice"
---


Es ist Freitag, kurz vor 18:00 Uhr im Bankenviertel Frankfurt. Auf meinem Tisch liegt ein unvollständiger 80seitiger PDF-Geschäftsbericht voller trockenem Text, KPI-Tabellen und unübersichtlicher Quartalszahlen. Der Vorstand will am Montagmorgen um 9:00 Uhr kein statisches Dokument mehr sehen, sondern ein voll funktionsfähiges, interaktives Dashboard, bei dem man Risikokennzahlen per Klick filtern und Szenarien durchrechnen kann. Eine klassische Web-Entwicklung dauert Wochen. Ich hatte genau 45 Minuten, bevor das Licht im Büro ausging.

Genau in diesem Moment rettete mich Claude 3.5 Sonnet und dessen Artifacts-Funktion. Statt langwierig Code zu kopieren, generierte die KI eine lauffähige, interaktive React-Anwendung direkt im Browser – und zwar auf Basis eines einzigen, präzisen System-Prompts.

![How to Use Claude 3.5 Sonnet Artifacts to Build Interactive Dashboard Prototypes Prompt Guide](https://picsum.photos/seed/prompt-mvhfw2vu-3-b/1000/550.jpg)

<div style="border-left: 4px solid #0284c7; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Der Paradigmenwechsel im Consulting:</strong> Früher bedeutete "Dashboard-Prototyping" das Warten auf das IT-Team. Heute generieren wir mit dem richtigen Prompt in unter 60 Sekunden lauffähige Frontends, die direkt mit echten Finanzdaten gefüttert werden können.
</div>

---

### Warum Standard-Prompts bei Finanz-Dashboards scheitern

Wer einfach nur tippt: *"Baue mir ein schönes Dashboard für meine Bankdaten"*, erhält meist unbrauchbaren Müll. Die KI rätselt über Datenstrukturen, erfindet falsche Platzhalter und liefert ein statisches Layout ohne echte Interaktivität. 

Das Kernproblem liegt in der fehlenden technischen Architekturvorgabe. Claude 3.5 Sonnet verfügt über eine mäuelle Artifacts-Engine, die isolierten HTML-, CSS- und JavaScript-Code (inklusive Tailwind CSS und Lucide Icons) in einem Live-Fenster rendern kann. Wenn wir das nicht explizit anfordern, verfällt das Modell in den normalen Text-Modus.

Um im Frankfurter Banken- und Consultingbereich zu bestehen, müssen unsere Prompts drei Bedingungen erfüllen:
1. Strikte Datenintegrität: Keine Fantasiezahlen, sondern exakte Strukturierung nach vorgegebenen KPIs (z. B. CET1-Quote, Liquiditätspuffer, NPL-Raten).

2. Klares UI/UX-Design: Minimalistisches, professionelles Corporate Design (Nordic Clean Ice Stil, hohe Lesbarkeit, keine verspielten Farben).

3. Echte Interaktivität: Filter, Dropdowns und dynamische Charts, die auf Benutzereingaben reagieren.

---

### Der Master-Prompt: Interaktive Dashboards in Sekunden

Kopieren Sie diesen erprobten Prompt und passen Sie die Platzhalter in den Klammern an Ihre aktuellen Geschäftsberichte an. Nutzen Sie diesen direkt in Claude 3.5 Sonnet mit aktiviertem Artifacts-Modus.

```markdown
Du bist ein erfahrener UI/UX-Entwickler und Finanzanalyst im Frankfurter Banken- und Consultingsektor. Deine Aufgabe ist es, einen vollständig funktionsfähigen, interaktiven Dashboard-Prototypen als einzelnes, in sich geschlossenes HTML-Artifact mit integriertem Tailwind CSS und React (über Babel/CDN) zu erstellen.

[Kontext & Ziel]
Wir automatisieren die Präsentation unseres aktuellen Geschäftsberichts für das Management. Das Dashboard muss sauber, übersichtlich und im professionellen Corporate-Stil gehalten sein.

[Datenquelle & KPIs]
Nutze folgende Basis-Daten für das Dashboard:
- Unternehmen: [Unternehmensname hier einfügen]
- Berichtszeitraum: [z.B. Q3 2026]
- Kern-KPIs: 
  1. Eigenkapitalquote (CET1): [Wert, z.B. 14.8%]
  2. Zinsüberschuss: [Wert, z.B. 1.24 Mrd. EUR]
  3. Risikovorsorge: [Wert, z.B. 310 Mio. EUR]
  4. Cost-Income-Ratio: [Wert, z.B. 54.2%]

[Funktionale Anforderungen an das Artifact]
1. Layout: Ein modernes, sauberes Grid-Layout mit Sidebar für Filter und Hauptbereich für KPI-Karten und interaktive Charts (nutze SVG oder simple CSS-Balken für Visualisierungen).

2. Interaktivität: 
   - Ein Dropdown-Filter für Regionen (Deutschland, Luxemburg, Schweiz).
   - Ein Regler (Slider) zur Simulation von Zinsänderungen (+/- 100 Basispunkte), der die prognostizierten Auswirkungen auf den Zinsüberschuss in Echtzeit neu berechnet.

3. Design-Vorgabe (Nordic Clean Ice):
   - Primärfarbe: #0284c7 (Klares Banken-Blau)
   - Hintergrund: Sehr helle, kühle Grautöne (#f8fafc)
   - Keine überladenen Animationen, Fokus auf maximale Datendichte und Lesbarkeit.

Generiere nun das komplette, fehlerfreie Artifact mit lauffähigem Code.
```

---

### Best Practices & Stolpersteine für den Alltag

<div style="border-left: 4px solid #0284c7; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Pro-Tipp für Consultants:</strong> Wenn das generierte Dashboard nicht sofort alle Berechnungen korrekt durchführt, antworten Sie Claude nicht mit langen Erklärungen, sondern nutzen Sie präzise Korrekturanweisungen direkt im Chat: <em>"Aktualisiere das Artifact so, dass der Zinsänderungs-Slider die Gesamtkapitalrendite direkt dynamisch mitaktualisiert."</em>
</div>

- Keine externen npm-Pakete einfordern: Da Claude Code via CDN (React, Tailwind, Lucide) ausliefert, sollten Sie darauf achten, keine komplexen Backend-Datenbanken oder Node-Pakete vorauszusetzen. Alles muss rein clientseitig im Browser laufen.
- Daten-Sicherheit: Füttern Sie öffentliche Claude-Instanzen niemals mit echten, vertraulichen Kundendaten oder Insiderinformationen aus dem Bankenumfeld. Nutzen Sie anonymisierte Dummy-Daten für den Prototypenbau und matchen Sie die echten Daten erst in der lokalen Umgebung.

---

### Häufig gestellte Fragen (FAQ)

1. Kann ich die Daten aus dem Claude Artifact exportieren?
Ja. Da der Code als saubere HTML/React-Struktur vorliegt, können Sie das Artifact herunterladen, auf einem lokalen Server hosten oder den Code direkt in Ihr unternehmensinternes Repository einspielen.

2. Funktioniert dieser Prompt auch mit ChatGPT oder Google Gemini?
Der Prompt funktioniert prinzipiell auch dort, allerdings besitzen ChatGPT (Advanced Data Analysis) und Gemini andere Ausgabemechanismen. Claude 3.5 Sonnet ist derzeit ungeschlagen darin, interaktive Frontend-Prototypen in einem isolierten, direkt nutzbaren Live-Fenster (Artifacts) zu rendern.

3. Wie verhindere ich, dass die KI Finanzkennzahlen frei erfindet (Halluzinationen)?
Geben Sie im Prompt immer exakte Startwerte vor (wie im Template gezeigt) und fügen Sie den Befehl hinzu: *"Erfinde keine zusätzlichen Finanzkennzahlen, die nicht in der obigen Liste stehen."*
