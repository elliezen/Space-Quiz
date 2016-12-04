'use strict';

class Assets {
  constructor(images, callback) {
    this.queue = images;
    this.images = [];
    this.callback = callback;
    this.groups = [];
  }

  loadImages(callback) {
    if (this.queue.length > 0) {
      if (callback === undefined) {
        callback = this.callback;
      }
      let img = new Image();
      let src = this.queue.pop();

      let name = src.slice(src.lastIndexOf('/') + 1);
      img.src = src;
      img.onload = (function() {
        this.loadImages(callback);
      }).bind(this);
      this.images[name] = img;
    } else {
      callback();
    }
  }

  getImage(img) {
    return this.images[img];
  }
}
