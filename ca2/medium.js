let cards = [
    { id: 1, src: "./assets/avocado.jpg" },
    { id: 2, src: "./assets/blueberry.jpg" },
    { id: 3, src: "./assets/orange.jpg" },
    { id: 4, src: "./assets/cherry.jpg" },
    { id: 5, src: "./assets/strawberry.jpg" },
    { id: 6, src: "./assets/banana.jpg" },
    { id: 7, src: "./assets/pineapple.jpg" },
    { id: 8, src: "./assets/pomegranate.jpg" },
    { id: 9, src: "./assets/avocado.jpg" },
    { id: 10, src: "./assets/blueberry.jpg" },
    { id: 11, src: "./assets/orange.jpg" },
    { id: 12, src: "./assets/cherry.jpg" },
    { id: 13, src: "./assets/strawberry.jpg" },
    { id: 14, src: "./assets/banana.jpg" },
    { id: 15, src: "./assets/pineapple.jpg" },
    { id: 16, src: "./assets/pomegranate.jpg" },
];

let gameBoard = document.getElementById("game-board");
let openedCard = null;
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard() {
    shuffle(cards);
    gameBoard.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
        img.src = "./assets/logo.png";
        img.dataset.id = cards[i].id;
        img.dataset.src = cards[i].src;
        img.classList.add("card-image");
        img.addEventListener("click", flipCard);
        card.appendChild(img);
        gameBoard.appendChild(card);
    }
}

function flipCard() {
    if (this.classList.contains("matched") || this === openedCard) {
        return;
    }

    this.src = this.dataset.src;

    if (openedCard === null) {
        openedCard = this;
    } else {
        const currentCard = this;
        if (openedCard.dataset.src === currentCard.dataset.src && openedCard !== currentCard) {
            this.removeEventListener("click", flipCard);
            openedCard.removeEventListener("click", flipCard);
            this.classList.add("matched");
            openedCard.classList.add("matched");
            openedCard = null;
            matchedPairs++;
            updateScore(5);
            crt();
            if (matchedPairs === 8) {
                setTimeout(() => {
                        const currentScore = getScore();
                        window.location.href = `congrats.html?score=${currentScore}`;
            
                    
                }, 500);
            }
        } else {
            setTimeout(() => {
                openedCard.src = "./assets/logo.png";
                currentCard.src = "./assets/logo.png";
                openedCard = null;
                updateScore(-1); 
                wrng();
            }, 500);
        }
    }
}
let timerInterval; 

function startTimer() {
    let seconds = 30;
    const timerDisplay = document.getElementById("timer");

    timerInterval = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timerInterval);
            const currentScore = getScore();
            window.location.href = `gameover.html?score=${currentScore}`;
            return;
        }

        timerDisplay.textContent = seconds;
        seconds--;
    }, 1000); 
}

function stopTimer() {
    clearInterval(timerInterval);
}

window.onload = function() {
    startTimer(); 
};

function restartGame() {  
    stopTimer();
    window.location.href = "starting.html";
}
document.addEventListener("click", function() {
    const click = document.getElementById("click");
    click.play();
});

createGameBoard();

