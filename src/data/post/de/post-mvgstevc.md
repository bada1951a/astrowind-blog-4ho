---
title: "Der YouTube-Skript-Deconstructor: Virale Strukturen mit ChatGPT entschlüsseln"
description: "Wie ich im Frankfurter Banken- und Consultingbereich virale YouTube-Skripte für automatisierte Geschäftsberichte reverse-engineere."
publishDate: 2026-10-20T12:15:00.000Z
image: 'https://picsum.photos/seed/prompt-mvgsua8h-3-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips"]
theme: "Tokyo Neon Violet"
---


Es ist Dienstag, kurz vor 21:00 Uhr im Frankfurter Banken- und Consultingbereich. Draußen regnet es auf die Hochhäuser, drinnen brennt noch Licht. Auf meinem Schreibtisch stapeln sich die Anforderungen zur Automatisierung von Geschäftsberichten. Mein Chef kommt gestresst in mein Büro: „Die Vorstandspräsentation morgen Früh braucht einen komplett neuen Aufhänger. Die Leute schlafen bei unseren Zahlen ein. Schau dir mal an, wie die Top-Finanzkanäle auf YouTube komplexe Bilanzen in packende 10-Minuten-Storys verpacken. Brich mir diese Skripte sofort in eine wiederverwendbare Struktur herunter, damit wir das auf unsere Finanzdaten anwenden können!“ Kein „Guten Abend“, keine Vorwarnung. Nur die nackte Panik vor trockenen Folien.

Mein erster Impuls war typisch für die alte Schule: Ich warf ChatGPT ein rohes Transkript eines extrem viralen YouTube-Finanzvideos hin mit dem Befehl: *„Analysiere dieses Skript und schreib es für Bankberichte um.“* 

![ChatGPT Prompt to Reverse Engineer Any Viral YouTube Script Structure Prompt Guide](https://picsum.photos/seed/prompt-mvgsua8h-3-b/1000/550.jpg)

Das Ergebnis? Eine absolute Katastrophe. ChatGPT spuckte eine generische Zusammenfassung aus, die klang wie ein drittklassiges Lehrbuch für VWL im ersten Semester. Die emotionale Haken-Architektur (Hook), das Pacing, die psychologischen Spannungsbögen und die knackigen Übergänge – all das, was das virale Video ausmachte, war komplett verschwunden. Der Output war steif, voller Floskeln und meilenweit von einem präzisen, fesselnden Geschäftsbericht entfernt.

Das Problem lag auf der Hand: LLMs wie GPT-4 oder Claude 3.5 Sonnet brauchen keine vagen Bitten, sondern ein architektonisches Reverse-Engineering-Framework. Sie müssen wie ein forensischer Medienanalyst instruiert werden, der die DNA eines Skripts in messbare Bausteine zerlegt.

<div style="border-left: 4px solid #8b5cf6; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Architekten-Tipp:</strong> Wenn Sie virale Skripte analysieren lassen wollen, füttern Sie die KI niemals mit dem gesamten Text am Stück, wenn dieser länger als 3.000 Wörter ist. Nutzen Sie eine strukturierte Systemanweisung, die das Skript in chronologische Sequenzen (0-30 Sek., 30-120 Sek. usw.) unterteilt.
</div>

Nach einigem Experimentieren habe ich einen Master-Prompt entwickelt, der exakt dieses Problem löst. Er bricht jedes beliebige virale Skript in eine standardisierte, wiederverwendbare Struktur auf, die sich nahtlos auf Corporate- und Finanzthemen anwenden lässt.

### Das Master-Prompt-Template

Kopieren Sie diesen Prompt in Ihr LLM (getestet mit ChatGPT Plus und Claude 3.5 Sonnet). Ersetzen Sie einfach den Platzhalter am Ende mit Ihrem Ziel-Transkript.

```markdown
# Rolle & Ziel
Du bist ein erfahrener Medienpsychologe, Copywriter und Senior Prompt-Architekt im Bereich Corporate Communications. Deine Aufgabe ist es, das folgende virale YouTube-Transkript einem tiefgreifenden Reverse-Engineering zu unterziehen. Du brichst die zugrundeliegende psychologische und strukturelle Architektur auf, damit wir sie für die Automatisierung von Geschäftsberichten und Finanzpräsentationen nutzen können.

# Analyse-Anforderungen
Analysiere das untenstehende Transkript exakt nach folgenden Kriterien und gib die Antwort strukturiert in Markdown aus:

1. DIE HOOK-ARCHITEKTUR (Sekunde 0 bis 30):
- Welcher psychologische Trigger wird genutzt (Angst, Neugier, Kontra-Intuitivität)?
- Wie lautet die genaue Formel des Einstiegssatzes?

2. DER SPANNUNGSBOGEN & DAS PACING:
- In welche dramaturgischen Akte ist das Video unterteilt (z.B. Problem, falsche Lösung, Enthüllung, Beweis)?
- Nach wie vielen Sekunden erfolgt ein Perspektivwechsel oder ein neuer Reiz?

3. RETENTION-MECHANISMEN:
- Welche Stilmittel werden eingesetzt, um die Abbrecherrate zu minimieren (z.B. offene Loops, Metaphern, Zahlen-Kontraste)?

4. STRUKTUR-TEMPLATE FÜR UNSERE FINANZDATEN:
- Erstelle eine generalisierte 5-Schritte-Template-Struktur basierend auf diesem Skript, die wir direkt für Quartalszahlen und Geschäftsberichte befüllen können.

# Zu analysierendes Transkript:
[HIER DAS YOUTUBE-TRANSKRIPT EINFÜGEN]
```

### Praktische Variationen und Sicherheits-Tipps

Im Banken- und Consultingumfeld ist Datensicherheit entscheidend. Nutzen Sie niemals sensible Kundendaten oder interne Bilanzen in öffentlichen Prompts. Verwenden Sie diesen Prompt ausschließlich für die *Strukturanalyse* externer, öffentlich zugänglicher Medieninhalte. 

* Token-Spar-Tipp: Wenn das Transkript sehr lang ist, fügen Sie am Anfang des Prompts die Instruktion ein: *„Ignoriere Füllwörter, Wiederholungen und Begrüßungen des Creators. Konzentriere dich ausschließlich auf den argumentativen Kern.“*
* Systemanweisungen (Custom Instructions): Wenn Sie diesen Workflow regelmäßig für Geschäftsberichte nutzen, hinterlegen Sie in den ChatGPT-Einstellungen als Persona: *„Du bist ein präziser Corporate-Copywriter, der komplexe Finanzdaten in fesselnde, verständliche Narrative übersetzt.“*

---

### Häufig gestellte Fragen (FAQ)

1. Funktioniert dieser Prompt auch bei Claude oder nur bei ChatGPT?
Der Prompt ist modellagnostisch und funktioniert hervorragend auf beiden Plattformen. Claude 3.5 Sonnet neigt oft zu noch präziseren, analytischen Strukturierungen bei langen Texten, während ChatGPT extrem schnell beim Extrahieren von Marketing-Hooks ist.

2. Was mache ich, wenn das YouTube-Transkript keine Formatierung oder Zeitstempel hat?
Das ist kein Problem. Das LLM ist intelligent genug, den zeitlichen Verlauf anhand der inhaltlichen Wendepunkte und Übergänge im Text logisch zu rekonstruieren. Sie können dem Prompt einfach den rohen Textblock übergeben.

3. Wie verhindere ich, dass das KI-Ergebnis zu reißerisch für den Bankensektor klingt?
Fügen Sie in der Rolle (im Prompt) die Einschränkung hinzu: *„Behalte die psychologische Sogwirkung bei, formuliere den Tonfall jedoch seriös, faktenbasiert und konform mit den Standards einer gehobenen Unternehmensberatung.“* So bleibt die Struktur viral, aber der Wortschatz bleibt bankentauglich.
