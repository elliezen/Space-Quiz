import Player from './modules/player';
import Quiz from './modules/quiz';
import Starfield from './modules/starfield';
import State from './modules/state';
import Modal from './modules/modal';

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
    gameLvl,
    gameUi,
    gameModal,
    data,
    assets
  }) {
    // assign base properties
    this.$gameLvl = gameLvl;
    this.$canvasBlock = this.$gameLvl.querySelector('.game-level__canvas-block');
    this.canvas = this.$gameLvl.querySelector('.canvas-block__canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width  = this.$canvasBlock.clientWidth;
    this.canvas.height = this.$canvasBlock.clientHeight;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.data = data;
    this.assets = assets;

    this.raccoon = this.assets.getImage('raccoon.png');
    this.cookie = this.assets.getImage('cookie.png');

    this.$gameUi = gameUi;
    this.$gameModal = gameModal;
  }

  /** Reset properties and start the game. */
  start() {
    this._init();
    this._reset();
  }

  _reset() {
    this._time = false;
    this._isOver = false;

    this._now = (new Date()).getTime();
    this._last = (new Date()).getTime() - 1;
    this.delta = 1;
    this._loop = null;

    // the object of cursor position
    this.cursor = {
      x: this.width / 2,
      y: this.height / 2
    };

    this.state.reset();
    this._modal.reset();
  }

  /** Create main objects and initiates game loop. */
  _init() {
    this._starfield = new Starfield(this);
    this._quiz = new Quiz(this);
    this._quiz.newQuest();
    this._player = new Player(this);

    // init game interface and count score and lives
    this.state = new State({
      elem: this.$gameUi,
      callback: this.gameOver.bind(this)
    });

    // init game over modal
    this._modal = new Modal({
      elem: this.$gameModal
    });

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
    let nx = event.clientX;
    let ny = event.clientY;

    this.cursor = {
      x: nx,
      y: ny
    };
  }

  /** Show game over modal window and clear game objects. */
  gameOver() {
    let score = this.state.getScore();
    this._modal.show(score);
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
