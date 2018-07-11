let isStop = true;
// 画布的尺寸
let canvasWidth = 0;
let canvasHeight = 0;
let context = null;

let lines = [];
// 参数
const params = {
  count: 1, // 星星数量
  fps: 30,
};

function random(a, b) {
  return Math.random() * (b - a) + a;
}

function newLine() {
  const y = Math.random() > 0.5 ? canvasHeight / 2 : -canvasHeight / 2;
  lines.push({
    x1: 0,
    y1: 0,
    cp1x: random(-canvasWidth / 2, canvasWidth / 2),
    cp1y: y,
    cp2x: random(canvasWidth / 2, canvasWidth + canvasWidth / 2),
    cp2y: -y,
    x2: canvasWidth,
    y2: 0,
    angle: 0,
  });
}

function updateCanvas(canvas) {
  canvasWidth = canvas.clientWidth;
  canvasHeight = canvas.clientHeight;
  context = canvas.getContext('2d');

  context.fillStyle = 'rgba(255,255,255,0.1)';
}

function init() {
  lines = [];
  for (let i = 0; i < params.count; i++) {
    newLine();
  }
}

function resize() {}

function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    line.cp1x += Math.sin((line.angle += 0.005));
    line.cp1y += Math.sin(line.angle);

    line.cp2y += Math.sin(line.angle);
    line.cp2x -= Math.sin(line.angle);

    context.save();
    context.beginPath();
    context.moveTo(line.x1, line.y1);
    context.bezierCurveTo(
      line.cp1x,
      line.cp1y,
      line.cp2x,
      line.cp2y,
      line.x2,
      line.y2,
    );

    context.closePath();
    context.fill();

    context.restore();
  }
}

let intervalID;
function start() {
  isStop = false;
  clearTimeout(intervalID);
  intervalID = setTimeout(() => {
    // 绘制
    draw();
    if (!isStop) {
      start();
    }
  }, 1000 / params.fps);
}

function stop() {
  isStop = true;
}

export default {
  name: 'particle',
  updateCanvas,
  init,
  start,
  stop,
  resize,
};
