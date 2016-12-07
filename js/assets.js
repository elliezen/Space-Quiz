'use strict';

/** Class representing assets for the game. */
class Assets {
  /**
   * @param {Object[]} images The images required for the game.
   * @param {requestCallback} callback The callback that starts the game.
   */
  constructor(images, callback) {
    this.queue = images;
    this.images = [];
    this.callback = callback;
  }

  /**
   * Upload images recursively and executes the callback on completion.
   * @param {requestCallback} callback The callback that starts the game.
   */
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

  /**
   * Get the image from images array.
   * @param {string} img Name of the image.
   * @return {string} The img src.
   */
  getImage(img) {
    return this.images[img];
  }
}
