let height;
const density = 400;
let stars;

export function init(canvasSize) {
  height = canvasSize.height;
  stars = [];

  for (let i = 0; i < density; i++) {
    const starData = {
      x: Math.random() * canvasSize.width - canvasSize.width / 2,
      y: Math.random() * canvasSize.height - canvasSize.height / 2,
      size: Math.random() * 2 + 1
    };
    stars.push(starData);
  }
}

export function update(speed) {
  stars.forEach((star) => {
    star.y += speed;
    if (star.y > height / 2) star.y = 0;
  });
}

export function render(ctx) {
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
  });
}
