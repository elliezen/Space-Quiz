'use strict';

class Player {
  constructor(game) {
    this.game = game;
    this.position = {
      x: this.game.width / 2,
      y: this.game.height / 2
    };
    this.speed = 35;
    this.angle = 0;
    this.raccoon = this.game.raccoon;
  }

  // updates speed, location, rotation angle based on mouse position
  update(delta) {
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
    this.position.x -= (((this.position.x - this.raccoon.width / 2) - this.game.cursor.x) / this.speed);
    this.position.y -= (((this.position.y - this.raccoon.height / 2) - this.game.cursor.y) / this.speed);
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.position.x - (this.raccoon.width / 2), this.position.y - (this.raccoon.height / 2));
    ctx.rotate(this.angle);

    ctx.drawImage(this.raccoon, -(this.raccoon.width / 2), -(this.raccoon.height / 2));
    ctx.fillStyle = '#c51244';
    ctx.fillRect(-5, -5, 10, 10);

    ctx.restore();
  }
}
