'use strict';

/** Class representing a quiz. */
export default class Quiz {
  /**
   * @param {Object} game Game instance.
   */
  constructor(game) {
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
  newQuest() {
    // finish the game if there are no more questions
    if (this._questCount >= this._quizBox.length) {
      this._game.gameOver();
    }
    // clear answers field
    this._answers = [];
    // count the number of quiz
    let num = this._questCount;

    let quest = this._quizBox[num];
    this._question = new Block(quest.question, this._width / 2, 0);

    this._correct = quest.correct;
    quest.answers = shuffleArray(quest.answers);

    let aLength = quest.answers.length;

    // devide the canvas into paths and draw answers in each of them
    for (let i = 0; i < aLength; i++) {
      let wordWidth = quest.answers[i].length * this._fontSize;
      let maxX = (i + 2) * this._width / (aLength + 2) - wordWidth;
      let minX = (i + 1) * this._width / (aLength + 2) + wordWidth;
      let x = Math.random() * (maxX - minX) + minX;
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
  update(delta) {
    // avoid the current call of the function if there's no valid
    // delta value
    if (isNaN(delta) || delta <= 0) {
      return;
    }

    if (this._question.y < (this._height - this._fontSize * 3)) {
      this._question.y += Math.floor(delta * this._speed * 2);
    } else {
      for (let i = 0; i < this._answers.length; i++) {
        let answer = this._answers[i];
        answer.y += delta * this._speed;
        this._checkAnswer(answer);
      }
    }
  }

  /**
   * Renders the text onto the canvas.
   * @param {CanvasRenderingContext2D} ctx Current game canvas context.
   */
  render(ctx) {
    ctx.fillStyle = '#fff';
    ctx.font = 'small-caps 3em Righteous';
    this._qWidth = ctx.measureText(this._question.text).width;
    ctx.fillText(this._question.text,
      this._question.x - this._qWidth / 2,
      this._question.y);

    for (let i = 0; i < this._answers.length; i++) {
      let answer = this._answers[i];
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
  _checkAnswer(answer) {
    if ((this._game.cursor.x > answer.x) &&
      (this._game.cursor.x < answer.x + this._aWidth) &&
      (this._game.cursor.y > answer.y) &&
      (this._game.cursor.y < answer.y + this._fontSize)) {
      let progress = answer.text === this._correct ? true : false;
      this._game.state.getState(progress);
      this.newQuest();
    };

    //	If the answers have moved from the bottom of the screen, spawn new quest.
    if (answer.y > this._height) {
      this.newQuest();
    }
  }
}

/**
 * Computer-optimized version of Fisher-Yates algorithm for
 * randomizing an array.
 * @param {CanvasRenderingContext2D} ctx Current game canvas context.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/**
 * Class for generating a text with x and y values.
 */
class Block {
  /**
   * @param {string} text Text to be rendered onto canvas.
   * @param {number} x The x value.
   * @param {number} y The y value.
   */
  constructor(text, x, y) {
    this.text = text;
    this.x = Math.floor(x);
    this.y = y;
  }
}
