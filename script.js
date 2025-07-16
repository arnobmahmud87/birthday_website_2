const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

let particles = [];

function createFirework() {
  const x = random(0, canvas.width);
  const y = random(0, canvas.height / 2);
  const count = 80;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      radius: 2,
      color: `hsl(${random(0, 360)}, 100%, 60%)`,
      speed: random(1, 5),
      angle: random(0, 2 * Math.PI),
      alpha: 1
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    const vx = Math.cos(p.angle) * p.speed;
    const vy = Math.sin(p.angle) * p.speed;
    p.x += vx;
    p.y += vy;
    p.alpha -= 0.01;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}

setInterval(createFirework, 1200);
animate();
