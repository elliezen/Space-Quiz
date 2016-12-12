import Assets from './Assets';
import Game from './Game';
import UI from './UI';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.game-loader').style.display = 'none';
    window.scrollTo(0, document.body.scrollHeight);
  }, 4000);
});

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
  const data = snap.val();
  /** Initialize new game object. */
  const game = new Game({
    canvas: document.querySelector('.game-level__canvas'),
    data,
    assets
  });

  const ui = new UI({
    elem: document.body,
    callback: game.start.bind(game)
  });

  ui.startPage();
}
