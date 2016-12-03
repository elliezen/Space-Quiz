'use strict';

class Starfield {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.speed = 60;
        this.density = 200;
        this.stars = [];

        for (let i = 0; i < this.density; i++) {
            this.stars[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1);
        }
    }

    update(delta) {
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

function Star(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
}
