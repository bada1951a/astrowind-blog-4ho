---
title: "Midjourney V6: Jak utrzymać twarz tej samej postaci w 20 scenach"
description: "Praktyczny przewodnik po inżynierii promptów w Midjourney V6 dla warszawskiego sektora IT. Sprawdzone szablony spójności postaci."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpeg21-9-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "Midjourney", "Sztuczna Inteligencja", "IT"]
theme: "Mint Fresh Engineering"
---


Godzina 21:40, biuro w Warszawie. Klient z sektora fintech właśnie napisał na Slacku, że koncepcja wizualna naszej nowej aplikacji mobilnej jest świetna, ale... w każdej z 20 zaprezentowanych scen główny bohater wygląda zupełnie inaczej. Na pierwszym slajdzie to 30-letni wąsaty blondyn w garniturze, na drugim 22-letni student w bluzie z kapturem, a na dziesiątym kobieta w średnim wieku. Prezentacja dla zarządu jest jutro o 9:00 rano, a nasz zespół projektowy utknął w martwym punkcie, tracąc godziny na losowe generowanie obrazów w Midjourney V6, które za każdym razem tworzyły zupełnie nową osobę.

### Dlaczego zwykłe prompty niszczą spójność postaci?

![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpeg21-9-b/1000/550.jpg)

Kiedy wpisujemy do Midjourney V6 polecenia takie jak "młody programista piszący kod w biurze", model za każdym razem losuje nowe rysy twarzy, strukturę kości i fryzurę. Wynika to z faktu, że silnik AI traktuje każde zapytanie jako czystą kartę. Tradycyjne opisy tekstowe są zbyt elastyczne, co prowadzi do frustrujących halucynacji wizualnych, gdy potrzebujemy sekwencji narracyjnej z tym samym bohaterem.

<div style="border-left: 4px solid #059669; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Architektoniczna wskazówka Mint Fresh:</strong> W Midjourney V6 kluczem do sukcesu nie jest dokładny opis każdego włosa, lecz strategiczne wykorzystanie parametrów takich jak referencje obrazu (--cref) oraz stałe, unikalne kotwice leksykalne w strukturze promptu.
</div>

### Architektura Niezawodnego Szablonu (Master Prompt Template)

Aby rozwiązać ten problem raz na zawsze, przygotowałem dla naszego zespołu gotowy szablon zapytania, który gwarantuje powtarzalność rysów twarzy w 20 różnych scenach. Skopiuj poniższy format i dostosuj zmienne w nawiasach kwadratowych do swoich potrzeb.

```markdown
[Opis akcji i otoczenia], featuring a specific person with unique facial features: sharp jawline, short messy dark brown hair, thin silver-rimmed glasses, subtle freckles on nose, wearing [Kolor i typ ubrania], consistent face structure, cinematic lighting, photorealistic --cref [URL_PIERWSZEGO_OBRAZU] --cw 100 --v 6.0 --ar 16:9
```

#### Jak działa ten mechanizm w praktyce:
- Kotwica twarzy: Zamiast imienia używamy stałego zestawu cech antropometrycznych (*sharp jawline, short messy dark brown hair, thin silver-rimmed glasses, subtle freckles*).
- Parametr `--cref` (Character Reference): Wklejamy link do wygenerowanego w pierwszym kroku idealnego portretu bohater

a. To najważniejsza funkcja w V6 wymuszająca spójność.
- Parametr `--cw 100` (Character Weight): Ustawienie wartości 100 instruuje model, aby kopiował nie tylko twarz, ale również fryzurę i ubiór. Jeśli zmieniasz ubranie w kolejnych scenach, obniż tę wartość do 50 lub 0.

---

### Praktyczne Warianty i Optymalizacja Kosztów Tokenów

W codziennej pracy w zespole projektowym liczy się czas i precyzj

a. Oto zestawienie sprawdzonych modyfikatoriów, które możesz wdrożyć do swoich instrukcji systemowych dla sztucznej inteligencji:

- Scena biurow

a: Używaj `--cw 80`, aby zachować twarz, ale pozwolić Midjourney na zmianę profesjonalnego stroju.
- Scena dynamiczna w ruchu: Dodaj do promptu frazę `motion blur, action shot` i obniż `--cw` do 40, zapobiegając nienaturalnym deformacjom rysów podczas generowania szybkich akcji.
- Zbliżenia portretowe: Zwiększ wagę cech twarzy w tekście, zachowując ten sam URL w `--cref` dla zachowania 95% tożsamości postaci.

---

### Często Zadawane Pytania (FAQ)

1. Czy parametr `--cref` działa poprawnie, gdy zmieniam styl graficzny z fotografii na ilustrację 3D?
Nie zalecamy drastycznej zmiany stylu przy użyciu tego samego `--cref`. Parametr ten najlepiej sprawdza się w obrębie tej samej konwencji wizualnej. Jeśli zmieniasz styl z foto na kreskówkę, twarz ulegnie zniekształceniu.

2. Co zrobić, gdy Midjourney V6 ignoruje parametry i za każdym razem tworzy kogoś innego?
Upewnij się, że na końcu każdego promptu umieściłeś aktualną wersję silnika (`--v 6.0`). Starsze wersje nie obsługują poprawnie zaawansowanych referencji postaci i mogą traktować parametry jako zwykły tekst.

3. Jak zarządzać linkami do bazowych obrazów przy pracy w zespole?
Najlepiej stworzyć dedykowany kanał na Slacku lub dokument wewnątrz zespołu IT, gdzie przypinamy "Master Image" dla danej postaci. Wszyscy członkowie zespołu powinni kopiować ten sam URL do swoich promptów, co gwarantuje pełną spójność wizualną w całym projekcie.
