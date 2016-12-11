'use strict';

/** Class representing a player. */
export default class Player {
  /**
   * @param {Object} game Game instance.
   */
  constructor(game) {
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
  update(delta) {
    // avoid the current call of the function if there's no valid
    // delta value
    if (isNaN(delta) || delta <= 0) {
      return;
    }
    // calculate the distance between mouse and raccon position
    let distX = this._game.cursor.x - (this._position.x - this._raccoon.width / 2);
    let distY = this._game.cursor.y - (this._position.y - this._raccoon.height / 2);
    // calculate parameters if the mouse position is not the current
    // player position
    if (distX !== 0 && distY !== 0) {
      this._angle = Math.atan2(distX, distY * -1);
    }
    // making raccoon move slower
    let midX = ((this._position.x - this._raccoon.width / 2) - this._game.cursor.x);
    let midY = ((this._position.y - this._raccoon.height / 2) - this._game.cursor.y);
    this._position.x -= (midX / this._speed);
    this._position.y -= (midY / this._speed);
  }

  /**
   * Renders the raccoon onto the canvas.
   * @param {CanvasRenderingContext2D} ctx Current game canvas context.
   */
  render(ctx) {
    // save current context
    ctx.save();

    // set origin point for rotation
    let posX = this._position.x - (this._raccoon.width / 2);
    let posY = this._position.y - (this._raccoon.height / 2);
    ctx.translate(posX, posY);

    ctx.rotate(this._angle);
    ctx.drawImage(this._raccoon, -(this._raccoon.width / 2), -(this._raccoon.height / 2));
    ctx.fillStyle = '#c51244';
    ctx.fillRect(-5, -5, 10, 10);
    // restore old context
    ctx.restore();
  }
}
