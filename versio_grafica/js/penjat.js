// Variables globales
let wordGuess = [];
let letters = "";
let attempts = 6;
let word = "";

function start() {
    word = prompt("Type a word to start playing");
    if (word == null || word.length < 1) { return; } 
    word = word.toLowerCase();
    wordGuess = [];
    attempts = 6;
    letters = "";

    for (let i = 0; i < word.length; i++) {
        wordGuess[i] = "_";
    }
    
    printWord();
    printImg();
    printLettersAttempts();
    generateLetters();    
    saveData("gamesPlayed");
}

function play(guess) {
    if (attempts == 0) { return; }
    guess = guess.toLowerCase();
    if (word.includes(guess)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] == guess) {
                wordGuess[i] = guess;
            }
        }
    } else {
        attempts--;
    }
    letters += ` ${guess}`;
    printWord();
    printImg();
    printLettersAttempts();
    disableButton(guess);
    if (checkWin(wordGuess)) { 
        winAlert(); 
        return;
    }
    if (attempts == 0) { 
        loseAlert();
        return;
    }
}

function stats() {
    let gamesPlayed = localStorage.getItem("gamesPlayed");
    let gamesWon = localStorage.getItem("gamesWon");
    let gamesLost = localStorage.getItem("gamesLost");

    let stats = window.open("", "_blank");
    stats.document.write(`<h1>Games played: ${gamesPlayed}<br>`);
    stats.document.write(`Games won: ${gamesWon} (${(gamesWon/gamesPlayed)*100}%)<br>`);
    stats.document.write(`Games lost: ${gamesLost} (${(gamesLost/gamesPlayed)*100}%)</h1><br>`);
    stats.document.write(`<button onclick="localStorage.clear()">Clear Stats</button>`);
}

function generateLetters() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let divButtons = document.getElementById("abecedari");
    divButtons.innerHTML = "";

    for (let i = 0; i < letters.length; i++) {
        divButtons.innerHTML += `<button id='${letters[i].toLowerCase()}' class="button letters" onclick="play('${letters[i]}')">${letters[i]}</button>`;
    }
}

function printWord() {
    let word = "";
    for (let i = 0; i < wordGuess.length; i++) {
        word += " "+wordGuess[i];
    }
    let divWordGuess = document.getElementById("jocPenjat");
        divWordGuess.innerHTML = `<h1>${word}</h1>`;
}

function printImg() {
    switch (attempts) {
        case 6:
            document.getElementById("imatgePenjat").src = "img/penjat_0.png";
            break;
        case 5:
            document.getElementById("imatgePenjat").src = "img/penjat_1.png";
            break;
        case 4:
            document.getElementById("imatgePenjat").src = "img/penjat_2.png";
            break;
        case 3:
            document.getElementById("imatgePenjat").src = "img/penjat_3.png";
            break;
        case 2:
            document.getElementById("imatgePenjat").src = "img/penjat_4.png";
            break;
        case 1:
            document.getElementById("imatgePenjat").src = "img/penjat_5.png";
            break;
        case 0:
            document.getElementById("imatgePenjat").src = "img/penjat_6.png";
            break;
        default:
            break;
    }        
}

function printLettersAttempts() {
    let divLetters = document.getElementById("lletresUtilitzades");
    divLetters.innerHTML = `<h1>Letters used: ${letters}</h1><br>`;
    divLetters.innerHTML += `<h1>Attempts remaining: ${attempts}</h1>`;
}

function disableButton(button_id) {
    let button = document.getElementById(button_id);
    button.disabled = true;
}
function checkWin() {
    if (!wordGuess.includes("_")) {
        return true;
    }
    return false;
}

function winAlert() {
    saveData("gamesWon");
    alert("Congratulations, you won! 😄");
}

function loseAlert() {
    saveData("gamesLost");
    alert(`You lost 😭 \nThe word was '${word}'`);
}

function saveData(stat) {
    let statValue = localStorage.getItem(stat);
    if (statValue == null || isNaN(statValue)) {
        statValue = 0;
    }
    statValue = parseInt(statValue) + 1;
    localStorage.setItem(stat, statValue);
}