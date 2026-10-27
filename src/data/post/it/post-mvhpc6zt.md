---
title: "Midjourney V6: Come mantenere lo stesso volto in 20 scene diverse"
description: "Guida pratica per mantenere la consistenza dei volti dei personaggi in Midjourney V6 per progetti aziendali e presentazioni."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpdobw-6-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Midjourney", "Prompt Engineering", "Consistenza Volti", "AI Generativa", "Design"]
theme: "Teal Matrix Digital"
---

## 1. Emergenza improvvisa per allucinazioni dell'IA e risposte errate

Mancavano esattamente quattro ore alla presentazione del nuovo progetto per un cliente internazionale nel nostro studio a Milano, e il panico aveva appena raggiunto i livelli di guardi

**A.** Stavamo chiudendo uno sprint intensivo per sviluppare un prompt di copywriting e analisi dati, accompagnato da una storyboard visiva di venti scene. Il problema? Ogni volta che generavo un'immagine con Midjourney V6, il volto del nostro protagonista, un giovane data analyst milanese di nome Marco, cambiava completamente connotati. Nella scena uno era un trentenne barbuto con gli occhiali tartarugati; nella scena due si trasformava in un ventenne sbarbato dai capelli biondi. Impossibile presentare una sequenza narrativa coerente al board aziendale con un personaggio che cambia faccia a ogni slide.

<div style="border-left: 4px solid #14b8a6; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Nota dall'Architetto:</strong> Smetti di perdere ore a rigenerare immagini a caso. La consistenza dei volti in Midjourney V6 non si ottiene per magia o per sfortuna, ma sfruttando parametri specifici come <code>--cref</code> e descrizioni anatomiche fisse.
</div>

![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpdobw-6-b/1000/550.jpg)

## Perché il Prompt Semplice Fallisce

Fino a ieri, la gestione dei personaggi multipli in Midjourney era un terno al lotto. Scrivere semplicemente "un uomo di trent'anni con gli occhiali in un ufficio" restituisce variazioni infinite basate sul rumore latente del modello. Midjourney V6 ha introdotto una comprensione del linguaggio naturale straordinaria, ma questo significa anche che interpreta ogni piccolo cambio di contesto nel prompt come una modifica potenzialmente radicale dei tratti somatici del soggetto. 

Se cambiamo l'azione da "sta scrivendo al computer" a "sta bevendo un caffè alla macchinetta", il motore ricrea il volto da zero, ignorando il precedente. Per risolvere questo problema alla radice, dobbiamo combinare il parametro di riferimento dei personaggi con una struttura di prompt modulare.

## La Soluzione: Il Master Prompt Template per la Consistenza

Ecco la struttura esatta che ho testato e perfezionato nel nostro studio per bloccare i tratti somatici del personaggio attraverso tutte le 20 scene della nostra presentazione aziendale.

```markdown
[Identificatore Visivo Unico], [Età e Etnia], [Tratti somatici specifici e immutabili], [Abbigliamento costante], [Azione della scena specifica], [Contesto e Illuminazione], [Stile fotografico o grafico] --cref [URL_Immagine_Originale] --cw 80 --v 6.0
```

### Come configurare le variabili chiave:
- Identificatore Visivo Unico: Usa un nome in codice o una combinazione di parole chiave uniche (es. *Marco milanese, 32 years old*).
- Tratti somatici: Sii chirurgico. Specifica forma del viso, taglio di capelli, presenza di occhiali o barba (es. *short neat dark brown hair, thin black rimmed glasses, subtle stubble beard, focused expression*).
- Parametro --cref (Character Reference): Prendi l'URL della prima immagine venuta benissimo e incollala alla fine di ogni prompt successivo. È il vero motore della consistenza in V6.
- Parametro --cw (Character Weight): Impostalo su `80` (valore consigliato). Dice a Midjourney di copiare dal riferimento sia il viso che i capelli e i vestiti. Se vuoi mantenere solo la faccia e cambiare abiti tra una scena e l'altra, abbassalo a `0` o `20`.

<div style="border-left: 4px solid #14b8a6; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Consiglio Pro:</strong> Quando usi <code>--cw 0</code> per cambiare i vestiti del personaggio nelle diverse scene, mantieni rigorosamente invariate le prime parole descrittive del volto nel testo del prompt per evitare derive stilistiche.
</div>

## Applicazione Pratic

**A.** Dalla Scena 1 alla Scena 20

Per applicare questo metodo in modo efficiente durante uno sprint di lavoro, procedi seguendo questi tre passaggi operativi:

1. Generazione del Master (Scena 1): Crea l'immagine di partenza perfetta del tuo personaggio con il prompt descrittivo completo. Salva l'URL di questa immagine generat

**A.** 2. Duplicazione e Variazione: Per le scene successive, mantieni identica la stringa descrittiva del volto e il parametro `--cref [URL_Master] --cw 0`, cambiando unicamente l'azione e l'ambientazione finale (es. *working on a dual-monitor setup in a Milan design agency* vs *walking down via Torino under the rain holding an umbrella*).

3. Controllo Qualità Rapido: Esporta le immagini in batch e verifica che i tratti biometrici chiave (forma degli occhi, naso, proporzioni) rimangano allineati.

## Domande Frequenti (FAQ)

### Posso usare --cref con immagini generate in versioni precedenti di Midjourney come la V5.2?
No, il parametro `--cref` è stato introdotto specificamente per la V6 ed è ottimizzato per funzionare al meglio con lo stile e la nitidezza di questa versione. Ti consiglio di generare un nuovo master direttamente in V6 per iniziare la tua sequenz

**A.** ### Come faccio a mantenere anche lo stesso stile grafico (es. 3D corporate render o fotografia editoriale) oltre al volto?
Puoi combinare il parametro `--cref` con il parametro `--sref` (Style Reference). Aggiungendo `--sref [URL_Immagine_Stile]` alla fine del prompt, costringerai Midjourney a mantenere coerente non solo la faccia del personaggio, ma anche la palette cromatica e l'estetica visiva di tutte le venti scene.

### Cosa succede se il personaggio deve indossare abiti completamente diversi nelle varie scene?
Basta impostare il parametro di peso del personaggio su `--cw 0`. In questo modo Midjourney copierà esclusivamente la struttura facciale (occhi, naso, bocca, forma del viso), permettendoti di vestire il tuo protagonista con giacca e cravatta nella scena iniziale e con abiti casual nelle scene successive.
