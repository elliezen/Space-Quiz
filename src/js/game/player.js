const position = {};
const cursor = {};
let image;
let angle = 0;
const speed = 35;

export function init({ canvasSize, assets }) {
  position.x = cursor.x = canvasSize.width / 2;
  position.y = cursor.y = canvasSize.height / 2;
  image = assets.find(asset => asset.name === 'raccoon').image;
  cursor.image = assets.find(asset => asset.name === 'cookie').image;

  document.addEventListener('mousemove', event => {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
  });
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
  ctx.fillStyle = '#c51244';
  ctx.fillRect(-5, -5, 10, 10);

  ctx.restore();

  ctx.drawImage(cursor.image, cursor.x - 10, cursor.y - 10);
}
