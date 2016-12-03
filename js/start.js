'use strict';

class Start {
    constructor() {
        this.playBtn = document.querySelector('.btn-play');
        this.backBtn = document.querySelector('.btn--back');
        this.infoBtn = document.querySelector('.btn-info');
        this.modalPlayBtn = document.querySelector('.warn__btn');

        this.playBtn.addEventListener('click', this.startLevel);
        this.backBtn.addEventListener('click', this.scrollPage);
        this.infoBtn.addEventListener('click', this.infoModal);
        this.modalPlayBtn.addEventListener('click', this.scrollPage);
    }

    scrollPage() {
        window.scrollTo(0, document.body.scrollHeight);
        document.body.style.overflow = 'hidden';
    }

    startLevel() {
        let lvl = document.querySelector('.game-level--first'),
            timeCounter = document.querySelector('.game-level__start-count'),
            timer = 2,
            timerId = setInterval(function() {
                if (timer < 0) {
                    clearInterval(timerId);
                    timeCounter.parentElement.style.display = 'none';
                    assets.loadImages();
                }
                timeCounter.innerHTML = timer;
                timer--;
            }, 700);
        window.scrollTo(0, lvl.getBoundingClientRect().top + pageYOffset);
    }

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
    }

    infoModal() {
      let info = document.querySelector('.game-intro__info');
      info.classList.add('info--open');
      document.querySelector('.info-content__btn-close').addEventListener('click', () => {
        info.classList.remove('info--open');
      })
    }

}
