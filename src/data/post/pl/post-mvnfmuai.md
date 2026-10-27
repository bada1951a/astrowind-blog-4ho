---
title: "Claude Artifacts: Jak projektować własne ikony SVG i ilustracje webowe za pomocą promptów"
description: "Praktyczny poradnik architekta promptów: jak wykorzystać Claude Artifacts do generowania produkcyjnych ikon SVG i grafik wektorowych dla IT."
publishDate: 2026-10-25T03:45:00.000Z
image: 'https://picsum.photos/seed/prompt-mvnfoltd-9-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Claude Artifacts", "SVG", "Prompt Engineering", "Web Design", "AI UI"]
theme: "Steel Silver Metallic"
---

## 1. Awaryjna sytuacja związana z halucynacjami i błędami AI

Poniedziałek, rano. Dokładnie o 8:45 mam wejść na salę konferencyjną w warszawskim biurowcu na rondzie Daszyńskiego na 전사 주간 회의 (wewnętrzną odprawę zarządu i menedżerów). Sytuacja kryzysow

**A.** w ostatniej chwili zmienił się motyw przewodni prezentacji o nowych produktach cloudowych. Zamiast gotowych, generycznych ikon z banków stockowych, dyrektor marketingu rzucił hasło: „Potrzebujemy unikalnego zestawu minimalistycznych ikon SVG oraz ilustracji systemowych dopasowanych do naszego brandingu, i to na wczoraj”. 

W weekend system pękł w szwach od napływających danych rynkowych, a ja utknąłem z trzydziestoma raportami i zerową wizualizacją. Próbowałem na szybko klikać w Figmie, ale ręczne rysowanie trzydziestu ikonek mikroserwisów, baz danych i bezpiecznych tuneli VPN w kwadrans to czysta abstrakcj

**A.** Zwykłe generatory obrazów PNG odpadały – potrzebowałem kodu wektorowego, który bezpośrednio osadzę w kodzie naszej aplikacji webowej, zachowując skalowalność i styl Steel Silver Metallic.

![Claude Artifacts Prompt to Create Custom SVG Icons and Web Illustrations Prompt Guide](https://picsum.photos/seed/prompt-mvnfoltd-9-b/1000/550.jpg)

## 2. Szczegółowa analiza przyczyn nieudanych promptów i luk w logice

Dlaczego standardowe podejście do promptowania sztucznej inteligencji w tym scenariuszu zawodzi? Kiedy prosisz ChatGPT lub Claude o zwykły obrazek, otrzymujesz plik rastrowy (PNG/JPG), który przy responsywnym designie na ekranach Retina traci ostrość. Z kolei proste zapytanie w stylu: *„Napisz kod SVG dla ikony chmury”* kończy się zazwyczaj otrzymaniem brzydkiego, chaotycznego kodu zaszumionego zbędnymi znacznikami `<path>`, bez zachowania spójnego viewBoxa, warstw czy responsywnych stylów CSS.

<div style="border-left: 4px solid #64748b; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Architektoniczna wskazówk

**A.** </strong> Claude Artifacts rewolucyjna funkcja pozwalająca na podgląd i edycję kodu w locie – działa idealnie z formatem SVG, ponieważ model renderuje grafikę bezpośrednio w osobnym panelu bocznym. Kluczem do sukcesu nie jest samo wygenerowanie rysunku, ale wymuszenie na modelu struktury czystego kodu produkcyjnego: semantycznego, zdefiniowanego w systemie grid 24x24, ze zmiennymi CSS dla kolorów.
</div>

## 3. Gotowy szablon master promptu do natychmiastowego użycia

Poniższy prompt to sprawdzony, produkcyjny szablon stworzony specjalnie pod środowisko Claude Artifacts. Skopiuj go, wklej do okna czatu i dostosuj parametry w nawiasach kwadratowych do swoich aktualnych potrzeb projektowych.

```markdown
Jesteś starszym grafikiem wektorowym i front-end developerem specjalizującym się w systemach projektowych UI/UX. Twoim zadaniem jest zaprojektowanie spójnej, minimalistycznej ikony SVG / ilustracji webowej przy użyciu funkcji Claude Artifacts.

### Wymagania techniczne:
1. **Format:**Czysty kod SVG, gotowy do wdrożenia produkcyjnego (bez znaczników HTML wokół kodu, wyłącznie tag <svg>...</svg>).

2.**Skala i siatk

**A.Użyj viewBox="0 0 24 24" (dla ikon) lub viewBox="0 0 800 600" (dla ilustracji).

3.**Stylistyk

**A.Styl "Steel Silver Metallic", nowoczesna geometria liniowa (stroke-width: 1.5px do 2px), zaokrąglone rogi (stroke-linecap="round", stroke-linejoin="round").

4.**Paleta kolorów:**- Główny akcent: #64748b (Slate Gray)
   - Tło / Kontrast: #0f172a (Dark Charcoal) oraz czyste przestrzenie transparentne.

5.**Semantyk

**A.Użyj grup (<g>), logicznych identyfikatorów oraz zmiennych CSS, aby ikona była w pełni responsywn

**A.** ### Kontekst projektu:
[Wpisz tutaj dokładny opis obiektu, np.: Ikona reprezentująca bezpieczny tunel VPN łączący mikroserwisy w chmurze AWS]

Wygeneruj kompletny kod w panelu Artifacts oraz krótko wyjaśnij decyzje projektowe dotyczące kompozycji.
```

## 4. Wskazówki i ostrzeżenia profesjonalnego inżyniera promptów

Aby uniknąć typowych błędów generatywnych (takich jak niedomknięte ścieżki czy nakładające się warstwy), w codziennej pracy w polskim sektorze IT stosuję następujące zasady bezpieczeństwa promptów:

-**Wymuszenie czystości kodu:** Dodaj w sekcji systemowej klauzulę: *„Zabrania się używania zagnieżdżonych bitmap wewnątrz tagu image. Wszystko musi być oparte na czystych krzywych (path, rect, circle)”*.
- **Kontrola wersji w Artifacts:**Jeśli pierwsza iteracja ikony jest zbyt skomplikowana, nie pisz nowego czatu od zer

**A.** Użyj przycisku**Version History** w panelu Claude Artifacts i wydaj krótką komendę korekcyjną: *„Uprość ścieżki w wersji 2, usuwając zewnętrzne cienie i zachowując wyłącznie kontur”*.
- **Optymalizacja tokenów:**Zamiast ładować do kontekstu całe pliki specyfikacji brandu, wklejaj jedynie krótkie kody hex oraz nazwy 3 głównych zasad wizualnych.

## 5. Najczęściej zadawane pytania (FAQ)

**Q.** Czy ten prompt zadziała w darmowej wersji ChatGPT, czy muszę korzystać wyłącznie z Claude?

**A.** Szablon został zaprojektowany i zoptymalizowany pod kątem**Claude Artifacts**, ponieważ model ten potrafi bezpośrednio renderować i wyświetlać podgląd wizualny kodu SVG w bocznym oknie. W ChatGPT możesz uzyskać sam kod tekstowy SVG, jednak stracisz wygodę natychmiastowego podglądu graficznego.

**Q.** Jak zmusić model, aby ikony zachowywały spójną grubości linii przy różnych rozmiarach?

**A.** Kluczem jest zdefiniowanie w prompcie parametru `vector-effect="non-scaling-stroke"` oraz operowanie na stałej siatce bazowej (np. 24x24 piksele). Dzięki temu skalowanie ikony do mniejszych formatów w CSS nie powoduje zgrubienia ani rozmycia kresek.

**Q.** Co zrobić, gdy wygenerowany plik SVG zawiera zbędne metadane lub atrybuty edytora (np. Adobe Illustrator)?

**A.** Wystarczy dopisać na końcu promptu modyfikator: *„Oczyść wygenerowany kod SVG ze wszystkich śmieciowych komentarzy, atrybutów edytorów graficznych, zbędnych grup oraz osadzonych stylów globalnych, pozostawiając wyłącznie zoptymalizowaną strukturę DOM”*.
