'use strict';

/** Class representing a quiz. */
class Quiz {
  /**
   * @param {Object} game Game instance.
   */
  constructor(game) {
    // assign game instance to local property
    this.game = game;

    this.width = this.game.width;
    this.height = this.game.height;
    // basic falling text speed
    this.speed = 60;
    this.questCount = 0;
    // body element font-size
    this.fontSize = parseInt(window.getComputedStyle(document.body).fontSize);
    // array with quiz from database
    this.quizBox = this.game.quizBox;
    // shuffle quiz array
    this.quizBox = shuffleArray(this.quizBox);
    // current question
    this.question = '';
    this.qWidth = 0;
    // current answers array
    this.answers = [];
    this.aWidth = 0;
    // correct answer
    this.correct = '';

  }

  /**
   * Create new quest with questions, answers and correct answer
   * from quiz box.
   */
  newQuest() {
    // count the number of quiz
    let num = this.questCount;
    // finish the game if there are no more questions
    if (this.questCount >= this.quizBox.length - 1) {
      this.game.gameOver();
    }

    let quest = this.quizBox[num];
    this.question = new Block(quest.question, this.width / 2, 0);

    this.correct = quest.correct;
    quest.answers = shuffleArray(quest.answers);

    let aLength = quest.answers.length;

    // devide the canvas into paths and draw answers in each of them
    for (let i = 0; i < aLength; i++) {
      let wordWidth = quest.answers[i].length * this.fontSize;
      let maxX = (i + 2) * this.width / (aLength + 2) - wordWidth;
      let minX = (i + 1) * this.width / (aLength + 2) + wordWidth;
      let x = Math.random() * (maxX - minX) + minX;
      this.answers[i] = new Block(quest.answers[i], x, -this.fontSize);
    };
    // the number of next question
    this.questCount++;
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

    if (this.question.y < (this.height - this.fontSize * 3)) {
      this.question.y += Math.floor(delta * this.speed * 2);
    } else {
      for (let i = 0; i < this.answers.length; i++) {
        let answer = this.answers[i];
        answer.y += delta * this.speed;
        this.checkAnswer(answer);
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
    this.qWidth = ctx.measureText(this.question.text).width;
    ctx.fillText(this.question.text, this.question.x - this.qWidth / 2, this.question.y);

    for (let i = 0; i < this.answers.length; i++) {
      let answer = this.answers[i];
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.font = 'small-caps 2em Righteous';
      this.aWidth = ctx.measureText(answer.text).width;
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
  checkAnswer(answer) {
    if ((this.game.cursor.x > answer.x) &&
      (this.game.cursor.x < answer.x + this.aWidth) &&
      (this.game.cursor.y > answer.y) &&
      (this.game.cursor.y < answer.y + this.fontSize)) {
      let progress = answer.text === this.correct ? true : false;
      this.game.getProgress(progress);
      this.newQuest();
    };

    //	If the answers have moved from the bottom of the screen, spawn new quest.
    if (answer.y > this.height) {
      this.newQuest();
    }
  }
}

/**
 * Computer-optimized version of Fisher-Yates algorithm for
 * randomizing (shuffling) an array.
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
