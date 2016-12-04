'use strict';

let start = {
  init() {
    addClick('.btn-play', this.startLevel);
    addClick('.btn--back', this.scrollPage);
    addClick('.btn-info', this.infoModal);
    addClick('.warn__btn', this.scrollPage);

    function addClick(selector, func) {
      let elem = document.querySelector(selector);
      elem.addEventListener('click', func);
    }

    // scroll page to the game menu and play music
    this.scrollPage();
    this.setMusic();
  },

  scrollPage() {
    window.scrollTo(0, document.body.scrollHeight);
  },

  startLevel() {
    let lvl = document.querySelector('.game-level--first');
    let timeCounter = document.querySelector('.game-level__start-count');
    let timer = 2;
    let timerId = setInterval(function() {
      if (timer < 0) {
        clearInterval(timerId);
        timeCounter.parentElement.style.display = 'none';
        assets.loadImages();
      }
      timeCounter.innerHTML = timer;
      timer--;
    }, 700);
    window.scrollTo(0, lvl.getBoundingClientRect().top + pageYOffset);
    document.querySelector('.game-overlay').classList.remove('overlay--active');
  },

  setMusic() {
    let musicBtns = document.querySelectorAll('.game__btn-music');
    for (let i = 0; i < musicBtns.length; i++) {
      document.querySelector('.game-music').volume = 0.3;
      musicBtns[i].addEventListener('click', checkMusic);
    }

    function checkMusic() {
      let audio = document.querySelector('.game-music');
      this.classList.toggle('btn--musicoff');
      this.classList.toggle('btn--musicon');
      if (this.classList.contains('btn--musicon')) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  },

  infoModal() {
    let info = document.querySelector('.game-intro__info');
    info.classList.add('info--open');
    document.querySelector('.info-content__btn-close').addEventListener('click', () => {
      info.classList.remove('info--open');
    });
  }

};
