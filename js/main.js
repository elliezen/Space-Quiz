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

document.addEventListener('DOMContentLoaded', start.init());

/**
 * Initialize database.
 * @enum {string}
 */
const config = {
  apiKey: 'AIzaSyCuB3I2Q3RHSgGMzU6BNhz-0UI8d5keI8Y',
  authDomain: 'space-quiz-game.firebaseapp.com',
  databaseURL: 'https://space-quiz-game.firebaseio.com',
  storageBucket: 'space-quiz-game.appspot.com',
  messagingSenderId: '944409851947'
};
firebase.initializeApp(config);

/** Reference to the database service. */
const quizObjectRef = firebase.database().ref().child('object');

/**
 * Initialize new assets object and call data
 * and main function only after all images loading.
 */
const assets = new Assets([
  'img/raccoon.png',
  'img/cookie.png'
], function() {
  quizObjectRef.once('value').then(main);
});

function main(snap) {
  /** Read an object with quiz from the database. */
  let data = snap.val();
  /** Initialize new game object. */
  const game = new Game(data, assets);
  /** Start the game. */
  game.init();
}
