// 参数
const params = {
  fps: 30,
  layers: [
    {
      speed: 0.03,
      scale: 0.2,
      count: 100,
    },
    {
      speed: 0.05,
      scale: 0.3,
      count: 50,
    },
    {
      speed: 0.07,
      scale: 0.5,
      count: 30,
    },
  ],
  starsAngle: 145, // 星星、流星运动轨迹角度
  starBaseRadius: 2, // 星星圆半径
  meteorSpeed: {
    min: 15,
    max: 20,
  },
  meteorOpacityDelta: 0.01, // 流星透明度增加减少幅度
  trailLengthDelta: 0.01, // 流星尾巴增长幅度
  maxTrailLength: 300, // 流星尾巴最大长度
  meteorEmittingInterval: 2000, // 流星产生频率
  meteorLifeTime: 500, // 流星最亮期时间
};

// 转弧度
function toRadian(deg) {
  return deg * Math.PI / 180;
}

// 计算流星结束点
function endCoordinate(x, y, length, radian) {
  return {
    tox: x + length * Math.cos(radian),
    toy: y + length * Math.sin(radian),
  };
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

class Star {
  constructor(x, y, speed, radian) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(radian) * speed;
    this.vy = Math.sin(radian) * speed;
    this.radius = 0;
  }

  getRadian() {
    return Math.atan2(this.vy, this.vx);
  }

  setRadius(radius) {
    this.radius = radius;
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > canvasWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvasWidth;
    }

    if (this.y > canvasHeight) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = canvasHeight;
    }
  }

  draw(context) {
    context.fillStyle = 'rgb(255, 221, 157)';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fill();
  }
}

class Meteor extends Star {
  constructor(x, y, speed, radian) {
    super(x, y, speed, radian);
    this.opacity = 0;
    this.isSpawning = true;
    this.isDying = false;
    this.isDead = false;
    this.trailLength = 0;
  }

  update() {
    // 成长期
    if (this.isSpawning) {
      this.opacity += params.meteorOpacityDelta;
      if (this.opacity >= 1.0) {
        this.isSpawning = false;
        this.dying();
      }
    }

    // 衰退期
    if (this.isDying) {
      this.opacity -= params.meteorOpacityDelta;
      if (this.opacity <= 0.0) {
        this.isDying = false;
        this.isDead = true;
      }
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(context) {
    const { x, y } = this;
    this.trailLength += params.maxTrailLength * params.trailLengthDelta;
    const pos = endCoordinate(x, y, -this.trailLength, this.getRadian());

    // 画了一个十字星
    context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    const starLength = 5;
    context.beginPath();
    context.moveTo(x - 1, y + 1);

    context.lineTo(x, y + starLength);
    context.lineTo(x + 1, y + 1);

    context.lineTo(x + starLength, y);
    context.lineTo(x + 1, y - 1);

    context.lineTo(x, y + 1);
    context.lineTo(x, y - starLength);

    context.lineTo(x - 1, y - 1);
    context.lineTo(x - starLength, y);

    context.lineTo(x - 1, y + 1);
    context.lineTo(x - starLength, y);

    context.closePath();
    context.fill();

    // 流星尾巴
    context.fillStyle = `rgba(255, 221, 157, ${this.opacity})`;
    context.beginPath();
    context.moveTo(x - 1, y - 1);
    context.lineTo(pos.tox, pos.toy);
    context.lineTo(x + 1, y + 1);
    context.closePath();
    context.fill();
  }

  dying() {
    setTimeout(() => {
      this.isDying = true;
    }, params.meteorLifeTime);
  }
}

class Control {
  constructor() {
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.context = null;
    this.stars = [];
    this.meteors = [];
    this.intervalID = -1;
    this.emitIntervalID = -1;
  }

  name = 'Meteor';

  createStars() {
    this.stars.length = 0;
    for (let i = 0, len = params.layers.length; i < len; i += 1) {
      const layer = params.layers[i];

      for (let j = 0; j < layer.count; j += 1) {
        const star = new Star(
          randomRange(0, this.canvasWidth),
          randomRange(0, this.canvasHeight),
          layer.speed,
          toRadian(params.starsAngle),
        );
        star.setRadius(params.starBaseRadius * layer.scale);
        this.stars.push(star);
      }
    }
  }

  createMeteors() {
    const meteor = new Meteor(
      randomRange(0, this.canvasWidth),
      randomRange(0, this.canvasHeight),
      randomRange(params.meteorSpeed.min, params.meteorSpeed.max),
      toRadian(params.starsAngle),
    );
    this.meteors.push(meteor);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let i = 0; i < this.stars.length; i += 1) {
      const star = this.stars[i];
      star.update(this.canvasWidth, this.canvasHeight);
      star.draw(this.context);
    }

    for (let i = 0; i < this.meteors.length; i += 1) {
      const meteor = this.meteors[i];
      meteor.update(this.canvasWidth, this.canvasHeight);
      meteor.draw(this.context);
    }

    for (let i = this.meteors.length - 1; i >= 0; i -= 1) {
      if (this.meteors[i].isDead) {
        this.meteors.splice(i, 1);
      }
    }
  }

  // 发射一颗流星，新建流星实例
  emitMeteor() {
    clearTimeout(this.emitIntervalID);
    this.emitIntervalID = setTimeout(() => {
      if (!this.isStop) {
        this.createMeteors();
        this.emitMeteor();
      }
    }, params.meteorEmittingInterval);
  }

  resume() {
    clearTimeout(this.intervalID);
    this.intervalID = setTimeout(() => {
      if (!this.isStop) {
        this.draw();
        this.resume();
      }
    }, 1000 / params.fps);
  }

  updateCanvas(canvas) {
    this.canvasWidth = canvas.clientWidth;
    this.canvasHeight = canvas.clientHeight;
    this.context = canvas.getContext('2d');
  }

  init() {
    this.createStars();
  }

  resize() {
    this.init();
  }

  start() {
    this.isStop = false;
    this.resume();
    this.emitMeteor();
  }

  stop() {
    this.isStop = true;
  }
}

export default function() {
  return new Control();
}
