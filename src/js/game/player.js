const position = {};
let cursor;
let image;
let angle = 0;
const speed = 35;

export function init({ canvasCursor, assets }) {
  cursor = canvasCursor;
  position.x = cursor.x;
  position.y = cursor.y;
  image = assets.raccoon;
  cursor.image = assets.cookie;
}

export function update() {
  const distX = cursor.x - (position.x - image.width / 2);
  const distY = cursor.y - (position.y - image.height / 2);
  if (distX !== 0 || distY !== 0) {
    angle = Math.atan2(distX, distY * -1);
  }
  const midX = ((position.x - image.width / 2) - cursor.x);
  const midY = ((position.y - image.height / 2) - cursor.y);
  position.x -= (midX / speed);
  position.y -= (midY / speed);
}

export function render(ctx) {
  ctx.save();

  const posX = position.x - (image.width / 2);
  const posY = position.y - (image.height / 2);
  ctx.translate(posX, posY);
  ctx.rotate(angle);
  ctx.drawImage(image, -(image.width / 2), -(image.height / 2));
  ctx.drawImage(cursor.image, cursor.x - 10, cursor.y - 10);
  ctx.fillStyle = '#c51244';
  ctx.fillRect(-5, -5, 10, 10);

  ctx.restore();
}
