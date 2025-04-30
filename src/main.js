import './style.css'
import Game from './Game';

const newGameButton = document.querySelector('#btn-new-game');
const drawCardButton = document.querySelector('#btn-draw-card');
const stopGameButton = document.querySelector('#btn-stop');
const playerPointHtml = document.querySelector('#player-points');
const computerPointHtml = document.querySelector('#computer-point');
const playerCardsHtml = document.querySelector('#cards-player-container');
const computerCardsHtml = document.querySelector('#cards-computer-container');
const game = new Game();

const addCardPlayer = () => {
  game.addCard();

  showCardsPlayer();

  showPoint();

  if (game.playerPoints >= 21) addCardComputer();
};

const addCardComputer = () => {
  game.computerShift = true;
  drawCardButton.disabled = true;

  do {
    game.addCard();

    showCardsPlayer();

    showPoint();

    if (game.playerPoints > game.maxPoint) break;

    if (game.playerPoints == game.computerPoints) break;

  } while (game.computerPoints < game.playerPoints && game.computerPoints < game.maxPoint);

  stopGameButton.disabled = true;

  game.validateWinner();

  setTimeout(() => {
    alert(game.winnerMessage);
  }, 100);
};

const showCardsPlayer = () => {
  const imgCardElement = document.createElement('img');
  imgCardElement.src = `${game.computerShift
    ? game.computerCards[game.computerCards.length - 1]
    : game.playerCards[game.playerCards.length - 1]}.png`;

  imgCardElement.alt = 'imagen carta';
  imgCardElement.classList.add('carta');

  game.computerShift
    ? computerCardsHtml.appendChild(imgCardElement)
    : playerCardsHtml.appendChild(imgCardElement);
};

const showPoint = () => game.computerShift
  ? computerPointHtml.innerText = game.computerPoints
  : playerPointHtml.innerText = game.playerPoints;

const newGame = () => {
  game.newGame();

  drawCardButton.disabled = false;
  stopGameButton.disabled = false;

  playerPointHtml.innerText = 0;
  computerPointHtml.innerText = 0;

  computerCardsHtml.innerText = '';
  playerCardsHtml.innerText = '';
};

document.addEventListener('DOMContentLoaded', () => {
  newGameButton.addEventListener('click', newGame);
  drawCardButton.addEventListener('click', addCardPlayer);
  stopGameButton.addEventListener('click', addCardComputer);
});