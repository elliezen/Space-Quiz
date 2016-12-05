'use strict';

/** GAME
 * Main logic for the game.
 */

class Game {

  constructor(data, assets) {
    this.canvas = document.querySelector('.game-level__canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = document.documentElement.scrollWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.quizBox = data;
    this.assets = assets;

    this.raccoon = this.assets.getImage('raccoon.png');
    this.cookie = this.assets.getImage('cookie.png');

    this.time = false;

    this.now = (new Date()).getTime();
    this.last = (new Date()).getTime() - 1;
    this.delta = 1;
    this.loop = null;

    this.cursor = {
      x: this.width / 2,
      y: this.height / 2
    };

    this.player = null;
    this.quiz = null;

    this.score = 0;
    this.scoreDiv = document.querySelector('.score-count');
    this.modal = document.querySelector('.game-overlay');
    this.modalScore = document.querySelector('.warn__score').firstElementChild;
    this.modalWarnBtn = document.querySelector('.warn__btn');
    this.lives = 4;
    this.livesDiv = document.querySelector('.game-interface_life');
  }

  // creates main objects and initiates game loop
  init() {
    this.starfield = new Starfield(this);
    this.quiz = new Quiz(this);
    this.quiz.newQuest();
    this.player = new Player(this);
    this.canvas.addEventListener('mousemove', (function(e) {
      this.getMousePosition(e);
    }).bind(this));
    this.loop = window.requestAnimationFrame((function() {
      this.gameloop();
    }).bind(this));
  }

  // calculates the current mouse position inside the canvas
  getMousePosition(event) {
    let nx = 0;
    let ny = 0;
    if (event.pageX) {
      nx = event.pageX;
      ny = event.pageY;
    } else {
      nx = event.clientX + document.body.scrollLeft;
      ny = event.clientY + document.body.scrollTop;
    }

    nx -= this.canvas.offsetLeft;
    ny -= this.canvas.offsetTop;

    this.cursor = {
      x: nx,
      y: ny
    };
  }

  // counts scores and game lives depending on the answer
  getProgress(progress) {
    if (!progress) {
      this.lives--;
      this.livesDiv.innerHTML = (this.lives == 3) ? 'lif' :
        (this.lives == 2) ? 'li' : 'l';
      if (this.lives == 0) {
        this.gameOver();
      }
    } else {
      this.score++;
      this.scoreDiv.innerHTML = this.score;
      this.modalScore.innerHTML = this.score;
    }
  }

  // announce end of game and resets properties
  gameOver() {

    this.modal.classList.add('overlay--active');
    this.modalWarnBtn.addEventListener('click', (function() {
      this.init();
    }).bind(this));

    this.starfield = new Starfield(this);
    this.time = false;
    this.now = (new Date()).getTime();
    this.last = (new Date()).getTime() - 1;
    this.delta = 1;
    this.loop = null;
    this.cursor = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.quiz = null;
    this.score = 0;
    this.lives = 4;
    this.livesDiv.innerHTML = 'life';
  }

  // creates new delta and calls update / render function
  gameloop() {
    // create new delta value
    this.setDelta();
    // calculate new data
    this.update();
    // render it to the canvas
    this.render();
    // call this function again
    this.loop = window.requestAnimationFrame((function() {
      this.gameloop();
    }).bind(this));
  }

  // calls all update functions needed for game
  update() {
    this.starfield.update(this.delta);
    this.quiz.update(this.delta);
    this.player.update(this.delta);
  }

  // calls all rendering functions needed for game
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.starfield.render(this.ctx);
    this.quiz.render(this.ctx);
    this.player.render(this.ctx);
    // render cookie at mouse position
    this.ctx.drawImage(this.cookie, this.cursor.x - 10, this.cursor.y - 10);
  }

  // recalculation of delta
  setDelta() {
    this.now = (new Date()).getTime();
    this.delta = (this.now - this.then) / 1000;
    this.then = this.now;
  }

}
