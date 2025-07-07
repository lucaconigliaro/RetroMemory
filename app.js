// Icone delle carte, doppie per creare le coppie
const icons = ['alien.png', 'bug.png', 'duck.png', 'rocket.png', 'tiktac.png', 'white.png'];

let images = [];           // array che conterrà le immagini duplicate e mescolate
let board = document.getElementById('board'); // contenitore delle carte

// Variabili di stato per il gioco
let firstCard = null;      // prima carta scoperta dall’utente
let secondCard = null;     // seconda carta scoperta
let errors = 0;            // numero di errori commessi
let streak = 0;            // vittorie consecutive
let maxErrors = Infinity;  // massimo errori permessi, variabile in base alla difficoltà
let currentDifficulty = 'easy'; // difficoltà selezionata (easy/medium/hard)

// Elementi audio dal DOM
const winSound = document.getElementById('win-sound');
const flipSound = document.getElementById('flip-sound');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('toggle-music');

let musicPlaying = false;
musicToggle.textContent = ' Musica OFF';

// Bottone per attivare o disattivare la musica
musicToggle.addEventListener('click', () => {
  if (musicPlaying) {
    // Se musica accesa, la metto in pausa e aggiorno bottone
    bgMusic.pause();
    musicPlaying = false;
    musicToggle.textContent = ' Musica OFF';
  } else {
    // Se musica spenta, imposto volume, faccio partire la musica e aggiorno bottone
    bgMusic.volume = 0.3;
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicToggle.textContent = ' Musica ON';
    }).catch(() => {
      // Se il browser blocca l’audio, rimango in stato OFF
      musicPlaying = false;
      musicToggle.textContent = ' Musica OFF';
    });
  }
});

// Gestione click sui bottoni di difficoltà
const difficultyButtons = document.querySelectorAll('.difficulty-button');
difficultyButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Rimuovo la classe 'selected' da tutti i bottoni e la assegno solo a quello cliccato
    difficultyButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    // Aggiorno la difficoltà corrente e ricreo la board resettando la partita
    currentDifficulty = button.dataset.difficulty;
    createBoard(true);
  });
});

// Imposto il limite massimo di errori permessi in base alla difficoltà selezionata
function setMaxErrors() {
  if (currentDifficulty === 'easy') maxErrors = Infinity;  // nessun limite
  else if (currentDifficulty === 'medium') maxErrors = 5;
  else if (currentDifficulty === 'hard') maxErrors = 3;
}

// Funzione per mescolare un array (semplificata)
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Funzione che crea o ricrea la board delle carte
// Se resetAll=true, resetta anche lo streak vittorie
function createBoard(resetAll = false) {
  setMaxErrors(); // aggiorno max errori in base alla difficoltà

  images = [...icons, ...icons]; // raddoppio le icone per formare le coppie
  board.innerHTML = '';           // pulisco la board (elimino carte precedenti)
  document.getElementById('message').style.display = 'none'; // nascondo messaggi di vittoria/sconfitta
  errors = 0;                    // resetto errori fatti
  document.getElementById('errors').textContent = errors;   // aggiorno contatore errori a schermo

  if (resetAll) {
    streak = 0; // resetto lo streak delle vittorie
    document.getElementById('streak').textContent = streak;
  }

  firstCard = null;  // resetto carta 1 selezionata
  secondCard = null; // resetto carta 2 selezionata

  const shuffled = shuffle(images); // mescolo le carte

  // Creo ogni carta come div con immagine retro e dataset con nome immagine
  shuffled.forEach(src => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.src = src;  // memorizzo immagine reale
    card.style.backgroundImage = "url('images/back.png')"; // mostra retro carta
    card.addEventListener('click', onCardClick); // aggiungo evento click
    board.appendChild(card); // aggiungo carta alla board
  });
}

// Funzione gestisce click su una carta
function onCardClick(e) {
  const card = e.target;

  // Ignoro click se carta già scoperta o se sto gestendo seconda carta
  if (card.style.backgroundImage.includes(card.dataset.src) || secondCard) return;

  // Suono flip carta
  flipSound.currentTime = 0;
  flipSound.play();

  // Scopro la carta mostrando immagine reale
  card.style.backgroundImage = `url('images/${card.dataset.src}')`;

  if (!firstCard) {
    // Se prima carta non selezionata, la seleziono
    firstCard = card;
  } else {
    // Se prima carta già selezionata, prendo seconda carta
    secondCard = card;

    if (firstCard.dataset.src === secondCard.dataset.src) {
      // Se carte uguali, lascio scoperte e resetto selezioni
      firstCard = null;
      secondCard = null;
      checkWin(); // controllo se hai vinto
    } else {
      // Se carte diverse, aumento errori
      errors++;
      document.getElementById('errors').textContent = errors;

      if (errors >= maxErrors) {
        // Hai superato il limite di errori, resetto streak e mostro messaggio perdita
        streak = 0;
        document.getElementById('streak').textContent = streak;
        showMessage('💥 Hai perso! Vuoi riprovare?');
      } else {
        // Se non hai perso, richiudo le carte dopo 1 secondo
        setTimeout(() => {
          firstCard.style.backgroundImage = "url('images/back.png')";
          secondCard.style.backgroundImage = "url('images/back.png')";
          firstCard = null;
          secondCard = null;
        }, 1000);
      }
    }
  }
}

// Controlla se tutte le carte sono scoperte (hai vinto)
function checkWin() {
  const matched = [...document.querySelectorAll('.card')].every(card =>
    card.style.backgroundImage.includes(card.dataset.src)
  );

  if (matched) {
    // Suono vittoria
    winSound.currentTime = 0;
    winSound.play();

    // Incremento streak vittorie
    streak++;
    document.getElementById('streak').textContent = streak;

    // Aggiungo classe per eventuali animazioni vittoria
    document.querySelectorAll('.card').forEach(card => {
      card.classList.add('win');
    });

    // Mostro messaggio vittoria con opzione per giocare ancora
    showMessage('🎉 Hai vinto! Vuoi giocare ancora e superare il tuo record?');
  }
}

// Mostra messaggio (vittoria o sconfitta)
function showMessage(text) {
  document.getElementById('message-text').textContent = text;
  document.getElementById('message').style.display = 'block';
}

// Eventi per i bottoni "Nuova partita" e "Gioca ancora"
document.getElementById('restart').addEventListener('click', () => createBoard(true));
document.getElementById('play-again').addEventListener('click', () => createBoard(false));

// Regole del gioco
const toggleRulesBtn = document.getElementById('toggle-rules');
const gameRules = document.getElementById('game-rules');

toggleRulesBtn.addEventListener('click', () => {
  const isVisible = !gameRules.hidden;
  gameRules.hidden = isVisible;
  toggleRulesBtn.textContent = isVisible
    ? 'Mostra regole del gioco'
    : 'Nascondi regole del gioco';
});

// Inizializzo la board alla prima apertura
createBoard(true);