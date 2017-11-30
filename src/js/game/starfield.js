let height;
const density = 400;
let stars;

export function init(canvasSize) {
  height = canvasSize.height;
  stars = [];

  for (let i = 0; i < density; i++) {
    const starData = {
      x: Math.random() * canvasSize.width,
      y: -Math.random() * canvasSize.height,
      size: Math.random() * 2 + 1
    };
    stars.push(starData);
  }
}

export function update() {
  stars.forEach(star => {
    star.y++;
    if (star.y > height) star.y = 0;
  });
}

export function render(ctx) {
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
  });
}
