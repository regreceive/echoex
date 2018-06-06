let cxt;

// 画布长宽
const width = 800;
const height = 800;
// 画布中心点坐标
const center = { left: width / 2, top: height / 2 };
// 轨道半径
const innerOrbit = 250;
const outerOrbit = 330;
// 速度
const speed = 5;

let gradient;

function rotate(deg) {
  cxt.rotate(deg * Math.PI / 180);
}

function word(x, y, text, color = '#333') {
  color = color || '#333';
  cxt.fillStyle = color;
  cxt.font = '16px Arial';
  const offsetX = cxt.measureText(text).width / 2;
  cxt.fillText(text, x - offsetX, y + 7);
}

let time = 0;
function Planet(angle, pos, speed, label, dash) {
  this.angle = angle;
  this.pos = pos;
  this.speed = speed;
  this.label = label;
  this.dash = dash || false;
}

Planet.prototype = {
  draw() {
    let orbit, radius;
    if (this.pos === 'inner') {
      orbit = innerOrbit;
      radius = 40;
    } else {
      orbit = outerOrbit;
      radius = 50;
    }
    cxt.save();

    const angle = this.angle + time * this.speed;
    this._circle(angle, center.left - orbit, center.top, radius);

    cxt.translate(center.left - orbit, center.top);
    rotate(-angle);
    cxt.translate(orbit - center.left, -center.top);
    word(center.left - orbit, center.top, this.label, this.dash && '#fff');

    cxt.restore();
  },

  _circle(angle, pointX, pointY, radius) {
    cxt.translate(center.left, center.top);
    rotate(angle);
    cxt.translate(-center.left, -center.top);

    cxt.strokeStyle = 'rgb(160, 160, 160)';
    cxt.fillStyle = this.dash ? gradient : '#fff';
    cxt.lineWidth = 2;

    cxt.beginPath();
    cxt.arc(pointX, pointY, radius, 0, 2 * Math.PI);
    cxt.closePath();
    cxt.fill();

    if (this.dash) {
      cxt.setLineDash([5]);
      cxt.beginPath();
      cxt.arc(pointX, pointY, radius + 10, 0, 2 * Math.PI);
      cxt.closePath();
    }

    cxt.stroke();
    // drawRect();
  },
};

const Orbit = {
  circle(r) {
    this.resetStyle();
    cxt.strokeStyle = 'rgb(160, 160, 160)';
    cxt.lineWidth = 1;
    this.draw(r);
  },

  draw(r) {
    cxt.beginPath();
    cxt.arc(center.left, center.top, r, 0, 2 * Math.PI);
    cxt.closePath();
    cxt.stroke();
  },

  resetStyle() {
    cxt.shadowBlur = 0;
  },
};

function Breath(r, intensity) {
  this.r = r;
  this.intensity = intensity;
  this.currCount = 0;
  this.direction = 1;
}

Breath.prototype = {
  draw() {
    cxt.fillStyle = '#fff';
    cxt.shadowOffsetX = 0;
    cxt.shadowOffsetY = 0;
    cxt.shadowBlur = this.currCount;
    cxt.shadowColor = 'rgba(185, 201, 254, 1)';
    Orbit.draw(this.r);

    if (this.currCount >= this.intensity) {
      this.direction = -0.3;
    } else if (this.currCount <= 0) {
      this.direction = 0.3;
    }
    this.currCount += this.direction;
    this.fill(2);
  },

  fill(num) {
    for (let i = 0; i < num; i++) {
      cxt.fill();
    }
  },
};

function centerOrbit() {
  cxt.fillStyle = gradient;
  cxt.beginPath();
  cxt.arc(center.left, center.top, 50, 0, 2 * Math.PI);
  cxt.closePath();
  cxt.fill();

  cxt.strokeStyle = 'rgb(120, 180, 255)';
  cxt.lineWidth = 2;
  cxt.moveTo(center.left - 21, center.top - 20);
  cxt.lineTo(center.left + 8, center.top - 30);
  cxt.lineTo(center.left + 26, center.top - 18);
  cxt.lineTo(center.left - 4, center.top - 8);

  cxt.lineTo(center.left - 4, center.top + 26);
  cxt.lineTo(center.left - 21, center.top + 12);
  cxt.lineTo(center.left - 21, center.top - 20);
  cxt.lineTo(center.left - 5, center.top - 8);

  cxt.moveTo(center.left - 5, center.top + 8);
  cxt.lineTo(center.left + 26, center.top - 2);
  cxt.lineTo(center.left + 10, center.top - 11);

  cxt.moveTo(center.left - 4, center.top + 26);
  cxt.lineTo(center.left + 27, center.top + 16);
  cxt.lineTo(center.left + 10, center.top + 5);

  cxt.stroke();
}

const innerBreath = new Breath(125, 40);
const outerBreath = new Breath(180, 40);

const functionality = new Planet(30, 'outer', 0.3, 'Functionality', true);
const performance = new Planet(330, 'outer', 0.3, 'Performance');
const security = new Planet(60, 'inner', 0.5, 'Security');
const stability = new Planet(180, 'inner', 0.5, 'Stability');

let pause = true;

function draw() {
  cxt.clearRect(0, 0, width, height);

  outerBreath.draw();
  innerBreath.draw();

  centerOrbit();

  Orbit.circle(innerOrbit);
  Orbit.circle(outerOrbit);

  functionality.draw();
  performance.draw();
  security.draw();
  stability.draw();

  time += 0.1 * speed;
  if (!pause) {
    requestAnimationFrame(draw);
  }
}

function start(ref) {
  console.log('start');
  if (!pause) {
    return;
  }
  cxt = ref.getContext('2d');
  // 蓝色星球渐变
  gradient = cxt.createLinearGradient(0, center.top - 50, 0, center.top + 50);
  gradient.addColorStop(0, 'rgb(2, 148, 251)');
  gradient.addColorStop(1, 'rgb(10, 106, 255)');
  pause = false;

  draw();
}

function stop() {
  console.log('stop');
  pause = true;
}

export { start, stop };
