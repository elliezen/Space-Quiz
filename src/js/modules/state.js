'use strict';

/** Class representing game interface, lives and score. */
export default class State {
  /**
   * @param {Object} elem Game interface.
   * @param {requestCallback} callback The callback for game over.
   */
  constructor({
    elem,
    callback
  }) {
    this._$elem = elem;
    this._callback = callback;

    this.score = 0;
    this.lives = 4;

    this.$lives = this._$elem.querySelector('.game-interface_life');
    this.$score = this._$elem.querySelector('.score-count');
  }

  /** Reset game lives and score. */
  reset() {
    this.score = 0;
    this.lives = 4;
    this.$lives.innerHTML = 'life';
    this.$score.innerHTML = this.score;
  }

  /**
   * Get the score.
   * @return {number} The score.
   */
  getScore() {
    return this.score;
  }

  /**
   * Count scores and game lives depending on the answer.
   * @param {boolean} progress Shows correctness of the answer.
   */
  getState(progress) {
    if (!progress) {
      this.lives--;
      this.$lives.innerHTML = (this.lives === 3) ? 'lif' :
        (this.lives === 2) ? 'li' :
        (this.lives === 1) ? 'l' : ' ';
      if (this.lives === 0) {
        this._callback();
      }
    } else {
      this.score++;
      this.$score.innerHTML = this.score;
      this._scrollTop(50);
    }
  }

  _scrollTop(distance) {
    let topDistance = window.pageYOffset;
    if (topDistance == 0) {
      return;
    }
    for (let scroll = 0; scroll <= distance; scroll += 10) {
      window.scrollBy(0, -10);
    }
  }
}
