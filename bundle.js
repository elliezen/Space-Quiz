/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _assets = __webpack_require__(1);

	var _assets2 = _interopRequireDefault(_assets);

	var _game = __webpack_require__(2);

	var _game2 = _interopRequireDefault(_game);

	var _ui = __webpack_require__(8);

	var _ui2 = _interopRequireDefault(_ui);

	__webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
	  setTimeout(function () {
	    document.querySelector('.game-loader').style.display = 'none';
	    window.scrollTo(0, document.body.scrollHeight);
	  }, 4000);
	});

	window.addEventListener('resize', function () {
	  window.scrollTo(0, document.body.scrollHeight);
	});

	/**
	 * Initialize database.
	 * @enum {string}
	 */
	var config = {
	  apiKey: 'AIzaSyCuB3I2Q3RHSgGMzU6BNhz-0UI8d5keI8Y',
	  authDomain: 'space-quiz-game.firebaseapp.com',
	  databaseURL: 'https://space-quiz-game.firebaseio.com',
	  storageBucket: 'space-quiz-game.appspot.com',
	  messagingSenderId: '944409851947'
	};
	firebase.initializeApp(config);

	/** Reference to the database service. */
	var quizObjectRef = firebase.database().ref().child('object');

	/**
	 * Initialize new assets object and call data
	 * and main function only after all images loading.
	 */
	var assets = new _assets2.default(['src/img/raccoon.png', 'src/img/cookie.png'], function () {
	  quizObjectRef.once('value').then(main);
	});

	function main(snap) {
	  /** Read an object with quiz from the database. */
	  var data = snap.val();
	  /** Initialize new game object. */
	  var game = new _game2.default({
	    gameLvl: document.querySelector('.game-level'),
	    gameUi: document.querySelector('.game-interface'),
	    gameModal: document.querySelector('.game-overlay'),
	    data: data,
	    assets: assets
	  });

	  var ui = new _ui2.default({
	    elem: document.body,
	    callback: game.start.bind(game)
	  });

	  ui.startPage();
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	/** Class representing assets for the game. */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Assets = function () {
	  /**
	   * @param {Object[]} images The images required for the game.
	   * @param {requestCallback} callback The callback that starts the game.
	   */
	  function Assets(images, callback) {
	    _classCallCheck(this, Assets);

	    this._queue = images;
	    this._callback = callback;
	    this.images = [];

	    this.loadImages();
	  }

	  /** Upload images recursively and executes the callback on completion. */


	  _createClass(Assets, [{
	    key: 'loadImages',
	    value: function loadImages() {
	      if (this._queue.length > 0) {
	        var img = new Image();
	        var src = this._queue.pop();

	        var name = src.slice(src.lastIndexOf('/') + 1);
	        img.src = src;
	        img.onload = function () {
	          this.loadImages();
	        }.bind(this);
	        this.images[name] = img;
	      } else {
	        this._callback();
	      }
	    }

	    /**
	     * Get the image from images array.
	     * @param {string} img Name of the image.
	     * @return {string} The img src.
	     */

	  }, {
	    key: 'getImage',
	    value: function getImage(img) {
	      return this.images[img];
	    }
	  }]);

	  return Assets;
	}();

	exports.default = Assets;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _player = __webpack_require__(3);

	var _player2 = _interopRequireDefault(_player);

	var _quiz = __webpack_require__(4);

	var _quiz2 = _interopRequireDefault(_quiz);

	var _starfield = __webpack_require__(5);

	var _starfield2 = _interopRequireDefault(_starfield);

	var _state = __webpack_require__(6);

	var _state2 = _interopRequireDefault(_state);

	var _modal = __webpack_require__(7);

	var _modal2 = _interopRequireDefault(_modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	'use strict';

	/**
	 * Class representing the main logic for the game and
	 * holding all objects and data.
	 */

	var Game = function () {
	  /**
	   * @param {HTMLCanvasElement} canvas The canvas dom element.
	   * @param {Object[]} data The data with game quiz uploaded from database.
	   * @param {Object[]} assets The images required for the game.
	   */
	  function Game(_ref) {
	    var gameLvl = _ref.gameLvl,
	        gameUi = _ref.gameUi,
	        gameModal = _ref.gameModal,
	        data = _ref.data,
	        assets = _ref.assets;

	    _classCallCheck(this, Game);

	    // assign base properties
	    this.$gameLvl = gameLvl;
	    this.$canvasBlock = this.$gameLvl.querySelector('.game-level__canvas-block');
	    this.canvas = this.$gameLvl.querySelector('.canvas-block__canvas');
	    this.ctx = this.canvas.getContext('2d');
	    this.canvas.width = this.$canvasBlock.clientWidth;
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


	  _createClass(Game, [{
	    key: 'start',
	    value: function start() {
	      this._init();
	      this._reset();
	    }
	  }, {
	    key: '_reset',
	    value: function _reset() {
	      this._time = false;
	      this._isOver = false;

	      this._now = new Date().getTime();
	      this._last = new Date().getTime() - 1;
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

	  }, {
	    key: '_init',
	    value: function _init() {
	      this._starfield = new _starfield2.default(this);
	      this._quiz = new _quiz2.default(this);
	      this._quiz.newQuest();
	      this._player = new _player2.default(this);

	      // init game interface and count score and lives
	      this.state = new _state2.default({
	        elem: this.$gameUi,
	        callback: this.gameOver.bind(this)
	      });

	      // init game over modal
	      this._modal = new _modal2.default({
	        elem: this.$gameModal
	      });

	      // create mousemovement event to have the current mouse position
	      this.canvas.addEventListener('mousemove', function (e) {
	        this._getMousePosition(e);
	      }.bind(this));

	      this._loop = requestAnimationFrame(function () {
	        this._gameloop();
	      }.bind(this));
	    }

	    /**
	     * Calculate the current mouse position inside the canvas.
	     * @param {MouseEvent} event
	     */

	  }, {
	    key: '_getMousePosition',
	    value: function _getMousePosition(event) {
	      var nx = event.clientX;
	      var ny = event.clientY;

	      this.cursor = {
	        x: nx,
	        y: ny
	      };
	    }

	    /** Show game over modal window and clear game objects. */

	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      var score = this.state.getScore();
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

	  }, {
	    key: '_gameloop',
	    value: function _gameloop() {
	      if (!this._isOver) {
	        // create new delta value
	        this._setDelta();
	        // calculate new data
	        this._update();
	        // render it to the canvas
	        this._render();
	        // call this function again
	        this.loop = requestAnimationFrame(function () {
	          this._gameloop();
	        }.bind(this));
	      }
	    }

	    /** Call all update functions needed for game. */

	  }, {
	    key: '_update',
	    value: function _update() {
	      this._starfield.update(this.delta);
	      this._quiz.update(this.delta);
	      this._player.update(this.delta);
	    }

	    /** Call all rendering functions needed for game. */

	  }, {
	    key: '_render',
	    value: function _render() {
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

	  }, {
	    key: '_setDelta',
	    value: function _setDelta() {
	      this._now = new Date().getTime();
	      this.delta = (this._now - this._then) / 1000;
	      this._then = this._now;
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/** Class representing a player. */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
	  /**
	   * @param {Object} game Game instance.
	   */
	  function Player(game) {
	    _classCallCheck(this, Player);

	    // assign game instance to local property
	    this._game = game;
	    // set starting position to canvas center
	    this._position = {
	      x: this._game.width / 2,
	      y: this._game.height / 2
	    };
	    this._speed = 35;
	    // current rotation angle
	    this._angle = 0;
	    this._raccoon = this._game.raccoon;
	  }

	  /**
	   * Update location, rotation angle and speed based on mouse position.
	   * @param {number} delta The amount of time that has passed
	   *     between rendering frames.
	   */


	  _createClass(Player, [{
	    key: 'update',
	    value: function update(delta) {
	      // avoid the current call of the function if there's no valid
	      // delta value
	      if (isNaN(delta) || delta <= 0) {
	        return;
	      }
	      // calculate the distance between mouse and raccon position
	      var distX = this._game.cursor.x - (this._position.x - this._raccoon.width / 2);
	      var distY = this._game.cursor.y - (this._position.y - this._raccoon.height / 2);
	      // calculate parameters if the mouse position is not the current
	      // player position
	      if (distX !== 0 && distY !== 0) {
	        this._angle = Math.atan2(distX, distY * -1);
	      }
	      // making raccoon move slower
	      var midX = this._position.x - this._raccoon.width / 2 - this._game.cursor.x;
	      var midY = this._position.y - this._raccoon.height / 2 - this._game.cursor.y;
	      this._position.x -= midX / this._speed;
	      this._position.y -= midY / this._speed;
	    }

	    /**
	     * Renders the raccoon onto the canvas.
	     * @param {CanvasRenderingContext2D} ctx Current game canvas context.
	     */

	  }, {
	    key: 'render',
	    value: function render(ctx) {
	      // save current context
	      ctx.save();

	      // set origin point for rotation
	      var posX = this._position.x - this._raccoon.width / 2;
	      var posY = this._position.y - this._raccoon.height / 2;
	      ctx.translate(posX, posY);

	      ctx.rotate(this._angle);
	      ctx.drawImage(this._raccoon, -(this._raccoon.width / 2), -(this._raccoon.height / 2));
	      ctx.fillStyle = '#c51244';
	      ctx.fillRect(-5, -5, 10, 10);
	      // restore old context
	      ctx.restore();
	    }
	  }]);

	  return Player;
	}();

	exports.default = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/** Class representing a quiz. */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Quiz = function () {
	  /**
	   * @param {Object} game Game instance.
	   */
	  function Quiz(game) {
	    _classCallCheck(this, Quiz);

	    // assign game instance to local property
	    this._game = game;

	    this._width = this._game.width;
	    this._height = this._game.height;
	    // basic falling text speed
	    this._speed = 60;
	    this._questCount = 0;
	    // body element font-size
	    this._fontSize = parseInt(window.getComputedStyle(document.body).fontSize);
	    // array with quiz from database
	    this._quizBox = this._game.data;
	    // shuffle quiz array
	    this._quizBox = shuffleArray(this._quizBox);
	    // current question
	    this._question = '';
	    this._qWidth = 0;
	    // current answers array
	    this._answers = [];
	    this._aWidth = 0;
	    // correct answer
	    this._correct = '';
	  }

	  /**
	   * Create new quest with questions, answers and correct answer
	   * from quiz box.
	   */


	  _createClass(Quiz, [{
	    key: 'newQuest',
	    value: function newQuest() {
	      // finish the game if there are no more questions
	      if (this._questCount >= this._quizBox.length) {
	        this._game.gameOver();
	      }
	      // clear answers field
	      this._answers = [];
	      // count the number of quiz
	      var num = this._questCount;

	      var quest = this._quizBox[num];
	      this._question = new Block(quest.question, this._width / 2, 0);

	      this._correct = quest.correct;
	      quest.answers = shuffleArray(quest.answers);

	      var aLength = quest.answers.length;

	      // devide the canvas into paths and draw answers in each of them
	      for (var i = 0; i < aLength; i++) {
	        var wordWidth = quest.answers[i].length * this._fontSize;
	        var maxX = (i + 2) * this._width / (aLength + 2) - wordWidth;
	        var minX = (i + 1) * this._width / (aLength + 2) + wordWidth;
	        var x = Math.random() * (maxX - minX) + minX;
	        this._answers[i] = new Block(quest.answers[i], x, -this._fontSize);
	      };

	      // the number of next question
	      this._questCount++;
	    }

	    /**
	     * Update location of the text.
	     * @param {number} delta The amount of time that has passed
	     *     between rendering frames.
	     */

	  }, {
	    key: 'update',
	    value: function update(delta) {
	      // avoid the current call of the function if there's no valid
	      // delta value
	      if (isNaN(delta) || delta <= 0) {
	        return;
	      }

	      if (this._question.y < this._height - this._fontSize * 3) {
	        this._question.y += Math.floor(delta * this._speed * 2);
	      } else {
	        for (var i = 0; i < this._answers.length; i++) {
	          var answer = this._answers[i];
	          answer.y += delta * this._speed;
	          this._checkAnswer(answer);
	        }
	      }
	    }

	    /**
	     * Renders the text onto the canvas.
	     * @param {CanvasRenderingContext2D} ctx Current game canvas context.
	     */

	  }, {
	    key: 'render',
	    value: function render(ctx) {
	      ctx.fillStyle = '#fff';
	      ctx.font = 'small-caps 3em Righteous';
	      this._qWidth = ctx.measureText(this._question.text).width;
	      ctx.fillText(this._question.text, this._question.x - this._qWidth / 2, this._question.y);

	      for (var i = 0; i < this._answers.length; i++) {
	        var answer = this._answers[i];
	        ctx.save();
	        ctx.fillStyle = '#fff';
	        ctx.font = 'small-caps 2em Righteous';
	        this._aWidth = ctx.measureText(answer.text).width;
	        ctx.fillText(answer.text, answer.x, Math.floor(answer.y));
	        ctx.restore();
	      };
	    }

	    /**
	     * Check answer, callback function to get progress and start new quest
	     * on completion if cursor hovers over the answer.
	     * @param {string} answer Current answer from answers array.
	     * @return {string} The img src.
	     */

	  }, {
	    key: '_checkAnswer',
	    value: function _checkAnswer(answer) {
	      if (this._game.cursor.x > answer.x && this._game.cursor.x < answer.x + this._aWidth && this._game.cursor.y > answer.y && this._game.cursor.y < answer.y + this._fontSize) {
	        var progress = answer.text === this._correct ? true : false;
	        this._game.state.getState(progress);
	        this.newQuest();
	      };

	      //	If the answers have moved from the bottom of the screen, spawn new quest.
	      if (answer.y > this._height) {
	        this.newQuest();
	      }
	    }
	  }]);

	  return Quiz;
	}();

	/**
	 * Computer-optimized version of Fisher-Yates algorithm for
	 * randomizing an array.
	 * @param {CanvasRenderingContext2D} ctx Current game canvas context.
	 */


	exports.default = Quiz;
	function shuffleArray(array) {
	  for (var i = array.length - 1; i > 0; i--) {
	    var j = Math.floor(Math.random() * (i + 1));
	    var temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	  }
	  return array;
	}

	/**
	 * Class for generating a text with x and y values.
	 */

	var Block =
	/**
	 * @param {string} text Text to be rendered onto canvas.
	 * @param {number} x The x value.
	 * @param {number} y The y value.
	 */
	function Block(text, x, y) {
	  _classCallCheck(this, Block);

	  this.text = text;
	  this.x = Math.floor(x);
	  this.y = y;
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Class representing motion background with falling stars.
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Starfield = function () {
	  /**
	   * @param {Object} game Game instance.
	   */
	  function Starfield(game) {
	    _classCallCheck(this, Starfield);

	    // assign game instance to local property
	    this._game = game;
	    this._width = this._game.width;
	    this._height = this._game.height;
	    this._speed = 70;
	    this._density = 400;

	    this._stars = [];
	    this.init();
	  }

	  _createClass(Starfield, [{
	    key: 'init',
	    value: function init() {
	      for (var i = 0; i < this._density; i++) {
	        this._stars[i] = new Star(Math.random() * this._width, -Math.random() * this._height, Math.random() * 3 + 1);
	      }
	    }

	    /**
	     * Update location of the stars.
	     * @param {number} delta The amount of time that has passed
	     *     between rendering frames.
	     */

	  }, {
	    key: 'update',
	    value: function update(delta) {
	      // avoid the current call of the function if there's no valid
	      // delta value
	      if (isNaN(delta) || delta <= 0) {
	        return;
	      }

	      for (var i = 0; i < this._density; i++) {
	        var star = this._stars[i];
	        star.y += delta * this._speed;
	        //	If the star has moved from the bottom of the screen, spawn it at the top.
	        if (star.y > this._height) {
	          this._stars[i] = new Star(Math.random() * this._width, 0, Math.random() * 3 + 1);
	        }
	      }
	    }

	    /**
	     * Renders stars onto the canvas.
	     * @param {CanvasRenderingContext2D} ctx Current game canvas context.
	     */

	  }, {
	    key: 'render',
	    value: function render(ctx) {
	      for (var i = 0; i < this._density; i++) {
	        var star = this._stars[i];
	        ctx.beginPath();
	        ctx.arc(star.x, star.y, star.size / 2, 0, 2 * Math.PI);
	        ctx.fillStyle = '#fff';
	        ctx.fill();
	        ctx.closePath();
	      }
	    }
	  }]);

	  return Starfield;
	}();

	/**
	 * Class for generating a star with x and y values
	 * and it's size.
	 */


	exports.default = Starfield;

	var Star =
	/**
	 * @param {number} x The x value.
	 * @param {number} y The y value.
	 * @param {number} size The size of a star.
	 */
	function Star(x, y, size) {
	  _classCallCheck(this, Star);

	  this.x = x;
	  this.y = y;
	  this.size = size;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	/** Class representing game interface, lives and score. */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var State = function () {
	  /**
	   * @param {Object} elem Game interface.
	   * @param {requestCallback} callback The callback for game over.
	   */
	  function State(_ref) {
	    var elem = _ref.elem,
	        callback = _ref.callback;

	    _classCallCheck(this, State);

	    this._$elem = elem;
	    this._callback = callback;

	    this.score = 0;
	    this.lives = 4;

	    this.$lives = this._$elem.querySelector('.game-interface_life');
	    this.$score = this._$elem.querySelector('.score-count');
	  }

	  /** Reset game lives and score. */


	  _createClass(State, [{
	    key: 'reset',
	    value: function reset() {
	      this.score = 0;
	      this.lives = 4;
	      this.$lives.innerHTML = 'life';
	      this.$score.innerHTML = this.score;
	    }

	    /**
	     * Get the score.
	     * @return {number} The score.
	     */

	  }, {
	    key: 'getScore',
	    value: function getScore() {
	      return this.score;
	    }

	    /**
	     * Count scores and game lives depending on the answer.
	     * @param {boolean} progress Shows correctness of the answer.
	     */

	  }, {
	    key: 'getState',
	    value: function getState(progress) {
	      if (!progress) {
	        this.lives--;
	        this.$lives.innerHTML = this.lives === 3 ? 'lif' : this.lives === 2 ? 'li' : this.lives === 1 ? 'l' : ' ';
	        if (this.lives === 0) {
	          this._callback();
	        }
	      } else {
	        this.score++;
	        this.$score.innerHTML = this.score;
	        this._scrollTop(50);
	      }
	    }
	  }, {
	    key: '_scrollTop',
	    value: function _scrollTop(distance) {
	      var topDistance = window.pageYOffset;
	      if (topDistance == 0) {
	        return;
	      }
	      for (var scroll = 0; scroll <= distance; scroll += 10) {
	        window.scrollBy(0, -10);
	      }
	    }
	  }]);

	  return State;
	}();

	exports.default = State;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/** Class representing game over modal window. */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Modal = function () {
	  /**
	   * @param {Object} elem Game overlay.
	   */
	  function Modal(_ref) {
	    var elem = _ref.elem;

	    _classCallCheck(this, Modal);

	    this._$elem = elem;

	    this._$score = this._$elem.querySelector('.warn__score').firstElementChild;
	  }

	  /** Reset modal score. */


	  _createClass(Modal, [{
	    key: 'reset',
	    value: function reset() {
	      this._$score.innerHTML = 0;
	    }

	    /** Show overlay and score. */

	  }, {
	    key: 'show',
	    value: function show(score) {
	      this._$score.innerHTML = score;
	      this._$elem.classList.add('overlay--active');
	    }
	  }]);

	  return Modal;
	}();

	exports.default = Modal;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UI = function () {
	  function UI(_ref) {
	    var elem = _ref.elem,
	        callback = _ref.callback;

	    _classCallCheck(this, UI);

	    this._$elem = elem;
	    this._callback = callback;
	  }

	  _createClass(UI, [{
	    key: 'startPage',
	    value: function startPage() {
	      this._onClick('.btn-play', this._startLevel);
	      this._onClick('.btn--back', this._scrollPage);
	      this._onClick('.btn-info', this._showInfo);
	      this._onClick('.warn__btn', this._scrollPage);

	      this._setMusic();
	    }
	  }, {
	    key: '_onClick',
	    value: function _onClick(selector, func) {
	      this._$elem.querySelector(selector).addEventListener('click', func.bind(this));
	    }
	  }, {
	    key: '_scrollPage',
	    value: function _scrollPage() {
	      window.scrollTo(0, this._$elem.scrollHeight);
	      this._$elem.querySelector('.game-overlay').classList.remove('overlay--active');
	    }
	  }, {
	    key: '_startLevel',
	    value: function _startLevel() {
	      var lvl = this._$elem.querySelector('.game-level');
	      lvl.scrollIntoView(false);

	      var timeCounter = lvl.querySelector('.game-level__start-count');
	      var timeCounterDiv = lvl.querySelector('.game-level__start');
	      timeCounter.innerHTML = 3;
	      // reset display
	      timeCounterDiv.style.display = 'block';

	      var timer = 2;
	      var timerId = setTimeout(function countdown() {
	        timeCounter.innerHTML = timer;
	        if (timer < 0) {
	          clearTimeout(timerId);
	          timeCounterDiv.style.display = 'none';
	          this._callback();
	          return;
	        }
	        timer--;
	        timerId = setTimeout(countdown.bind(this), 700);
	      }.bind(this), 700);
	    }
	  }, {
	    key: '_setMusic',
	    value: function _setMusic() {
	      var musicBtns = this._$elem.querySelectorAll('.game__btn-music');
	      var audio = this._$elem.querySelector('.game-music');

	      for (var i = 0; i < musicBtns.length; i++) {
	        audio.volume = 0.3;
	        musicBtns[i].addEventListener('click', function () {
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
	  }, {
	    key: '_showInfo',
	    value: function _showInfo() {
	      var info = this._$elem.querySelector('.game-intro__info');
	      info.classList.add('info--open');

	      document.querySelector('.info-content__btn-close').addEventListener('click', function () {
	        info.classList.remove('info--open');
	      });
	    }
	  }]);

	  return UI;
	}();

	exports.default = UI;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);