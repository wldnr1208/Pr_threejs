const canvas = document.querySelector("canvas");

console.log(canvas);

//그림그릴 도구
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

//가로 세로가 띄어진 위치에 50 50 네모가 그려진다.
// ctx.fillRect(10, 10, 50, 50);

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
  }
  update() {
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    //1.시작하는 x축의 위치, 2.y축의 위치 ,3.반지름의 길이,
    //4.시작하는 각도, 5.끝나는 각도, 6.시계방향(default=false)
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const vy = randomNumBetween(1, 5);
  const radius = randomNumBetween(50, 100);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

console.log(particles);

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.vy = randomNumBetween(1, 5);
      particle.radius = randomNumBetween(50, 100);
    }
  });
  then = now - (delta % interval);
}

animate();
