'use strict';

/** Class representing assets for the game. */
export default class Assets {
  /**
   * @param {Object[]} images The images required for the game.
   * @param {requestCallback} callback The callback that starts the game.
   */
  constructor(images, callback) {
    this._queue = images;
    this._callback = callback;
    this.images = [];

    this.loadImages();
  }

  /** Upload images recursively and executes the callback on completion. */
  loadImages() {
    if (this._queue.length > 0) {
      let img = new Image();
      let src = this._queue.pop();

      let name = src.slice(src.lastIndexOf('/') + 1);
      img.src = src;
      img.onload = (function() {
        this.loadImages();
      }).bind(this);
      this.images[name] = img;
    } else {
      this._callback();
    }
  }

  /**
   * Get the image from images array.
   * @param {string} img Name of the image.
   * @return {string} The img src.
   */
  getImage(img) {
    return this.images[img];
  }
}
