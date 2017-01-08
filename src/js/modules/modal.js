'use strict';

/** Class representing game over modal window. */
export default class Modal {
  /**
   * @param {Object} elem Game overlay.
   */
  constructor({
    elem
  }) {
    this._$elem = elem;

    this._$score = this._$elem.querySelector('.warn__score').firstElementChild;
  }

  /** Reset modal score. */
  reset() {
    this._$score.innerHTML = 0;
  }

  /** Show overlay and score. */
  show(score) {
    this._$score.innerHTML = score;
    this._$elem.classList.add('overlay--active');
  }
}
