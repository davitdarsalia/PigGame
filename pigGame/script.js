"use strict";

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Setting Default Scores , Starting Conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// Switch Player Function

// New Game Initialization

const init = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0]; // Both side final scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.remove("hidden");
  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.remove("player-active");
  player1El.classList.remove("player-active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // switch to next player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Code above means , that if the player's id ends with 0 switch to 1 , or if id = 1  , switch it to 0 . By These , we can control player side.

  player0El.classList.toggle(".player--active");
  player1El.classList.toggle(".player--active");
  // Toggle Property adds class active and removes it's own class
};

// Random Dice Number
btnRoll.addEventListener("click", () => {
  if (playing) {
    // 1. Generating Random Dice Roll Number

    let dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice

    diceEl.classList.remove("hidden");
    //   We've used attribute source , and with template string we can tell JS Engine which image to insert . F.e : In dice random number equals to 4 , src attribute will be dice--4
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: and if true,
    if (dice !== 1) {
      // Add Dice to the current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  } else {
  }
});

// Hold Button

btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. Add current Score to active Player's score
    scores[activePlayer] += currentScore;
    // As same As below
    // scores[1]= scores[1] + currentScore
    // scores[0]= scores[0] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if score is >= 100 - Finish Game , if not , switch to the next player

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player-active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
