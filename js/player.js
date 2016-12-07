'use strict';

/** Class representing a player. */
class Player {
  /**
   * @param {Object} game Game instance.
   */
  constructor(game) {
    // assign game instance to local property
    this.game = game;
    // set starting position to canvas center
    this.position = {
      x: this.game.width / 2,
      y: this.game.height / 2
    };
    this.speed = 35;
    // current rotation angle
    this.angle = 0;
    this.raccoon = this.game.raccoon;
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
    let distX = this.game.cursor.x - (this.position.x - this.raccoon.width / 2);
    let distY = this.game.cursor.y - (this.position.y - this.raccoon.height / 2);
    // calculate parameters if the mouse position is not the current
    // player position
    if (distX !== 0 && distY !== 0) {
      this.angle = Math.atan2(distX, distY * -1);
    }
    // making raccoon move slower
    let midX = ((this.position.x - this.raccoon.width / 2) - this.game.cursor.x);
    let midY = ((this.position.y - this.raccoon.height / 2) - this.game.cursor.y);
    this.position.x -= (midX / this.speed);
    this.position.y -= (midY / this.speed);
  }

  /**
   * Renders the raccoon onto the canvas.
   * @param {CanvasRenderingContext2D} ctx Current game canvas context.
   */
  render(ctx) {
    // save current context
    ctx.save();

    // set origin point for rotation
    let posX = this.position.x - (this.raccoon.width / 2);
    let posY = this.position.y - (this.raccoon.height / 2);
    ctx.translate(posX, posY);

    ctx.rotate(this.angle);
    ctx.drawImage(this.raccoon, -(this.raccoon.width / 2), -(this.raccoon.height / 2));
    ctx.fillStyle = '#c51244';
    ctx.fillRect(-5, -5, 10, 10);
    // restore old context
    ctx.restore();
  }
}
