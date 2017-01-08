'use strict';

export default class UI {
  constructor({
    elem,
    callback
  }) {
    this._$elem = elem;
    this._callback = callback;
  }

  startPage() {
    this._onClick('.btn-play', this._startLevel);
    this._onClick('.btn--back', this._scrollPage);
    this._onClick('.btn-info', this._showInfo);
    this._onClick('.warn__btn', this._scrollPage);

    this._setMusic();
  }

  _onClick(selector, func) {
    this._$elem.querySelector(selector).addEventListener('click',
    func.bind(this));
  }

  _scrollPage() {
    window.scrollTo(0, this._$elem.scrollHeight);
    this._$elem.querySelector('.game-overlay').classList.
    remove('overlay--active');
  }

  _startLevel() {
    let lvl = this._$elem.querySelector('.game-level');
    lvl.scrollIntoView(false);

    let timeCounter = lvl.querySelector('.game-level__start-count');
    let timeCounterDiv = lvl.querySelector('.game-level__start');
    timeCounter.innerHTML = 3;
    // reset display
    timeCounterDiv.style.display = 'block';

    let timer = 2;
    let timerId = setTimeout((function countdown() {
      timeCounter.innerHTML = timer;
      if (timer < 0) {
        clearTimeout(timerId);
        timeCounterDiv.style.display = 'none';
        this._callback();
        return;
      }
      timer--;
      timerId = setTimeout(countdown.bind(this), 700);
    }).bind(this), 700);
  }

  _setMusic() {
    let musicBtns = this._$elem.querySelectorAll('.game__btn-music');
    let audio = this._$elem.querySelector('.game-music');

    for (let i = 0; i < musicBtns.length; i++) {
      audio.volume = 0.3;
      musicBtns[i].addEventListener('click', function() {
        this.classList.toggle('btn--musicoff');
        this.classList.toggle('btn--musicon');
        if (this.classList.contains('btn--musicon')) {
          audio.pause();
        } else {
          audio.play();
        }
      });
    }
  }

  _showInfo() {
    let info = this._$elem.querySelector('.game-intro__info');
    info.classList.add('info--open');

    document.querySelector('.info-content__btn-close').addEventListener('click',
      () => {
        info.classList.remove('info--open');
      });
  }
}
