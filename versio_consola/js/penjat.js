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
    play();
}

function play() {
    while (true) {
        let guess = prompt("Type a letter to guess")
        if (attempts == 0) { return; }
        guess = guess.toLowerCase();
        if (guess.length != 1) {
            console.error("Error: Please type only one letter");
            continue;
        } else if (!guess.match(/[a-z]/i)) {
            console.error("Error: Only a-z letters are allowed");
            continue;
        } else if (letters.includes(guess)) {
            console.error("Error: The letter has already been guessed");
            continue;
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
        printLettersAttempts();
        if (attempts == 0) {
            console.log("You lost 😭");
            saveData("gamesLost");
            return;
        }
    }
}

function stats() {
    let gamesPlayed = localStorage.getItem("gamesPlayed");
    let gamesWon = localStorage.getItem("gamesWon");
    let gamesLost = localStorage.getItem("gamesLost");

    console.log(`Games played: ${gamesPlayed}`);
    console.log(`Games won: ${gamesWon} (${((gamesWon/gamesPlayed)*100).toFixed(2)}%)`);
    console.log(`Games lost: ${gamesLost} (${((gamesLost/gamesPlayed)*100).toFixed(2)}%)`);
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
    console.log(word);
}

function printLettersAttempts() {
    console.log(`Used letters: ${letters}`);
    console.log(`Attempts left: ${attempts}`);
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
