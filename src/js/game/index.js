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
const ctx = canvas.getContext('2d');
const cursor = {
  x: canvas.width / 2,
  y: canvas.height / 2
};
let loop;

export default function initGame(assets) {
  const canvasSize = {
    canvasWidth: canvas.width,
    canvasHeight: canvas.height
  };

  starfield.init(canvasSize);
  player.init({ canvasCursor: cursor, assets });
  quiz.init({ quizData: data, canvasSize });
  progress.init();

  canvas.addEventListener('mousemove', event => {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
  });
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
  let timer = 3;
  let timerId = setTimeout(function countdown() {
    if (timer < 0) {
      clearTimeout(timerId);
      startGame();
    } else {
      timeEl.innerHTML = timer--;
      timerId = setTimeout(countdown, 1000);
    }
  }, 1000);
});
