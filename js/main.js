'use strict';

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

(function() {
    let lastTime = 0;
    let vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0, 16 - (currTime - lastTime));
            let id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

document.addEventListener('DOMContentLoaded', starPage);

// init new assets object and call main function only after all images loading
const assets = new Assets([
  'img/raccoon.png',
  'img/cookie.png'
], main);

function starPage() {
    const start = new Start();
    // scroll page to the game menu
    start.scrollPage();
    start.setMusic();
}
// Main game function.
function main() {
    const game = new Game(assets);
    game.init();
}
