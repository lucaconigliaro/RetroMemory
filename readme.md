# Memory Retro

## Descrizione

Questo progetto è una semplice implementazione del classico gioco **Memory** realizzata con solo **HTML**, **CSS** e **JavaScript**. L’obiettivo del gioco è mettere alla prova la memoria visiva del giocatore, abbinando tutte le coppie di carte identiche nel minor numero di errori possibile.

## 📸 Screenshot

![Screenshot del gioco](/images/screen.png)



---


## Funzionalità implementate

- **Mescolamento casuale** delle carte a ogni caricamento della pagina per garantire una partita sempre diversa.
- Carte inizialmente **coperte** con un’immagine di retro.
- Possibilità di **scoprire le carte cliccandole**.
- Controllo se le due carte scoperte sono uguali:
  - Se sono uguali, rimangono scoperte.
  - Se sono diverse, si richiudono automaticamente dopo un secondo.
- Contatore degli **errori commessi**, visualizzato in tempo reale.
- Tre livelli di difficoltà con limite di errori differente:
  - Facile: senza limite di errori.
  - Medio: massimo 5 errori.
  - Difficile: massimo 3 errori.
- Conteggio e visualizzazione delle **vittorie consecutive** (streak).
- Animazioni e suoni per rendere il gioco più coinvolgente:
  - Suono di “flip” al girare la carta.
  - Suono di vittoria alla fine del gioco.
  - Animazione di glow sulle carte quando si vince.
- **Musica di sottofondo** con possibilità di attivarla/disattivarla tramite bottone.
- Messaggi a schermo per indicare vittoria o sconfitta, con opzioni per ricominciare o migliorare il record.
- Layout responsivo con stile **retro arcade** (colori blu e fucsia, font “Press Start 2P”).

## 👾 Come giocare 

1. Seleziona il livello di difficoltà.
2. Clicca sulle carte per scoprirle e prova a trovare tutte le coppie.
3. Attento a non superare il numero massimo di errori consentiti dalla difficoltà scelta.
4. Riuscendo a completare il gioco senza superare gli errori massimi, accumulerai vittorie consecutive.
5. Divertiti e cerca di migliorare il tuo record!

## ⚙️ Tecnologie utilizzate

- **HTML5** per la struttura della pagina.
- **CSS3** con Flexbox per il layout e animazioni.
- **JavaScript** puro per la logica di gioco, gestione eventi e controllo interattività.
- Font Google Fonts “Press Start 2P” per lo stile arcade retrò.

## Struttura della repo

- `index.html` – struttura base del gioco con elementi per interfaccia, bottoni e messaggi.
- `style.css` – regole di stile, layout e animazioni.
- `script.js` – logica del gioco, gestione carte, suoni, difficoltà e stati.
- `/images` – immagini delle carte e logo.
- `/sounds` – effetti audio per flip, vittoria e musica di sottofondo.

## 💭 Considerazioni finali

Questo progetto è un ottimo esercizio per consolidare le basi di frontend: manipolazione DOM, gestione eventi, stato applicazione e dinamica UI. Inoltre, unisce elementi di UX come suoni e animazioni per rendere l’esperienza più coinvolgente.

---

Buon divertimento e buon coding! 👾