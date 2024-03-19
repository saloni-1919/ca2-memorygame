
function openPopup() {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.classList.add("popup");

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");
    
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", closePopup);

    const nicknameHeading = document.createElement("h2");
    nicknameHeading.textContent = "Enter Nickname";

    const nicknameInput = document.createElement("input");
    nicknameInput.setAttribute("type", "text");
    nicknameInput.setAttribute("id", "nicknameInput");
    nicknameInput.setAttribute("placeholder", "Enter your nickname");

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.addEventListener("click", submitNickname);

    popupContent.appendChild(closeBtn);
    popupContent.appendChild(nicknameHeading);
    popupContent.appendChild(nicknameInput);
    popupContent.appendChild(submitBtn);

    popup.appendChild(popupContent);

    document.body.appendChild(popup);

    popup.style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}
function submitNickname() {
    const nickname = document.getElementById("nicknameInput").value;
    if (nickname.trim() !== "") {
        localStorage.setItem("nickname", nickname);
        displayInstructions(); 
    } else {
        alert("Please enter a valid nickname.");
    }
}

function displayInstructions() {
    const instructionsPopup = document.createElement("div");
    instructionsPopup.classList.add("popup");
    instructionsPopup.innerHTML = `
        <div class="popup-content">
            <h2>Welcome, ${localStorage.getItem("nickname")}!</h2>
            <p>Instructions:</p>
            <ul>
                <li>Click on any card to reveal its image.</li>
                <li>Try to find matching pairs of cards.</li>
                <li>If two cards match, they will stay flipped and score of +5 would be awarded.</li>
                <li>If not, they will flip back and -1 will be awarded.</li>
                <li>If the time runs out, the game would end.</li>
                <li>Match all the pairs to win the game.</li>
            </ul>
            <button onclick="showDifficultyPopup()">Continue</button>
        </div>
    `;
    document.body.appendChild(instructionsPopup);
}

function showDifficultyPopup() {
    const difficultyPopup = document.createElement("div");
    difficultyPopup.classList.add("popup");
    difficultyPopup.innerHTML = `
        <div class="popup-content">
            <h2>Choose Difficulty Level</h2>
            <button onclick="startGame('easy')">Easy</button>
            <button onclick="startGame('medium')">Medium</button>
            <button onclick="startGame('difficult')">Difficult</button>
        </div>
    `;
    document.body.appendChild(difficultyPopup);
}

function startGame(difficulty) {
    localStorage.setItem("difficulty", difficulty);
    switch (difficulty) {
        case "easy":
            window.location.href = "easy.html";
            break;
        case "medium":
            window.location.href = "medium.html";
            break;
        case "difficult":
            window.location.href = "difficult.html";
            break;
        default:
            window.location.href = "easy.html";
    }
}
document.addEventListener("click", function() {
    const clickSound = document.getElementById("clickSound");
    clickSound.play();
});