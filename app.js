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

    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
   

};


const gameOver = (isVictory) =>{
    setTimeout(() => {
        const modelText = isVictory ? `You found the word: ` : `the correct word was:`;
        gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats! 🎉' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");

    }, 300);
}


const initGame = (button, clickedLetter) =>{
    // console.log(button, clickedLetter);
    if (currentWord.includes(clickedLetter)){
        // console.log(clickedLetter, "is exist on the word");
        [...currentWord].forEach((letter, index) =>{ // showing all correct letters on the word display
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        // console.log(clickedLetter, "is not exist on the word")
        // if clicked letter does not exist then update the wrongGuessCount and hangman image 
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

//  creating keyboard btns and adding eventlistener
for(let i=97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomword();
playAgainbtn.addEventListener("click", getRandomword);