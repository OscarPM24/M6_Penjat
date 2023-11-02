function startPenjat() {
    console.log("1. Start game \n2. Stats\n3. Leave");
    let option = prompt("Select Option");

    switch (option) {
        case "1":
            play();
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

function play() {
    let word = prompt("Type a word to start playing");
    let wordGuess = "";
    let letters = "";
    let attempts = 0;

    for (let i = 0; i < word.length; i++) {
        wordGuess += "_";
    }

    while (true) {
        console.log(wordGuess);
        let guess = prompt("Type a letter to guess");
        if (guess.length != 1) {
            console.error("Error: Please type only one letter");
            continue;
        } else if (!guess.match(/[a-z]/gi)) {
            console.error("Error: Only a-z letters are allowed");
            continue;
        }

        if (word.includes(guess)) {
            console.log("Correct!");
            for (let i = 0; i < word.length; i++) {
                if (word[i] == guess) {
                    console.log(word[i] + "_" + guess);
                    wordGuess = createWordGuess(wordGuess, guess, i);
                }
            }
            if (!wordGuess.includes("_")) {
                console.log("You won! ☺");
                return;
            }
        } else {
            console.log("Incorrect!");
            letters += ` ${guess} `;
        }
        attempts++;
        console.log(`Wrong letters (${attempts}/6): ${letters}`);

        if (attempts == 6) {
            console.log("You lost");
            return;
        }
    }
}

function stats() {

}

function exit() {
    console.log("Thanks for playing.");
    return;
}

function createWordGuess(wordGuess, guess, pos) {
    

    return wordGuess;
}