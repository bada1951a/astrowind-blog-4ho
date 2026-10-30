---
title: "Szablon promptu do uprzejmego rozładowywania napięcia w mailach od klientów"
description: "Praktyczny sposób na przygotowanie spokojnej, rzeczowej odpowiedzi na trudnego maila klienta — z szablonem, kontrolą faktów i zasadami bezpieczeństwa."
publishDate: 2026-10-30T10:30:00.000Z
image: "https://picsum.photos/seed/prompt-mvuvbsnk-9-c/1200/675.jpg"
category: "Prompt Engineering"
tags: ["Inżynieria Promptów","ChatGPT","Claude","Generatywna AI"]
theme: "Cyberpunk Terminal"
---

## 1. Awaryjna sytuacja związana z halucynacjami i błędami AI

Mail od klienta może łączyć kilka spraw naraz: opóźnione wdrożenie, zarzut braku informacji i żądanie natychmiastowego terminu. W warszawskim zespole IT odpowiedź często przechodzi przez kilka osób, a każda musi rozumieć, co jest ustalone, a co dopiero wymaga sprawdzenia. Jak napisać spokojnie, nie przyznając racji tam, gdzie brakuje danych, i nie obiecując czegoś w imieniu zespołu?

ChatGPT może pomóc uporządkować ton i strukturę, ale nie powinien rozstrzygać sporu ani uzupełniać brakujących faktów. Dlatego zacząłbym od oddzielenia treści maila od informacji, które firma może potwierdzić. Dopiero potem prosiłbym o szkic odpowiedzi. To prosty podział, a zmniejsza ryzyko, że uprzejmy tekst zabrzmi jak niezamierzone przyznanie się do winy.



![ChatGPT Prompt Template to De-escalate Difficult Client Emails Politely Prompt Guide](https://picsum.photos/seed/prompt-mvuvbsnk-9-b/1000/550.jpg)

## 2. Szczegółowa analiza przyczyn nieudanych promptów i luk w logice

Nieudany prompt często zawiera polecenie typu „odpisz profesjonalnie i uspokój klienta”, ale nie określa, co znaczy „uspokój”. Model może wtedy wygładzić konflikt, pomijając sedno reklamacji, albo dopisać deklarację w rodzaju „naprawimy to do jutra”. Taka obietnica jest bezpieczna tylko wtedy, gdy użytkownik podał ją jako zatwierdzony fakt.

Druga luka to brak celu wiadomości. Czy odpowiedź ma potwierdzić odbiór, poprosić o logi, skorygować nieporozumienie, czy przekazać sprawę do opiekuna? Bez tej decyzji tekst może być miły, lecz nieprzydatny. Warto też wskazać odbiorcę i relację: inaczej pisze się do stałego klienta B2B, inaczej do osoby zgłaszającej awarię po raz pierwszy.

Przed użyciem narzędzia sprawdziłbym trzy rzeczy: czy wklejany mail zawiera dane osobowe lub poufne szczegóły, czy znamy potwierdzone fakty oraz jaki następny krok możemy rzeczywiście zaproponować. Jeśli nie wolno przekazywać danych do zewnętrznej usługi, należy użyć zatwierdzonego narzędzia firmowego albo zastąpić identyfikujące informacje neutralnymi oznaczeniami. Sama prośba o „empatię” nie zastąpi tej kontroli.

## 3. Gotowy szablon master promptu do natychmiastowego użycia

Wklej najpierw tylko niezbędny fragment korespondencji, zgodnie z zasadami obowiązującymi w organizacji. Uzupełnij pola w nawiasach kwadratowych; usuń każde, którego nie potrzebujesz. W szczególności nie zostawiaj modelowi ustalania terminów ani zakresu odpowiedzialności.

`Pomóż mi przygotować odpowiedź na mail klienta. Napisz po polsku, spokojnie, uprzejmie i konkretnie. Nie obwiniaj klienta ani zespołu. Nie używaj sarkazmu, defensywnego tonu ani pustych zapewnień.

Cel odpowiedzi: [np. potwierdzić zgłoszenie i poprosić o brakujące dane]
Odbiorca i kontekst: [np. klient B2B, korespondencja formalna]
Potwierdzone fakty: [wypisz wyłącznie informacje sprawdzone]
Możliwe następne kroki: [wypisz działania, które możemy zaoferować]
Czego nie wolno obiecać ani stwierdzić: [np. terminu naprawy, jeśli nie został zatwierdzony]
Mail klienta: [wklej dozwolony, zanonimizowany tekst]

Przygotuj szkic do weryfikacji przez człowieka. Uznaj emocje klienta bez przesadnych przeprosin i bez przyznawania odpowiedzialności, której nie potwierdzono. Oddziel fakty od kwestii wymagających sprawdzenia. Jeśli brakuje informacji, zadaj maksymalnie dwa konkretne pytania zamiast zgadywać. Nie dodawaj dat, ustaleń, przyczyn ani zobowiązań, których nie podano. Na końcu wskaż w punktach każde miejsce, które wymaga potwierdzenia.`

Po otrzymaniu szkicu sprawdziłbym go w dwóch przebiegach: najpierw pod kątem zgodności z faktami i uprawnieniami nadawcy, potem pod kątem tonu oraz jasnego następnego kroku. Jeśli odpowiedź ma być krótka, można dodać limit, na przykład `do 120 słów`, ale nie kosztem ważnych informacji.

## 4. Wskazówki i ostrzeżenia profesjonalnego inżyniera promptów

- Nie wklejaj całego wątku, jeśli do odpowiedzi wystarczy jeden fragment. Usuń nazwiska, adresy e-mail, identyfikatory zgłoszeń i dane techniczne, które nie są potrzebne.
- Nie proś o „przyznanie się do błędu” ani „odparcie zarzutów”, jeśli celem jest rzeczowa komunikacja. Takie instrukcje mogą przesunąć szkic w stronę obrony lub nieuzgodnionych ustępstw.
- Sprawdź każde „zrobimy”, „gwarantujemy” i „do [data]”. To właśnie w tych sformułowaniach najłatwiej niechcący złożyć obietnicę.
- Zweryfikuj, czy odpowiedź odnosi się do głównego problemu klienta, a nie tylko do jego emocji. Uprzejme zdanie bez konkretnego działania może zostać odebrane jako zbywanie.
- Traktuj wynik jako projekt, nie gotową decyzję. Przy sporze o zakres umowy, bezpieczeństwo, reklamację lub rekompensatę odpowiedź powinien zatwierdzić właściwy pracownik.

Dobra wiadomość deeskalująca nie musi być przesadnie ciepła. Powinna pokazać, że zgłoszenie zostało zrozumiane, nazwać to, co wiadomo, i zaproponować realny kolejny krok. Jeśli model nie potrafi tego zrobić bez dopowiadania faktów, uprościłbym prompt albo napisał odpowiedź samodzielnie.

## 5. Najczęściej zadawane pytania (FAQ)


**Q1.** Czy ChatGPT powinien przepraszać w imieniu firmy?

**A1.** Może przygotować neutralne wyrażenie ubolewania, jeśli pasuje do sytuacji, ale nie powinien samodzielnie przyznawać odpowiedzialności. Zdecyduj, czy takie sformułowanie jest zgodne z faktami i zasadami firmy.


**Q2.** Co zrobić, gdy brakuje potwierdzonego terminu rozwiązania problemu?

**A2.** Nie wpisuj daty na próbę. Poproś o krótką odpowiedź potwierdzającą, co jest już sprawdzane i kiedy można przekazać kolejną aktualizację — tylko jeśli taki termin aktualizacji został zatwierdzony.


**Q3.** Czy można użyć tego samego szablonu do każdej reklamacji?

**A3.** Można zachować jego strukturę, ale za każdym razem trzeba zmienić cel, potwierdzone fakty i dozwolone działania. Inne informacje są potrzebne przy awarii, sporze o fakturę i pytaniu o zakres umowy.
