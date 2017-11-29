import { getElement, addClickEvent } from './utils';

function scrollPageBottom() {
  window.scrollTo(0, document.body.scrollHeight);
  getElement('.game-overlay').classList.remove('overlay--active');
}

function toggleMusic(event) {
  const el = event.target;
  el.classList.toggle('btn--musicoff');
  el.classList.toggle('btn--musicon');
  el.classList.contains('btn--musicon')
    ? el.pause()
    : el.play();
}

export default function initUI() {
  getElement('.game-loader').style.display = 'none';
  window.scrollTo(0, document.body.scrollHeight);

  addClickEvent('.btn--back', scrollPageBottom);
  addClickEvent('.warn__btn', scrollPageBottom);
  addClickEvent('.btn-info', event => {
    event.target.classList.toggle('info--open');
  });
  addClickEvent('.game__btn-music', toggleMusic);
  getElement('.game-music').volume = 0.3;

  window.addEventListener('resize', () => {
    window.scrollTo(0, document.body.scrollHeight);
  });
}
