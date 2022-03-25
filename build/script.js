"use strict";
// defeinir la variabel
// const btnRoll = document.getElementsByClassName('btn--roll'); TE DA UNA ARRAY puesto que va a toda info de la clase
const btnNewG = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll"); //la mejor solucion a la escucha de un roll
const btnHold = document.querySelector(".btn--hold"); // a la escucha de un cambio de jugador
const diceDom = document.querySelector(".dice");
// puntuacion del jugador 1 y suma de dados
const current0Dom = document.querySelector("#current--0");
const score0Dom = document.querySelector("#score--0");

const current1Dom = document.querySelector("#current--1");
const score1Dom = document.querySelector("#score--1");
//player 1 o 0

const Player0Dom = document.querySelector(".player--0");
const Player1Dom = document.querySelector(".player--1");

let currentScore = 0; //cambiamos a let
let score; //inicalizamos la variable se usa let cuando esta va a cambiar
let activePlayer; // jugador 1 o 2
//inicalizamos el juego para saber cual es el jugador activo
let playing;
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //   for (const elemDom of [score0Dom, current0Dom, score1Dom, current1Dom])
  //     elemDom.textContent = 0;

  score0Dom.textContent = 0;
  score1Dom.textContent = 0;
  current0Dom.textContent = 0;
  current1Dom.textContent = 0;
  diceDom.classList.add("hidden"); // aqui modificamos el css
  // diceDoom.getElementsByClassName.display='none'; // aqui aplicamos una css al html
  for (const PlayerDom of [Player0Dom, Player1Dom])
    PlayerDom.classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //   //activePlayer = activePlayer ? 0 : 1; // con el ternario usando coertion type   de java
  //   Player0Dom.classList.toggle('player--active');
  //   Player1Dom.classList.toggle('player--active');

  for (const PlayerDom of [Player0Dom, Player1Dom])
    PlayerDom.classList.toggle("player--active");
};

// ELEMENTOS DEL DOM

btnRoll.addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1); // genera numero aleatorios
    /* cambiar la imagen de l dado */
    diceDom.src = `dice-${dice}.png`;
    diceDom.classList.remove("hidden");

    if (dice !== 1) {
      currentScore += dice; // AGREGAMOS A dice el score currenScore =currenScore + dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; // cambiamos el valor en el currendoom con los valores  del score
    } else {
      //switch  jugador
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    //verificamos si la puntuacion es 100 o mayor si no es asi
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceDom.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNewG.addEventListener("click", function () {
  //reiniciamos
  init();
});
// btnNewG.addEventListener('click',init)
