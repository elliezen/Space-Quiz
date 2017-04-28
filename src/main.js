import Assets from './js/assets';
import Game from './js/game';
import UI from './js/ui';

import './scss/style.scss';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.game-loader').style.display = 'none';
    window.scrollTo(0, document.body.scrollHeight);
  }, 4000);
});

window.addEventListener('resize', () => {
  window.scrollTo(0, document.body.scrollHeight);
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
  'src/img/raccoon.png',
  'src/img/cookie.png'
], function() {
  quizObjectRef.once('value').then(main);
});

function main(snap) {
  /** Read an object with quiz from the database. */
  const data = snap.val();
  /** Initialize new game object. */
  const game = new Game({
    gameLvl: document.querySelector('.game-level'),
    gameUi: document.querySelector('.game-interface'),
    gameModal: document.querySelector('.game-overlay'),
    data,
    assets
  });

  const ui = new UI({
    elem: document.body,
    callback: game.start.bind(game)
  });

  ui.startPage();
}
