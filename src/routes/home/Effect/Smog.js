import smog from './assets/smoke.png';

let isStop = true;

// 参数
const params = {
  count: 20,
  velocity: 1,
  fps: 30,
};

// 创建存储粒子的数组
const particles = [];

// 画布的尺寸
let canvasWidth = 0;
let canvasHeight = 0;
let middleX = 0;
let middleY = 0;
let context = null;

// 绘制方法
function draw() {
  // 清除绘制
  // context.fillStyle = "rgba(0, 0, 0, 0)";
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // 绘制所有粒子
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
}

function updateCanvas(canvas) {
  canvasWidth = canvas.clientWidth;
  canvasHeight = canvas.clientHeight;
  middleX = canvasWidth / 2;
  middleY = canvasHeight / 3;
  context = canvas.getContext('2d');
}

// canvas烟雾缭绕效果
function init(options = {}) {
  Object.assign(params, options);
  particles.length = 0;

  // 在所有的颗粒上设置图像
  const imageObj = new Image();
  imageObj.onload = () => {
    // 创建粒子，并设置他们的位置什么的，当然都是随机的
    for (let i = 0; i < params.count; i++) {
      const particle = new Particle(imageObj);

      // 随机位置
      particle.setPosition(
        generateRandom(0, canvasWidth),
        generateRandom(canvasHeight / 2, canvasHeight),
      );

      // 设置随机速度
      particle.setVelocity(
        generateRandom(-params.velocity, params.velocity),
        generateRandom(-params.velocity, params.velocity),
      );

      particles.push(particle);
    }
  };
  imageObj.src = smog;
}

function resize() {
  init();
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

// 粒子实例
class Particle {
  constructor(image) {
    // 设置初始位置
    this.x = 0;
    this.y = 0;

    // 纵横速度
    this.vx = 0;
    this.vy = 0;

    // 圆角大小
    this.radius = 2;
    this.image = image;
    this.alpha = 1;
  }

  imgWidth = 256;

  imgHeight = 256;

  // 绘制粒子的具体方法
  draw() {
    context.globalAlpha = this.alpha;
    // 烟雾缭绕就看这里了
    // 这是宽度，是动态的
    const fillWidth = canvasWidth / 2;
    // 左上角高度接近宽度，右下角高度接近0
    const fillHeight =
      fillWidth - fillWidth * (this.x / canvasWidth * this.y / canvasHeight);

    context.drawImage(
      this.image,
      0,
      0,
      this.imgWidth,
      this.imgHeight,
      this.x,
      this.y,
      fillWidth,
      fillHeight,
    );
  }

  // 刷新粒子
  update() {
    // 改变粒子的
    this.x += this.vx;
    this.y += this.vy;

    // 水平边缘反弹
    if (this.x >= canvasWidth) {
      this.vx = -this.vx;
      this.x = canvasWidth;
    } else if (this.x <= -200) {
      // 检测是否到了左边缘
      this.vx = -this.vx;
      this.x = -200;
    }

    // 垂直边缘反弹
    if (this.y >= canvasHeight - 300) {
      this.vy = -this.vy;
      this.y = canvasHeight - 300;
    } else if (this.y <= middleY) {
      // 是否上边缘
      this.vy = -this.vy;
      this.y = middleY;
    }

    // 越靠近边缘，透明度越低
    // 纵向透明度变化要比横向的明显
    this.alpha =
      (1 - Math.abs(canvasWidth * 0.5 - this.x) / canvasWidth) *
      (0.7 - Math.abs(canvasHeight * 0.5 - this.y) / canvasHeight);
  }

  // 设置粒子位置方法
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  // 设置速度方法
  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }
}

// 生成一个min,max大小之间的随机数
function generateRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export default {
  name: 'smog',
  updateCanvas,
  init,
  start,
  stop,
  resize,
};
