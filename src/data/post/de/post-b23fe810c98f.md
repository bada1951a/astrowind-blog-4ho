---
title: "Perplexity Pro Search für Patent- und Literaturrecherche nutzen"
description: "Mit gezielten Suchaufträgen Patente und Fachliteratur finden, Quellen prüfen und Rechercheergebnisse nachvollziehbar einordnen."
publishDate: 2026-10-31T10:30:00.000Z
image: "https://picsum.photos/seed/prompt-mvwag6fy-3-c/1200/675.jpg"
category: "Prompt Engineering"
tags: ["Prompt-Engineering","ChatGPT","Claude","Generative KI"]
theme: "Nordic Clean Ice"
---

## 1. Von der Idee zur belastbaren Recherchefrage

Wer ein technisches Konzept prüft, eine wissenschaftliche Arbeit vorbereitet oder eine Produktentwicklung begleitet, steht oft vor derselben Frage: Welche Patente und Fachveröffentlichungen sind wirklich relevant – und was lässt sich aus ihnen verlässlich ableiten? Eine allgemeine Suche liefert schnell viele Treffer, aber nicht unbedingt die richtigen. Legen Sie deshalb zunächst fest, welche Entscheidung die Recherche unterstützen soll: Geht es um bekannte technische Ansätze, den Forschungsstand, mögliche Wettbewerber oder eine erste Orientierung zum Schutzrechtsumfeld?

Perplexity Pro Search kann eine solche Recherche durch gezielte Suchanfragen und verknüpfte Quellen unterstützen. Es ersetzt jedoch weder eine vollständige Recherche in geeigneten Patentdatenbanken noch eine rechtliche Bewertung. Entscheidend ist, die Frage so einzugrenzen, dass Ergebnisse überprüfbar bleiben.

Notieren Sie vor dem ersten Suchlauf die technische Fragestellung in einem oder zwei Sätzen. Benennen Sie das Problem, die gesuchte Lösung und gegebenenfalls die Anwendung. „Batteriespeicher verbessern“ ist beispielsweise zu weit gefasst. Eine präzisere Frage könnte auf ein bestimmtes Verfahren zur Temperaturregelung und dessen Einsatz in einem festgelegten Gerätetyp zielen. Das ist nur eine Formulierungshilfe, keine Aussage über eine konkrete Technologie.

Ergänzen Sie außerdem, was ausdrücklich nicht untersucht werden soll. Ein Suchauftrag kann etwa auf bestimmte Materialien, Einsatzbereiche oder Veröffentlichungsjahre begrenzt werden. Solche Grenzen machen die Ergebnisse besser einordbar, schließen aber nicht aus, dass relevante Quellen außerhalb des gewählten Rahmens liegen.

![How to Use Perplexity Pro Search Prompts for Deep Patent and Academic Research Prompt Guide](https://picsum.photos/seed/prompt-mvwag6fy-3-b/1000/550.jpg)

## 2. Patente und Fachliteratur getrennt betrachten

Patenttexte und wissenschaftliche Arbeiten beantworten unterschiedliche Fragen. Patente beschreiben Erfindungen und beanspruchte Schutzbereiche; Fachartikel untersuchen Methoden, Daten oder Ergebnisse. Eine Patentanmeldung kann zeitlich vor einer Veröffentlichung liegen. Umgekehrt belegt ein wissenschaftlicher Artikel nicht, dass eine Technik patentfrei oder frei nutzbar ist.

Führen Sie deshalb zwei Suchläufe durch. Für Patente gehören technische Synonyme, mögliche Anwendungsfelder und – falls bekannt – IPC- oder CPC-Klassen in die Anfrage. Für Literatur sind Fachbegriffe, verwandte Schreibweisen, Veröffentlichungszeitraum und relevante Disziplinen hilfreich. Bei internationalen Recherchen sollte die Suche nicht auf deutsche Begriffe beschränkt bleiben: Englischsprachige Fachtermini und Patentfamilien können den Überblick verändern.

Die getrennte Suche erleichtert auch den Vergleich der Treffer. Bei Patenten sind beispielsweise Anmelde- und Veröffentlichungsdaten, Aktenzeichen, Patentfamilien und Anspruchsfassungen relevant. Bei Artikeln stehen Autor:innen, Publikationsort, DOI, Methoden und Ergebnisse im Vordergrund. Eine gemeinsame Tabelle kann anschließend beide Quellentypen zusammenführen, solange ihre unterschiedlichen Angaben klar gekennzeichnet bleiben.

Unterscheiden Sie zudem zwischen einer Recherche nach dem Stand der Technik und einer Suche nach wissenschaftlichen Ergebnissen. Die erste kann Hinweise auf frühere technische Offenbarungen liefern; die zweite zeigt, welche Methoden oder Resultate in Fachveröffentlichungen diskutiert werden. Keine der beiden Suchen beantwortet für sich allein, ob eine bestimmte Nutzung rechtlich zulässig ist.

## 3. Suchaufträge präzise formulieren

Ein brauchbarer Prompt nennt Thema, Zweck, Zeitraum, Quellentyp und gewünschte Ausgabe. Er sollte außerdem festlegen, wie mit Unsicherheit umzugehen ist: Fehlende Daten sollen als nicht gefunden oder ungeklärt markiert werden, statt sie zu ergänzen. Ein möglicher Ausgangspunkt lautet:

`Untersuche den Forschungs- und Patentstand zu [Technologie] für [Anwendungsgebiet]. Suche getrennt nach Patenten und wissenschaftlichen Veröffentlichungen aus [Zeitraum]. Berücksichtige die Begriffe [Synonyme] und passende IPC/CPC-Klassen, sofern auffindbar. Nenne je Quelle Titel, Veröffentlichungs- oder Anmeldedatum, Erfinder beziehungsweise Autor:innen, Aktenzeichen oder DOI, zuständige Patentbehörde beziehungsweise Publikationsort und einen direkten Link. Fasse die technische Lösung und ihre Grenzen knapp zusammen. Kennzeichne offene Punkte, statt sie zu ergänzen.`

Passen Sie die Platzhalter an die konkrete Fragestellung an. Ein zu weiter Zeitraum kann eine große, schwer zu prüfende Trefferliste ergeben; ein zu enger Zeitraum kann relevante frühere Quellen ausblenden. Wenn der passende Zeitraum unklar ist, können Sie zunächst einen breiteren Überblick anfordern und anschließend gezielt nach Zeitabschnitten suchen.

Auch die Ausgabe lässt sich steuern. Bitten Sie um eine Tabelle mit getrennten Spalten für Quelle, Quellentyp, Datum, Kennung, technische Merkmale, behaupteten Beitrag und offene Prüffrage. Fragen Sie zusätzlich nach den Suchbegriffen und Kriterien, die für die Auswahl verwendet wurden. Das macht die Recherche nachvollziehbarer und hilft, fehlende Begriffe später zu ergänzen.

Stellen Sie danach gezielte Folgefragen, statt die gesamte Prüfung in einem Schritt erledigen zu lassen: `Welche technischen Suchbegriffe fehlen?`, `Welche Patentfamilien betreffen dieselbe Erfindung?` oder `Welche Quellen widersprechen dieser Einordnung?` Behandeln Sie Antworten als Suchhinweise, die sich anhand der Originalquellen prüfen lassen. Bei einer unvollständigen Antwort kann ein engerer Prompt helfen, etwa indem Sie nur nach einer bestimmten Kennung oder nach Quellen innerhalb eines klar angegebenen Zeitraums fragen.

## 4. Quellen und Schlussfolgerungen prüfen

Ein Zitat oder Link ist ein Prüfhinweis, kein Gütesiegel. Öffnen Sie jeden zentralen Treffer in der Originalquelle: bei Patenten etwa beim zuständigen Patentamt, in einem Patentregister oder in einer etablierten Patentdatenbank; bei Fachliteratur beim Verlag, in einem Repositorium oder anhand von DOI und bibliografischen Angaben. Stimmen Titel, Autor:innen, Datum und Kennung nicht überein, sollte der Treffer nicht als Beleg dienen.

Prüfen Sie nicht nur, ob eine Quelle existiert, sondern auch, ob sie die konkrete Aussage tatsächlich stützt. Ein Abstract kann einen ersten Eindruck vermitteln, reicht aber oft nicht aus, um Methoden, Einschränkungen oder Anspruchsdetails zu beurteilen. Bei wissenschaftlichen Arbeiten sollten Sie, soweit verfügbar, den Volltext und die dort beschriebenen Methoden berücksichtigen. Bei Patentdokumenten ist es wichtig, zwischen Beschreibung, Zusammenfassung und Ansprüchen zu unterscheiden.

Besonders wichtig sind Patentfamilien, Rechtsstand und Anspruchsfassung. Mehrere Dokumente können zu einer Patentfamilie gehören und dieselbe Erfindung in verschiedenen Ländern betreffen. Eine veröffentlichte Anmeldung ist nicht automatisch ein erteiltes Patent; und eine Erteilung bedeutet nicht ohne Weiteres, dass ein Schutzrecht in jedem Land gilt. Der Rechtsstand kann sich ändern und muss für die konkrete Fragestellung in den maßgeblichen Registern geprüft werden.

Halten Sie Unsicherheiten in der Auswertung sichtbar fest. Sinnvolle Kategorien sind zum Beispiel „durch Originalquelle bestätigt“, „bibliografische Angaben noch abzugleichen“ und „technische Aussage nicht ausreichend belegt“. Vermerken Sie auch, ob eine Zusammenfassung auf einem Abstract, dem vollständigen Artikel oder einem Patentdokument beruht. So werden Suchergebnisse nicht mit verifizierten Schlussfolgerungen verwechselt.

Abstracts reichen nicht aus, um den Schutzbereich zu bestimmen. Für Entscheidungen zu Schutzfähigkeit, Verletzungsrisiko oder Handlungsfreiheit ist eine fachkundige Prüfung erforderlich. Perplexity kann beim Auffinden und Strukturieren helfen, aber die Verantwortung für die Verifikation bleibt bei der recherchierenden Person.

## 5. Häufige Fragen

**Q1.** Kann Perplexity Pro Search eine Patentrecherche ersetzen?

**A1.** Nein. Es kann Suchbegriffe entwickeln und Quellen auffindbar machen, aber eine systematische Recherche in passenden Patentdatenbanken und eine Prüfung des Rechtsstands nicht ersetzen. Nutzen Sie die Ergebnisse als Ausgangspunkt und verifizieren Sie wichtige Angaben in den maßgeblichen Originalquellen.

**Q2.** Sollte ich Patente und Fachartikel in einem Prompt suchen?

**A2.** Für einen ersten Überblick kann das funktionieren. Für nachvollziehbare Ergebnisse sind getrennte Suchläufe meist besser, weil Patentdaten und wissenschaftliche Publikationen unterschiedliche Kennungen, Quellen und Bewertungsmaßstäbe haben. Die getrennten Treffer können Sie anschließend in einer gemeinsamen Übersicht gegenüberstellen.

**Q3.** Wie erkenne ich, ob ein Treffer als Beleg taugt?

**A3.** Öffnen Sie die Originalquelle und gleichen Sie bibliografische Angaben, Datum und Kennung ab. Prüfen Sie außerdem, ob die konkrete Aussage tatsächlich in der Quelle steht und ob sie sich auf eine Anmeldung, eine Erteilung oder eine wissenschaftliche Auswertung bezieht. Kennzeichnen Sie ungeklärte Angaben, statt sie aus dem Suchergebnis abzuleiten.

**Q4.** Was sollte ein Prompt enthalten?

**A4.** Nennen Sie das technische Thema, den Anwendungsbereich, den gewünschten Zeitraum, die Quellentypen, bekannte Synonyme und das gewünschte Ausgabeformat. Bitten Sie darum, fehlende Informationen als offen zu markieren und Quellen mit direkten Links und bibliografischen Kennungen anzugeben.

**Q5.** Wie gehe ich mit widersprüchlichen Treffern um?

**A5.** Prüfen Sie zunächst, ob die Quellen dieselbe Frage, denselben Zeitraum und denselben Quellentyp behandeln. Vergleichen Sie die Originaldokumente und halten Sie fest, worin der Widerspruch besteht. Wenn er sich anhand der verfügbaren Angaben nicht auflösen lässt, sollte die Einordnung offenbleiben.
