const canvas = document.querySelector("canvas");

console.log(canvas);

//그림그릴 도구
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = 300 + "px";
canvas.style.height = 300 + "px";

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

//가로 세로가 띄어진 위치에 50 50 네모가 그려진다.
// ctx.fillRect(10, 10, 50, 50);

class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
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

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

function animate() {
  window.requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particle.draw();
}

animate();
