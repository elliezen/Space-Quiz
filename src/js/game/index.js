import {
  getElement,
  getElements,
  addClickEvent
} from '../utils';
import data from './data';
import * as starfield from './starfield';
import * as player from './player';
import * as quiz from './quiz';
import * as progress from './progress';

const [
  gameEl,
  canvas
] = getElements([
  '.game-level',
  '.canvas-block__canvas'
]);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let loop;

export default function initGame(assets) {
  const canvasSize = {
    width: canvas.width,
    height: canvas.height
  };

  starfield.init(canvasSize);
  player.init({ canvasSize, assets });
  quiz.init({ quizData: data, canvasSize });
  progress.init();
}

function startGame() {
  loop = requestAnimationFrame(animate);
}

function stopGame() {
  progress.showModalScore();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(loop);
}

function update() {
  starfield.update();
  player.update();
  progress.update();

  if (quiz.handleAnswer) progress.setProgress(quiz.isCorrect);
  if (quiz.stopGame || progress.stopGame) stopGame();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  starfield.render(ctx);
  player.render(ctx);
}

function animate() {
  update();
  render();
  loop = requestAnimationFrame(animate);
}

addClickEvent('.btn-play', () => {
  gameEl.scrollIntoView(false);

  // count starting
  const timeEl = getElement('.game-level__start-count');
  timeEl.style.display = 'block';
  let timer = 3;
  let timerId = setTimeout(function countdown() {
    if (timer === 0) {
      clearTimeout(timerId);
      timeEl.style.display = 'none';
      timeEl.innerHTML = '';
      startGame();
    } else {
      timeEl.innerHTML = --timer;
      timerId = setTimeout(countdown, 1000);
    }
  }, 1000);
});
