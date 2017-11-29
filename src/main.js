import { loadImages } from './js/utils';
import initUI from './js/ui';
import initGame from './js/game';

import './style.scss';

const imagesData = [{
  name: 'raccoon',
  src: 'src/assets/img/raccoon.png'
}, {
  name: 'cookie',
  src: 'src/assets/img/cookie.png'
}];

loadImages(imagesData).then(images => {
  setTimeout(initUI, 5000);
  initGame(images);
});
