'use strict';

/**
 * Class representing motion background with falling stars.
 */
class Starfield {
  /**
   * @param {Object} game Game instance.
   */
  constructor(game) {
    // assign game instance to local property
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.speed = 60;
    this.density = 200;
    this.stars = [];
    // set the initial position of starfield background
    for (let i = 0; i < this.density; i++) {
      this.stars[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1);
    }
  }

  /**
   * Update location of the stars.
   * @param {number} delta The amount of time that has passed
   *     between rendering frames.
   */
  update(delta) {
    // avoid the current call of the function if there's no valid
    // delta value
    if (isNaN(delta) || delta <= 0) {
      return;
    }

    for (let i = 0; i < this.density; i++) {
      let star = this.stars[i];
      star.y += delta * this.speed;
      //	If the star has moved from the bottom of the screen, spawn it at the top.
      if (star.y > this.height) {
        this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1);
      }
    }
  }

  /**
   * Renders stars onto the canvas.
   * @param {CanvasRenderingContext2D} ctx Current game canvas context.
   */
  render(ctx) {
    for (let i = 0; i < this.density; i++) {
      let star = this.stars[i];
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size / 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.closePath();
    }
  }
}

/**
 * Class for generating a star with x and y values
 * and it's size.
 */
class Star {
  /**
   * @param {number} x The x value.
   * @param {number} y The y value.
   * @param {number} size The size of a star.
   */
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
}
