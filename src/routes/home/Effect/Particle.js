import throttle from 'lodash/throttle';
let isStop = true;
// 画布的尺寸
let canvasWidth = 0;
let canvasHeight = 0;
let context = null;

// 参数
const params = {
  count: 400, // 星星数量
  size: 1.3, // 星星尺寸
  vx: 0.3, // 星星移动速度
  r: 1600, // 根据是设计稿确定的轨迹半径
  baseHeight: 220, // 半球露出的高度
  gravity: 2, // 母球对星星的吸引力，数值越大吸引越高
  fps: 30,
};

let dots = [];

class Dot {
  constructor(x, y, vx, vy, tox, toy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.nextox = tox;
    this.nextoy = toy;
    this.color = color;
    this.visible = true;
    this.globleDown = false;
    this.setEnd(tox, toy);
  }

  setEnd(tox, toy) {
    this.tox = tox;
    this.toy = toy;
  }

  update(time) {
    if (!this.visible) {
      return;
    }
    this.x += this.vx * time;
    this.y += this.vy * time;

    if (!this.globleDown) {
      const yc = this.toy - this.y;
      const xc = this.tox - this.x;

      this.jl = Math.sqrt(xc * xc + yc * yc);

      const za = 20;

      const ax = za * (xc / this.jl);
      const ay = za * (yc / this.jl);

      this.vx = (this.vx + ax * time) * 0.95;
      this.vy = (this.vy + ay * time) * 0.95;
    } else {
      this.vy += params.gravity * time;

      if (this.y > canvasHeight) {
        this.visible = false;
      }
    }
  }

  draw() {
    if (!this.visible) {
      return;
    }
    context.fillStyle = this.color;
    context.fillRect(
      this.x - params.size / 2,
      this.y - params.size / 2,
      params.size,
      params.size,
    );
  }
}

const throttled = throttle(num => console.log(num), 2000);
class Scene {
  constructor() {
    this.state = 'before';
    this.optimized = false;
    this.osCanvas = document.createElement('canvas');
    this.getFirstData();
  }

  getFirstData() {
    const osCtx = this.osCanvas.getContext('2d');

    this.osCanvas.width = 1000;
    this.osCanvas.height = 200;

    osCtx.textAlign = 'center';
    osCtx.textBaseline = 'middle';
    osCtx.font = '45px 微软雅黑,黑体 bold';
    osCtx.fillStyle = '#FFF';
    osCtx.fillText(
      'Public chain ecology oriented to energy economy',
      this.osCanvas.width / 2,
      this.osCanvas.height / 2,
    );
    const imageData = osCtx.getImageData(
      0,
      0,
      this.osCanvas.width,
      this.osCanvas.height,
    );

    for (let x = 0; x < imageData.width; x += 2) {
      for (let y = 0; y < imageData.height; y += 3) {
        const i = (y * imageData.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          const dot = new Dot(
            canvasWidth / 2 - 1 + 2 * Math.random(),
            canvasHeight / 2 - 1 + 2 * Math.random(),
            0,
            0,
            x + (canvasWidth / 2 - this.osCanvas.width / 2),
            y + (canvasHeight / 2 - this.osCanvas.height / 2),
            `rgba(${imageData.data[i]},${imageData.data[i + 1]},${
              imageData.data[i + 2]
            },1)`,
          );
          dot.setEnd(canvasWidth / 2, canvasHeight / 2);
          dots.push(dot);
        }
      }
    }
  }

  getLogoData() {
    const osCtx = this.osCanvas.getContext('2d');
    osCtx.clearRect(0, 0, this.osCanvas.width, this.osCanvas.height);
    this.osCanvas.width = 500;
    this.osCanvas.height = 100;

    osCtx.textAlign = 'center';
    osCtx.textBaseline = 'middle';
    osCtx.font = '65px 微软雅黑,黑体 bold';
    osCtx.fillStyle = '#E06D2F';
    osCtx.fillText('OTZ', 326, this.osCanvas.height / 2);

    osCtx.font = '40px 微软雅黑,黑体 bold';
    osCtx.fillStyle = '#405159';
    osCtx.fillText('SECOND', 180, this.osCanvas.height / 2);
    osCtx.fillText('STEP', 430, this.osCanvas.height / 2);

    return osCtx.getImageData(0, 0, this.osCanvas.width, this.osCanvas.height);
  }

  changeScene() {
    const imageData = this.getLogoData();

    let index = 0;

    dots.sort(() => Math.random() - Math.random());

    for (let x = 0; x < imageData.width; x += 2) {
      for (let y = 0; y < imageData.height; y += 3) {
        const i = (y * imageData.width + x) * 4;
        const d = dots[index];
        if (imageData.data[i + 3] > 128) {
          d.setEnd(x + (canvasWidth / 2 - 300), y + 50);
          d.color = `rgba(${imageData.data[i]},${imageData.data[i + 1]},${
            imageData.data[i + 2]
          },1)`;
          index += 1;
        }
      }
    }

    while (index < dots.length) {
      const d = dots[index];
      index += 1;
      d.globleDown = true;
      d.vx = 0;
    }
  }

  // 切换第二场景，会释放部分粒子实例
  optimize() {
    if (!this.optimized) {
      dots = dots.filter(dot => dot.visible);
      this.optimized = true;
    }
  }

  update(time) {
    let completeNum = 0;
    for (let i = 0; i < dots.length; i += 1) {
      const d = dots[i];

      d.update(time / 100);
      d.draw();

      if (d.jl < 3) completeNum += 1;
    }

    throttled(dots.length);

    if (completeNum >= dots.length * 0.9) {
      switch (this.state) {
        case 'before':
          this.state = 'first';

          for (let i = 0; i < dots.length; i++) {
            const d = dots[i];

            d.setEnd(d.nextox, d.nextoy);
          }
          break;
        case 'first':
          this.state = 'second';
          this.changeScene();
          break;
        case 'second':
          this.optimize();
          break;
        default:
          break;
      }
    }
  }
}

function updateCanvas(canvas) {
  canvasWidth = canvas.clientWidth;
  canvasHeight = canvas.clientHeight;
  context = canvas.getContext('2d');
}

let scene;
let intervalID;

function init() {
  dots.length = 0;
  scene = new Scene();
}

function resize() {

}

function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  scene.update(16);
}

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
