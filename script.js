const grid = document.getElementById('grid');
const movesSpan = document.getElementById('moves');
const timeSpan = document.getElementById('time');
const restartBtn = document.getElementById('restart');

let cards = ['🐶','🐱','🐭','🦊','🐻','🐼','🐨','🐯'];
cards = [...cards, ...cards]; // duplicar para pares
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let time = 0;
let timer;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cards);
    grid.innerHTML = '';
    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = symbol;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard(e) {
    const card = e.target;
    if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
        if (!timer) startTimer();
    } else {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    moves++;
    movesSpan.textContent = `Tentativas: ${moves}`;
    if (firstCard.textContent === secondCard.textContent) {
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timeSpan.textContent = `Tempo: ${time}s`;
    }, 1000);
}

function restartGame() {
    clearInterval(timer);
    timer = null;
    time = 0;
    moves = 0;
    movesSpan.textContent = `Tentativas: 0`;
    timeSpan.textContent = `Tempo: 0s`;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    createBoard();
}

restartBtn.addEventListener('click', restartGame);

// Inicializar jogo
createBoard();
