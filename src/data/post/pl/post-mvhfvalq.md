---
title: "Claude 3.5 Sonnet i Artifacts: Jak zbudowac interaktywny dashboard w 10 minut"
description: "Praktyczny przewodnik architekta promptow: jak tworzyc interaktywne prototypy dashboardow w Warszawie z Claude 3.5 Sonnet."
publishDate: 2026-10-21T19:45:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhfxjxx-9-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "Claude", "Dashboard", "UI Prototyping"]
theme: "Cyberpunk Terminal"
---


<div style="border-left: 4px solid #00ffcc; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,255,204,0.08); border-radius: 4px; color: #111827; font-family: monospace;">
SYSTEM STATUS: READY // TARGET: Claude 3.5 Sonnet Artifacts // MODE: Interactive Dashboard Prototype
</div>

Godzina 16:45 w biurze na warszawskiej Woli. Klient z branży fintech wrzuca na Slacka pilny komunikat: "Zarząd zmienił zdanie, jutro rano musimy pokazać klikalny prototyp nowego dashboardu analitycznego, inaczej tracimy kontrakt". Zespół projektowy zamiera, bo front-endowcy już zwinęli stanowiska, a UX designer ma urlop. Tradycyjne kodowanie w Reactcie od zera zajęłoby nam co najmniej trzy dni. Wtedy przypominam sobie, że mam pod ręką Claude 3.5 Sonnet i jego funkcję Artifacts. Zamiast pisać kod ręcznie, postanawiam wygenerować cały, w pełni interaktywny interfejs za pomocą jednego, precyzyjnie skonstruowanego promptu.

![How to Use Claude 3.5 Sonnet Artifacts to Build Interactive Dashboard Prototypes Prompt Guide](https://picsum.photos/seed/prompt-mvhfxjxx-9-b/1000/550.jpg)

Przez pierwsze dziesięć minut borykałem się z klasycznym problemem amatorów. Wpisałem prosty prompt: "Zrób mi ładny dashboard analityczny w HTML i React". Efekt? Katastrof

a. Claude wypluł statyczny, płaski kod, który nie reagował na kliknięcia, wykresy były brzydkie, a całość sypała się w konsoli przeglądarki z powodu brakujących bibliotek i nieobsłużonych stanów komponentów. Model błądził, bo nie dostarczył mu architektury danych, wymagań dotyczących bibliotek UI (takich jak Tailwind CSS czy Lucide Icons) ani jasnych instrukcji interaktywności. 

Przełom nastąpił, gdy podszedłem do tematu jak architekt systemów AI. Zrozumiałem, że Claude 3.5 Sonnet w trybie Artifacts potrafi renderować aplikacje webowe w locie, o ile zdefiniujemy dla niego ścisłe ramy technologiczne i strukturę komponentów. Kluczem okazało się stworzenie uniwersalnego szablonu promptu, który wymusza na modelu użycie nowoczesnego stacku (React, Tailwind CSS, Recharts) oraz zaimplementowanie autentycznej interaktywności: filtrowania danych w czasie rzeczywistym, przełączania zakładek i dynamicznych wykresów.

Oto gotowy, sprawdzony w bojach szablon promptu, którego używam w warszawskim sektorze IT do tworzenia gotowych szablonów zapytań dla całego zespołu projektowego.

```markdown
Jesteś starszym architektem front-end i ekspertem UI/UX. Twoim zadaniem jest stworzenie w pełni interaktywnego prototypu dashboardu przy użyciu funkcji Artifacts w Claude 3.5 Sonnet.

[KONTEKST PROJEKTU]
- Cel biznesowy: [Wpisz cel, np. Dashboard monitorujący transakcje fintech w czasie rzeczywistym]
- Grupa docelow

a: [Wpisz odbiorców, np. Analitycy finansowi i zarząd spółki]
- Wymagany stack technologiczny: React (z użyciem Tailwind CSS do stylizacji, Lucide React do ikonek oraz Recharts do wykresów). Kod musi być samowystarczalny i działać bezpośrednio w przeglądarce wewnątrz Artifacts.

[WYMAGANE KOMPONENTY I FUNKCJONALNOŚĆ]
1. Górny pasek nawigacyjny (Navbar): Logo, przełącznik motywu (ciemny/jasny), powiadomienia oraz profil użytkownik

a.

2. Panel statystyk (KPI Cards): Minimum 4 karty z kluczowymi wskaźnikami (np. Przychód, Aktywni użytkownicy, Wskaźnik konwersji, Błędy systemowe) wraz ze wskaźnikami wzrostu/spadku (procenty i zielone/czerwone strzałki).

3. Główny obszar wykresów: Interaktywny wykres liniowy pokazujący trend w czasie oraz wykres słupkowy lub kołowy podziału danych.

4. Tabela danych operacyjnych: Ostatnie transakcje lub zdarzenia z funkcją wyszukiwania tekstowego w czasie rzeczywistym oraz prostym filtrowaniem po statusie (Sukces, Ostrzeżenie, Błąd).

[ZASADY IMPLEMENTACJI TECHNICZNEJ]
- Użyj czystego kodu w jednym pliku (lub wyraźnie podzielonych komponentach wewnątrz tego samego bloku kodu), aby uniknąć błędów importu.
- Zapewnij pełną responsywność (układ musi dobrze wyglądać na tabletach i dużych monitorach).
- Dodaj przykładowe dane (mock data) o wysokiej jakości, które sprawią, że dashboard od razu będzie wyglądał realistycznie, a nie jak pusta makiet

a.
- Zadbaj o płynne przejścia i stany hover na przyciskach oraz elementach interaktywnych.

Wygeneruj kompletny kod w panelu Artifacts.
```

<div style="border-left: 4px solid #00ffcc; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,255,204,0.08); border-radius: 4px; color: #111827; font-family: monospace;">
PRO-TIP ARCHITEKT

A: Zamiast pisać całą specyfikację za każdym razem, zapisz powyższy blok w repozytorium zespołu jako bazowy szablon (.md) i zmieniaj jedynie sekcję [KONTEKST PROJEKTU]. Oszczędza to średnio 40 minut pracy nad jednym prototypem.
</div>

Aby uniknąć powszechnych hallukynacji modelu i błędów renderowania w Artifacts, stosuj poniższe zasady bezpieczeństw

a:
- Kontrola bibliotek: Zawsze explicitnie wskazuj modelowi, jakich bibliotek ma używać (np. `Recharts` dla wykresów), w przeciwnym razie spróbuje napisać niestandardowe wykresy SVG, które często się psują.
- Stan początkowy (State): Wymuś na modelu zdefiniowanie domyślnych danych testowych (mock data). Pusta tablica danych to najczęstsza przyczyna "białego ekranu" w wygenerowanym prototypie.
- Iteracyjne poprawki: Jeśli dashboard działa, ale brakuje jakiejś funkcji, nie pisz promptu od now

a. Odpowiedz w tym samym wątku: "Dodaj do obecnego komponentu filtrowanie tabeli po dacie w prawym górnym rogu".

Oto najczęściej zadawane pytania przez inżynierów i menedżerów, z którymi pracuję:

### FAQ

1. Czy wygenerowany przez Claude Artifacts kod można łatwo wyeksportować do produkcyjnego repozytorium?
Tak. Claude 3.5 Sonnet generuje czysty kod w React i Tailwind CSS. Możesz kliknąć przycisk pobierania wewnątrz Artifacts lub skopiować kod bezpośrednio do swojego projektu, doinstalować brakujące paczki (np. `lucide-react`, `recharts`) i od razu wdrożyć go w środowisku deweloperskim.

2. Co zrobić, gdy wykresy w wygenerowanym dashboardzie się nie ładują?
Najczęstszą przyczyną jest brak zaimportowania komponentów z biblioteki `recharts` w nagłówku pliku. Wystarczy poprosić model: "Popraw importy biblioteki Recharts w wygenerowanym kodzie, upewniając się, że ResponsiveContainer, LineChart i XAxis są poprawnie zaimportowane".

3. Czy mogę poprosić Claude o zmianę stylu wizualnego całego dashboardu jednym poleceniem?
Oczywiście. Ponieważ pracujemy w ekosystemie Tailwind CSS, wystarczy krótka komenda w tym samym wątku, na przykład: "Zmień paletę kolorów całego dashboardu na elegancki motyw ciemny w stylu cyberpunk z akcentami neonowego turkusu i głębokiej czerni", a Artifacts zaktualizuje widok w kilka sekund.
