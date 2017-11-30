export function getElement(selector) {
  return document.querySelector(selector);
}

export function getElements(selectorsArr) {
  return selectorsArr.map(selector => getElement(selector));
}

export function addClickEvent(selector, handler) {
  getElement(selector).addEventListener('click', handler);
}

function loadImage({ src, name }) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve({ name, image });
    image.onerror = err => reject(err);
  });
}

export function loadImages(imagesData) {
  return Promise.all(imagesData.map(data => loadImage(data)));
}
