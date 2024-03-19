let score = 0;

function updateScore(points) {
    score += points;
}

function getScore() {
    return score;
}

const urlParams = new URLSearchParams(window.location.search);
const gameScore = urlParams.get('score');
if (gameScore !== null) {
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = "Your Score: " + gameScore;
}
