---
title: "Basta allucinazioni: i system prompt definitivi per ChatGPT e Claude"
description: "Guida pratica per bloccare le risposte inventate di ChatGPT e Claude con prompt di sistema testati negli studi professionali di Milano."
publishDate: 2026-10-24T03:30:00.000Z
image: 'https://picsum.photos/seed/prompt-mvlbif92-6-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips"]
theme: "Crimson Emergency Field"
---

## 1. Emergenza improvvisa per allucinazioni dell'IA e risposte errate

Sono le 17:30 di un giovedì pomeriggio piovoso in uno studio di consulenza strategica in zona Porta Nuova a Milano. Il socio senior mi passa d'urgenza l'incombenza.

"Ci serve un'analisi di mercato dettagliata sui nostri tre principali concorrenti entro le 19:00 per la riunione con il cliente tedesco". Apro la chat di Claude, inserisco la richiesta di estrarre quote di mercato, fatturati e strategie di pricing recenti dei competitor. L'intelligenza artificiale risponde in pochi secondi con tabelle perfette, grafici descritti testualmente e cifre al millesimo. Sembrava tutto fantastico, finché non ho iniziato a verificare i dati chiave. Nomi di prodotti mai esistiti, margini di profitto inventati di sana pianta e fatturati moltiplicati per dieci. Se avessi inoltrato quel report al cliente, la reputazione dello studio sarebbe andata in fumo nel giro di cinque minuti.

Il problema non è lo strumento in sé, ma il modo in cui gli diamo istruzioni. Quando chiediamo a ChatGPT o Claude di generare un'analisi di mercato senza vincoli rigorosi, il modello attiva la sua funzione di completamento probabilistico del testo. Tradotto: se non trova il dato esatto nei suoi parametri, piuttosto che ammettere di non saperlo, lo inventa per darci la risposta fluida e collaborativa che ci aspetta.

Negli ambienti aziendali milanesi, dove ogni dato economico deve essere verificabile e difendibile davanti a un comitato direttivo, questo comportamento rappresenta un rischio operativo inaccettabile.

![Best System Prompts to Stop ChatGPT and Claude from Hallucinating Data Prompt Guide](https://picsum.photos/seed/prompt-mvlbif92-6-b/1000/550.jpg)

Per risolvere definitivamente questo problema, dobbiamo smettere di trattare i chatbot come enciclopedie onniscienti e iniziare a gestirli come analisti junior rigorosi ma bisognosi di direttive ferree. La svolta è arrivata quando ho smesso di usare prompt generici e ho implementato un sistema basato su tre pilastri: vincolo di verità negativa, richiesta di citazione della fonte e blocco della sintesi creativa.

<div style="border-left: 4px solid #ef4444; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
Attenzione: Un buon prompt anti-allucinazione non chiede solo all'AI di trovare le informazioni, ma le impone di dichiarare l'assenza del dato qualora questo non sia reperibile nelle fonti affidabili o nella sua base di conoscenza verificata.

</div>

Ecco il prompt di sistema definitivo da impostare in ChatGPT o Claude prima di iniziare qualsiasi ricerca di dati aziendali o analisi di mercato critiche.

```markdown
Sei un analista di mercato senior e revisore finanziario estremamente rigoroso. Il tuo obiettivo principale è la precisione assoluta dei dati. 

Segui tassativamente queste regole operative:
1. TRASPARENZA TOTALE SULLE FONTI: Per ogni dato numerico, statistica, fatturato o quota di mercato che citi, devi indicare esplicitamente la fonte o la base di calcolo.

2. DIVIETO ASSOLUTO DI INVENTARE: Se non trovi un dato esatto nei tuoi dati di addestramento o nei documenti forniti, è VIETATO stimarlo, estrapolarlo o inventarlo. Scrivi chiaramente: "DATO NON DISPONIBILE".

3. VERIFICA INCROCIATA.

Se un'informazione è ambigua o non verificabile, segnala l'ambiguità prima di procedere con qualsiasi elaborazione.

4. FORMATO DI RISPOSTA.

Struttura la risposta dividendola in Fatti Verificati, Stime Dichiarate (se espressamente autorizzate) e Aree di Incertezza.

Ecco il contesto della richiesta.

- Settore di riferimento: [Inserisci settore, es. Digital Marketing a Milano]
- Oggetto dell'analisi: [Inserisci obiettivo, es. Analisi competitor X, Y, Z]
- Anno di riferimento obbligatorio: [Inserisci anno, es. 2025-2026]

Procedi ora con l'analisi applicando rigorosamente queste direttive.
```

Per ottenere i massimi risultati operativi in azienda, ci sono alcune buone pratiche da seguire quotidianamente. Prima di tutto, inserisci sempre questo blocco all'inizio della sessione di lavoro o salvalo nelle istruzioni personalizzate di ChatGPT. In secondo luogo, se stai analizzando documenti interni aziendali, carica i file PDF reali e aggiungi nel prompt la frase: "Rispondi usando esclusivamente le informazioni contenute nei documenti allegati, senza aggiungere dati esterni o supposizioni personali". Questa semplice aggiunta riduce quasi a zero il margine di errore e di invenzione da parte del modello linguistico.

FAQ





Q1. Perché ChatGPT e Claude continuano a inventare dati anche quando chiedo di essere precisi?





A1. I modelli linguistici di grandi dimensioni sono addestrati per prevedere la parola successiva più probabile e mantenere una conversazione fluida.

A. Quando non possiedono un dato specifico, la loro architettura tende a riempire il vuoto generando una risposta plausibile dal punto di vista sintattico ma completamente falsa nei contenuti, un fenomeno noto come allucinazione.





Q2. Posso usare questo prompt di sistema sia su ChatGPT che su Claude con gli stessi risultati?





A2. Sì, il prompt funziona in modo eccellente su entrambi i sistemi. Claude di Anthropic tende naturalmente a essere più prudente e ad ammettere i propri limiti rispetto a ChatGPT, ma l'aggiunta di vincoli espliciti di verità negativa e l'obbligo di dichiarare i dati mancanti garantiscono un livello di affidabilità professionale su entrambe le piattaforme.





Q3. Cosa devo fare se l'AI continua a rispondere con "Dato non disponibile" per ogni richiesta?





A3. Significa che il perimetro dei vincoli è troppo stretto rispetto alla complessità della richiesta o che i dati cercati sono troppo recenti per la base di addestramento del modello. In questo caso, puoi allegare file di ricerca aggiornati, report di settore in formato PDF o articoli recenti, chiedendo all'AI di estrarre le informazioni esclusivamente da quei materiali specifici.
---
