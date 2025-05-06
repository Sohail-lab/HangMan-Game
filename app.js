const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModel = document.querySelector(".game-model");
const playAgainbtn = document.querySelector(".play-again");
const skipWordBtn = document.querySelector(".skip-word");


import { easyWords, mediumWords, hardWords } from './word-list.js';

let currentWord, correctLetters, wrongGuessCount;
let maxGuesses = 6;
let selectedDifficulty = 'easy';
let usedWords = [];
let score = 0;
let timer;
let countdown;

const timerDisplay = document.getElementById("timer");

const setMaxGuesses = (difficulty) => {
    if (difficulty === 'easy') maxGuesses = 6;
    else if (difficulty === 'medium') maxGuesses = 6;
    else if (difficulty === 'hard') maxGuesses = 6;
};

const startTimer = () => {

    let timelimit = 60; 

    if (selectedDifficulty === 'easy') {
        timelimit = 60;
    } else if (selectedDifficulty === 'medium') {
        timelimit = 120;
    } else if (selectedDifficulty === 'hard') {
        timelimit = 180;
    }

    countdown = timelimit; 
    timerDisplay.textContent = formatTime(countdown);

    clearInterval(timer); 
    timer = setInterval(() => {
        countdown--;
        timerDisplay.textContent = formatTime(countdown);

        if (countdown <= 0) {
            clearInterval(timer);
            gameOver(false);
        }
    }, 1000);
};


const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};


const updateScore = (isVictory) => {
    if(isVictory) {
        score = Number(document.getElementById('score').innerText);
        score = score+ 10;
        document.querySelector('#score').innerHTML = score;
    }
};


const resetGame = () => {

    clearInterval(timer);
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModel.classList.remove("show");

    startTimer();
};


const getRandomword = () => {
    let foundRandom = false;
    let wordListToUse;


    if (selectedDifficulty === 'easy') {
        wordListToUse = easyWords;
    } else if (selectedDifficulty === 'medium') {
        wordListToUse = mediumWords;
    } else if (selectedDifficulty === 'hard') {
        wordListToUse = hardWords;
    }


    while (!foundRandom) {
        const { word, hint } = wordListToUse[Math.floor(Math.random() * wordListToUse.length)];
        currentWord = word;
        if (!usedWords.includes(currentWord)) {
            usedWords.push(currentWord);
            document.querySelector(".hint-text b").innerText = hint;
            resetGame();
            foundRandom = true;
        }
    }
    if (usedWords.length === wordListToUse.length) {
        usedWords = [];
    }
    // console.log(usedWords);
};

const gameOver = (isVictory) => {
    clearInterval(timer);
    setTimeout(() => {
        const modelText = isVictory ? `You found the word: ` : `The correct word was:`;
        gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats! 🎉' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
        updateScore(isVictory);
    }, 700);
};


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

document.getElementById('mode').addEventListener('change', (e) => {
    selectedDifficulty = e.target.value;          
    setMaxGuesses(selectedDifficulty);             
    clearInterval(timer);
    usedWords = [];                         
    getRandomword();                               
});

playAgainbtn.addEventListener("click", () => {
    clearInterval(timer);
    getRandomword();
});
skipWordBtn.addEventListener("click", () => {
    clearInterval(timer);
    getRandomword(); 
});

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomword();
playAgainbtn.addEventListener("click", getRandomword);
