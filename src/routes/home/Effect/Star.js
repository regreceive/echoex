let isStop = true;
// 画布的尺寸
let canvasWidth = 0;
let canvasHeight = 0;
let context = null;

// 参数
const params = {
  count: 400, // 星星数量
  size: 1.5, // 星星尺寸
  vx: 0.3, // 星星移动速度
  r: 3200, // 根据是设计稿确定的轨迹半径
  baseHeight: 200, // 半球露出的高度
  gravity: 4, // 母球对星星的吸引力，数值越大吸引越高
  fps: 30,
};

const stars = [];

function updateCanvas(canvas) {
  canvasWidth = canvas.clientWidth;
  canvasHeight = canvas.clientHeight;
  context = canvas.getContext('2d');
  params.count = Math.floor(400 / 1920 * canvasWidth);
}

function init() {
  stars.length = 0;
  for (let i = 0; i < params.count; i++) {
    stars.push(new Star());
  }
}

function resize() {
  init();
}

function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  stars.forEach(star => {
    star.draw();
  });
}

let intervalID;
function start() {
  isStop = false;
  clearTimeout(intervalID);
  setTimeout(() => {
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

function getMinRandom() {
  const arr = Array.from(new Array(params.gravity), () => Math.random());

  return Math.min(...arr);
}

class Star {
  constructor() {
    // 圆的轨迹方程式为：(x-a)²+(y-b)²=r²
    // 因此，已知x, 则y = Math.sqrt(r² - (x-a)²) + b;
    // 其中，圆心是(a, b)
    // 在本例子中
    // 圆心坐标是(canvas.width/2, canvas.height - 600 + r);
    // 横坐标随机
    this.x = Math.floor(Math.random() * canvasWidth);
    // 纵坐标需要在圆弧以上
    // 越往上，越稀疏
    this.offsety = getMinRandom() * (canvasHeight - params.baseHeight);

    this.y =
      canvasHeight -
      params.baseHeight +
      params.r -
      Math.sqrt(
        params.r * params.r -
          (this.x - canvasWidth / 2) * (this.x - canvasWidth / 2),
      ) -
      this.offsety;

    this.vx = Math.random() * 0.1 + params.vx; // 水平偏移，也是移动速度

    // 星星的尺寸
    this.particleSize = params.size + (Math.random() + 0.1 / 4);

    this.alpha = 0.0;
    this.maxAlpha = 0.2 + this.y / canvasHeight * Math.random() * 0.8;
    this.alphaDirection = 1;
  }

  draw() {
    // 横坐标移动
    this.x += this.vx;
    // 根据切线方向进行偏移
    // y坐标
    this.y =
      canvasHeight -
      params.baseHeight +
      params.r -
      Math.sqrt(
        params.r * params.r -
          (this.x - canvasWidth / 2) * (this.x - canvasWidth / 2),
      ) -
      this.offsety;

    // 透明度慢慢起来
    if (this.alphaDirection === 1) {
      if (this.alpha < this.maxAlpha) {
        this.alpha += 0.005;
      } else {
        this.alphaDirection = -1;
      }
    } else if (this.alpha > 0.2) {
      this.alpha -= 0.002;
    } else {
      this.alphaDirection = 1;
    }

    if (this.x + this.particleSize * 2 >= canvasWidth) {
      // x到左侧
      this.x = 0;
    }

    // 绘制星星
    context.beginPath();
    context.fillStyle = `rgba(255, 255, 255, ${this.alpha.toString()})`;
    context.arc(this.x, this.y, this.particleSize, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }
}

export default {
  name: 'star',
  updateCanvas,
  init,
  start,
  stop,
  resize,
};
