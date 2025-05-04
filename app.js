const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModel = document.querySelector(".game-model");
const playAgainbtn = document.querySelector(".play-again");


import { wordList } from './word-list.js';

let currentWord,correctLetters, wrongGuessCount;
const maxGuesses = 6;


const resetGame = () =>{
    // Reseting the Game variables and UI elemnets
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML= currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModel.classList.remove("show");
}

const  getRandomword = () =>{

    let foundRandom = false;
    while(!foundRandom) {
        const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
        currentWord = word;
        if(!usedWords.includes(currentWord)) {
            usedWords.push(currentWord);
            document.querySelector(".hint-text b").innerText = hint;
            resetGame();
            foundRandom = true;
        }
    }
    if(usedWords.length == wordList.length) {
        usedWords = [];
    }
    console.log(usedWords);

};

let usedWords = [];


const gameOver = (isVictory) =>{
    setTimeout(() => {
        const modelText = isVictory ? `You found the word: ` : `the correct word was:`;
        gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats! 🎉' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");

    }, 300);
}


const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                const letterEl = wordDisplay.querySelectorAll("li")[index];
                letterEl.innerText = letter;
                letterEl.classList.add("guessed");

                
                button.classList.add("correct");
                setTimeout(() => {
                    button.classList.remove("correct");
                }, 500);
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;

        
        button.classList.add("wrong");
        setTimeout(() => {
            button.classList.remove("wrong");
        }, 500);
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};


//  creating keyboard btns and adding eventlistener
for(let i=97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomword();
playAgainbtn.addEventListener("click", getRandomword);
