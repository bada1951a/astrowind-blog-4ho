---
title: "Jak rozbić viralowe wideo z YouTube na czynniki pierwsze za pomocą jednego promptu"
description: "Praktyczny przewodnik architekta promptów: jak stworzyć szablon AI, który dekonstruje strukturę dowolnego hitu na YouTube w kilka sekund."
publishDate: 2026-10-20T19:45:00.000Z
image: 'https://picsum.photos/seed/prompt-mvgsvvc6-9-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips"]
theme: "Modern Minimalist Slate"
---

## 1. Awaryjna sytuacja związana z halucynacjami i błędami AI

Wtorek, 8:30 rano, biuro na warszawskiej Woli. Klient z branży fintech wrzuca na nasz kanał Slack link do zagranicznego wideo, które w trzy dni zrobiło milion wyświetleń. Rzuca krótkie: „Potrzebujemy dokładnie takiej dynamiki narracji w naszej nowej serii materiałów edukacyjnych o kryptowalutach. Zróbcie mi strukturę tego skryptu na wczoraj, bo o 11:00 mamy spotkanie z zarządem”. 

Znamy to wszyscy. Próba ręcznego spisania skryptu, analizowania psychologii widza, tempa cięć i momentów zwrotnych zajmuje co najmniej trzy godziny żmudnej roboty. A przecież nie o to chodzi, żeby przepisywać tekst kropka w kropkę, tylko żeby zrozumieć *szkielet*, który przyciąga uwagę.

Wpisałem wtedy w ChatGPT klasyczne: *"Przeanalizuj ten film i napisz mi podobny skrypt"*. Efekt? Bezużyteczna ściana tekstu, która brzmiała jak wypracowanie gimnazjalisty z historii. Model całkowicie pominął timing, psychologiczne haki retoryczne (tzw. hooks) oraz architekturę zaangażowani

A. <div style="border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Lekcja z poligonu:</strong> Modele językowe nie potrafią czytać intencji wprost. Jeśli pytasz ogólnie, dostajesz ogólne, generyczne odpowiedzi. Aby wyciągnąć ze skryptu czystą inżynierię odwrotną, musisz narzucić sztucznej inteligencji rygorystyczną rolę analityka mediów społecznościowych.
</div>

## Dlaczego zwykłe promptowanie zawodzi?

Większość użytkowników traktuje ChatGPT jak wyszukiwarkę Google. Wklejają link lub transkrypcję i oczekują cudu. Tymczasem kluczem do inżynierii odwrotnej (reverse engineering) jest rozbicie tekstu na warstwy:
1. Warstwa emocjonaln

A. W którym momencie widzik odczuwa strach, ciekawość lub ulgę?

2. Warstwa strukturaln

A. Jak zbudowany jest wstęp (pierwsze 30 sekund)? Gdzie następuje punkt zwrotny?

3. Warstwa retoryczn

A. Jakie techniki argumentacji zastosowano, by utrzymać retencję?

Zamiast pisać poematy do AI, stworzyłem systemowy prompt szablonowy, który traktuje skrypt jak kod źródłowy aplikacji. Poniżej znajdziesz gotowy arkusz zapytań, który wdrożyłem w naszym zespole projektowym w Warszawie.

## Master Prompt Template: Inżynieria Odwrotna Skryptu

Skopiuj poniższy blok kodu, uzupełnij zmienne w nawiasach kwadratowych i wklej go do ChatGPT (polecam GPT-4o) lub Claude 3.5 Sonnet.

```markdown
Jesteś starszym analitykiem contentu wideo i ekspertem ds. retencji widza na YouTube z 10-letnim doświadczeniem w branży. Twoim zadaniem jest przeprowadzenie rygorystycznej inżynierii odwrotnej dostarczonego skryptu lub transkrypcji wideo, aby rozłożyć go na czynnik pierwszy.

Oto transkrypcja źródłowa, którą analizujemy:
[Wklej tutaj transkrypcję wideo lub opis jego kluczowych momentów]

Przeanalizuj powyższy materiał i przygotuj raport w formacie strukturalnym, uwzględniając poniższe sekcje:

1. ARCHITEKTURA HAKA (0-30 sekunda):
- Jaki mechanizm psychologiczny zastosowano na samym początku? (np. otwarta pętla informacyjna, szokująca statystyka, kontrintuicyjna teza).
- Dokładna treść lub mechanika pierwszego zdani

A. 2. SZKIELET NARRACYJNY (Timeline):
- Podziel materiał na bloki czasowe/tematyczne.
- Dla każdego bloku określ: Cel dramatyczny, zastosowaną technikę utrzymania uwagi oraz punkt zwrotny.

3. ANALIZA RETORYCZNA I TON:
- Jaki jest profil emocjonalny narratora? (np. autorytarny, peer-to-peer, gawędziarski).
- Jakie wzorce językowe i słowa-klucze napędzają zaangażowanie?

4. SZABLON ODTWÓRCZY (Blueprint):
- Stwórz uniwersalny szablon (wypunktowany algorytm) na bazie tej struktury, który mogę wykorzystać do napisania własnego skryptu na temat: [Wpisz tutaj swój nowy temat, np. bezpieczeństwo w chmurze AWS].

Zachowaj konkretny, biznesowy i analityczny ton. Unikaj ogólników. Skup się wyłącznie na mechanikach, które realnie budują czas oglądania (watch time).
```

## Praktyczne warianty i dobre praktyki

Aby ten system działał bezbłędnie w codziennej pracy projektowej, trzymaj się kilku żelaznych zasad inżynierii promptów:

* Zasada kontekstu branżowego: Jeśli analizujesz wideo technologiczne, dodaj w prompcie doprecyzowanie: *"Analizuj ten skrypt pod kątem widza będącego programistą lub inżynierem DevOps, który nie znosi marketingu i szuka twardych faktów"*.
* Ograniczanie halucynacji: Jeśli transkrypcja jest bardzo długa (powyżej 15 minut), podziel ją na dwie części lub poproś najpierw model o wygenerowanie streszczenia blokowego, a dopiero potem o szczegółowy audyt struktur retorycznych.
* Format wyjściowy: Wymóg formatowania w punktach (bullet points) drastycznie skraca czas przetwarzania przez model i sprawia, że gotowy szablon od razu nadaje się do przekazania copywriterowi.

<div style="border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Wskazówka architekt

A. </strong> Zapisz powyższy szablon w swojej firmowej bazie promptów (np. w Notion lub w systemie wewnętrznym). Zamiast pisać za każdym razem od nowa, zmieniaj jedynie zmienną tematyczną na końcu. Zaoszczędzisz średnio 45 minut pracy na każdym nowym projekcie wideo.
</div>

## Często Zadawane Pytania (FAQ)

### 1. Czy ten prompt zadziała w darmowej wersji ChatGPT?
Tak, prompt zadziała zarówno w darmowej wersji (np. z modelem GPT-4o mini), jak i w wersjach płatnych czy u konkurencyjnych dostawców, takich jak Claude. Pamiętaj jednak, że zaawansowane modele LLM znacznie lepiej radzą sobie z wyłapywaniem subtelnych niuansów psychologicznych i konstrukcji retorycznych w tekście.

![ChatGPT Prompt to Reverse Engineer Any Viral YouTube Script Structure Prompt Guide](https://picsum.photos/seed/prompt-mvgsvvc6-9-b/1000/550.jpg)

### 2. Co zrobić, jeśli nie mam gotowej transkrypcji wideo?
Możesz skorzystać z darmowych narzędzi online do pobierania transkrypcji z YouTube lub wkleić link bezpośrednio do modeli, które obsługują przeglądanie sieci i analizę multimediów (np. ChatGPT Plus z włączonym browsingiem lub Gemini Pro). Wklejenie czystego tekstu daje jednak zawsze najbardziej przewidywalne i stabilne rezultaty.

### 3. Czy użycie takiego szablonu oznacza plagiat analizowanego wideo?
Absolutnie nie. Inżynieria odwrotna polega na podpatrywaniu *struktury matematycznej i psychologicznej* (np. jak budować napięcie, w którym momencie wprowadzić dowód społeczny), a nie na bezmyślnym kopiowaniu słów. Twój produkt końcowy będzie oparty na zupełnie nowym, unikalnym kontekście i wiedzy merytorycznej Twojego zespołu.
