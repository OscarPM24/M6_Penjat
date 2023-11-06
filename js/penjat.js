function startPenjat() {
    console.log("1. Start game \n2. Stats\n3. Leave");
    let option = prompt("Select Option");

    switch (option) {
        case "1":
            start();
            break;
        case "2":
            stats();
            break;
        case "3":
            exit();
            break;
        default:
            console.error("Error: Try again");
            startPenjat();
            break;
    }
}

let wordGuess = [];
let letters = "";
let attempts = 6;
let word = "";

function start() {
    word = prompt("Type a word to start playing");
    if (word == null || word.length < 1) {
        start();
        return;
    } 
    word = word.toLowerCase();
    saveData("gamesPlayed");
    for (let i = 0; i < word.length; i++) {
        wordGuess[i] = "_";
    }
    attempts = 6;
    letters = "";

    printWord(wordGuess);
    printImg(attempts);
    generateLetters();
}

function play(guess) {
    if (attempts == 0) { return; }
    guess = guess.toLowerCase();
    if (guess.length != 1) {
        console.error("Error: Please type only one letter");
        return;
    } else if (!guess.match(/[a-z]/i)) {
        console.error("Error: Only a-z letters are allowed");
        return;
    } else if (letters.includes(guess)) {
        console.error("Error: The letter has already been guessed");
        return;
    }

    if (word.includes(guess)) {
        console.log("Correct!");
        for (let i = 0; i < word.length; i++) {
            if (word[i] == guess) {
                wordGuess[i] = guess;
            }
        }
        if (checkWin(wordGuess)) {
            printWord(wordGuess);
            console.log("You won! 😄");
            saveData("gamesWon");
            return;
        }
    } else {
        console.log("Incorrect!");
        attempts--;
    }
    letters += ` ${guess} `;
    printWord();
    printImg();
    printLetters();
    if (attempts == 0) {
        console.log("You lost 😭");
        saveData("gamesLost");
        return;
    }
}

function stats() {
    let gamesPlayed = localStorage.getItem("gamesPlayed");
    let gamesWon = localStorage.getItem("gamesWon");
    let gamesLost = localStorage.getItem("gamesLost");

    console.log(`Games played: ${gamesPlayed}`);
    console.log(`Games won: ${gamesWon} (${(gamesWon/gamesPlayed)*100}%)`);
    console.log(`Games lost: ${gamesLost} (${(gamesLost/gamesPlayed)*100}%)`);
}

function exit() {
    console.log("Thanks for playing.");
    return;
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

function printLetters() {
    let divLetters = document.getElementById("lletresUtilitzades");
        divLetters.innerHTML = `<h1>${letters}</h1>`;
}

function checkWin() {
    if (!wordGuess.includes("_")) {
        return true;
    }
    return false;
}

function saveData(stat) {
    let statValue = localStorage.getItem(stat);
    if (statValue == null || isNaN(statValue)) {
        statValue = 0;
    }
    statValue = parseInt(statValue) + 1;
    localStorage.setItem(stat, statValue);
}

function clearData() {
    localStorage.clear();
}

function generateLetters() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let divButtons = document.getElementById("abecedari");
    divButtons.innerHTML = "";

    for (let i = 0; i < letters.length; i++) {
        divButtons.innerHTML += `<button onclick="play('${letters[i]}')">${letters[i]}</button>`;
    }
}