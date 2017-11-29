import { getElements } from '../utils';
let score;
let life;

const [
  lifeEl,
  scoreEl,
  modalEl,
  modalScoreEl
] = getElements([
  '.game-interface_life',
  '.score-count',
  '.game-overlay',
  '.warn__score'
]);

export function init() {
  score = 0;
  life = ['l', 'i', 'f', 'e'];
  scoreEl.innerHTML = score;
  lifeEl.innerHTML = life.join('');
}

export function update() {
  scoreEl.innerHTML = score++;
}

export function showModalScore() {
  modalScoreEl.innerHTML = score;
  modalEl.classList.add('overlay--active');
}

export let stopGame = false;

export function setProgress(isCorrect) {
  if (isCorrect) {
    scoreEl.innerHTML = score += 20;
    for (let scroll = 0; scroll <= 50; scroll += 10) {
      window.scrollBy(0, -10);
    }
  } else {
    life.pop();
    lifeEl.innerHTML = life.join('');
    if (life.length === 0) stopGame = true;
  }
}
