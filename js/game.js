import Player from './Player';
import Quiz from './Quiz';
import Starfield from './Starfield';

'use strict';

/**
 * Class representing the main logic for the game and
 * holding all objects and data.
 */
export default class Game {
  /**
   * @param {HTMLCanvasElement} canvas The canvas dom element.
   * @param {Object[]} data The data with game quiz uploaded from database.
   * @param {Object[]} assets The images required for the game.
   */
  constructor({
    canvas,
    data,
    assets
  }) {
    // assign base properties
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = document.querySelector('.game-level').scrollWidth;
    this.canvas.height = document.querySelector('.game-level').clientHeight;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.data = data;
    this.assets = assets;

    this.raccoon = this.assets.getImage('raccoon.png');
    this.cookie = this.assets.getImage('cookie.png');

    this.$startBtn = document.querySelector('.btn-play');

    this.$livesDiv = document.querySelector('.game-interface_life');
    this.$scoreDiv = document.querySelector('.score-count');

    this.$modal = document.querySelector('.game-overlay');
    this.$modalScore = document.querySelector('.warn__score').firstElementChild;
    this.$modalWarnBtn = document.querySelector('.warn__btn');
  }

  /** Reset properties and start the game. */
  start() {
    // reset properties
    this._setVal();
    this._init();
  }

  _setVal() {
    this._time = false;
    this._isOver = false;

    // properties storing main game objects
    this._player = null;
    this._quiz = null;

    this._now = (new Date()).getTime();
    this._last = (new Date()).getTime() - 1;
    this.delta = 1;
    this._loop = null;

    // the object of cursor position
    this.cursor = {
      x: this.width / 2,
      y: this.height / 2
    };

    this._score = 0;
    this._lives = 4;
    this.$livesDiv.innerHTML = 'life';
    this.$scoreDiv.innerHTML = this._score;
    this.$modalScore.innerHTML = this._score;
  }

  /** Create main objects and initiates game loop. */
  _init() {
    this._starfield = new Starfield(this);
    this._quiz = new Quiz(this);
    this._quiz.newQuest();
    this._player = new Player(this);

    // create mousemovement event to have the current mouse position
    this.canvas.addEventListener('mousemove', (function(e) {
      this._getMousePosition(e);
    }).bind(this));

    this._loop = requestAnimationFrame((function() {
      this._gameloop();
    }).bind(this));
  }

  /**
   * Calculate the current mouse position inside the canvas.
   * @param {MouseEvent} event
   */
  _getMousePosition(event) {
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

  /**
   * Count scores and game lives depending on the answer.
   * @param {boolean} progress Shows correctness of the answer.
   */
  getProgress(progress) {
    if (!progress) {
      this._lives--;
      this.$livesDiv.innerHTML = (this._lives === 3) ? 'lif' :
        (this._lives === 2) ? 'li' :
        (this._lives === 1) ? 'l' : ' ';
      if (this._lives === 3) {
        this.gameOver();
      }
    } else {
      this._score++;
      this.$scoreDiv.innerHTML = this._score;
      this.$modalScore.innerHTML = this._score;
    }
  }

  /** Show game over modal window and clear game objects. */
  gameOver() {
    this.$modal.classList.add('overlay--active');
    this._isOver = true;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this._player = null;
    this._quiz = null;

    this._loop = null;
  }

  /**
   * Create new delta, calls update and render functions,
   * calls itself again on completion.
   */
  _gameloop() {
    if (!this._isOver) {
      // create new delta value
      this._setDelta();
      // calculate new data
      this._update();
      // render it to the canvas
      this._render();
      // call this function again
      this.loop = requestAnimationFrame((function() {
        this._gameloop();
      }).bind(this));
    }
  }

  /** Call all update functions needed for game. */
  _update() {
    this._starfield.update(this.delta);
    this._quiz.update(this.delta);
    this._player.update(this.delta);

  }

  /** Call all rendering functions needed for game. */
  _render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this._starfield.render(this.ctx);
    this._quiz.render(this.ctx);
    this._player.render(this.ctx);
    // render cookie at mouse position
    this.ctx.drawImage(this.cookie, this.cursor.x - 10, this.cursor.y - 10);
  }

  /**
   * Recalculate new delta value based on the current time and
   * the last time called to make precise time based animations.
   */
  _setDelta() {
    this._now = (new Date()).getTime();
    this.delta = (this._now - this._then) / 1000;
    this._then = this._now;
  }

}
