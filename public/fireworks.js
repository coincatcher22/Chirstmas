/* global canvas ctx animation addPause loop paintLine generateRandomNumber colorIndex:writable colorCodes addCustomColor generateRandomColor resizeHandler backgroundCanvas */
let random = true;

const firework = {
  lineWidth: 3,
  highestAlphaDecrease: 0.02,
  highestLength: 20,
  highestRadius: 100,
  highestSpeed: 3,
  lowestAlphaDecrease: 0.01,
  lowestLength: 10,
  lowestRadius: 50,
  lowestSpeed: 2,
  speed: 2.5,
  speedThreshold: 0.1
};

const rocket = {
  colorDefault: [0, 0, 0],
  lineCap: 'round',
  lineWidth: 4,
  shadowBlur: 20,
  highestLength: 30,
  highestSpeed: 10,
  lowestLength: 20,
  lowestSpeed: 6,
  probability: 0.05,
  speed: 8,
  speedThreshold: 0.5
};

const fireworks = [];
const rockets = [];

resizeHandler();
document.querySelectorAll('.dropdown-item').forEach(e => {
  e.addEventListener('click', function () {
    document.getElementById('change-color-text').innerText = this.innerText;
    colorIndex = +this.dataset.bsValue;
    if (colorIndex === colorCodes.length) {
      rocket.colorDefault = generateRandomColor();
    }
  });
});
addCustomColor();
addPause();
document.addEventListener('mousedown', mouseDownHandler);
window.addEventListener('resize', resizeHandler);

loop(function (frames) {
  ctx.drawImage(backgroundCanvas, 0, 0);
  ctx.lineCap = rocket.lineCap;
  ctx.lineWidth = firework.lineWidth;
  for (const f of fireworks) {
    const color = `rgba(${f.color[0]}, ${f.color[1]}, ${f.color[2]}, `;
    for (const m of f.moving) {
      paintLine(m.x, m.y, m.x + m.speedX / firework.speed * m.length, m.y + m.speedY / firework.speed * m.length, `${color}${m.alpha})`);
    }
    for (const m of f.fading) {
      paintLine(m.x, m.y, m.x + m.speedX / firework.speed * m.length, m.y + m.speedY / firework.speed * m.length, `${color}${m.alpha})`);
    }
  }
  ctx.lineWidth = rocket.lineWidth;
  ctx.save();
  ctx.shadowBlur = rocket.shadowBlur;
  for (const r of rockets) {
    ctx.shadowColor = r.color;
    paintLine(r.x, r.y, r.x + r.speedX / rocket.speed * r.length, r.y + r.speedY / rocket.speed * r.length, r.color);
  }
  ctx.restore();
  if (random && Math.random() < rocket.probability) {
    createRocket(Math.random() * canvas.width, Math.random() * canvas.height);
  }
  removeFireworks(frames);
  removeRockets(frames);
});

function removeFireworks (frames) {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    for (let j = fireworks[i].moving.length - 1; j >= 0; j--) {
      const f = fireworks[i].moving[j];
      if (Math.abs(f.speedX) < firework.speedThreshold && Math.abs(f.speedY) < firework.speedThreshold) {
        fireworks[i].moving.splice(j, 1);
        fireworks[i].fading.push(f);
      } else {
        f.x += f.speedX * frames;
        f.y += f.speedY * frames;
        if (Math.sign(f.speedX) === Math.sign(f.speedX - f.speedDecreaseX * frames)) {
          f.speedX -= f.speedDecreaseX * frames;
        } else {
          f.speedX = 0;
        }
        if (Math.sign(f.speedY) === Math.sign(f.speedY - f.speedDecreaseY * frames)) {
          f.speedY -= f.speedDecreaseY * frames;
        } else {
          f.speedY = 0;
        }
      }
    }
    if (fireworks[i].moving.length === 0) {
      for (let j = fireworks[i].fading.length - 1; j >= 0; j--) {
        const f = fireworks[i].fading[j];
        if (f.alpha > f.alphaDecrease * frames) {
          f.alpha -= f.alphaDecrease * frames;
        } else {
          fireworks[i].fading.splice(j, 1);
        }
      }
      if (fireworks[i].fading.length === 0) {
        fireworks.splice(i, 1);
      }
    }
  }
}

function removeRockets (frames) {
  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i];
    if (Math.abs(r.speedX) < rocket.speedThreshold && Math.abs(r.speedY) < rocket.speedThreshold) {
      rockets.splice(i, 1);
      createFirework(r.x, r.y, r.colorFirework);
    } else {
      r.x += r.speedX * frames;
      r.y += r.speedY * frames;
      r.speedX -= r.speedDecreaseX * frames;
      r.speedY -= r.speedDecreaseY * frames;
    }
  }
}

function createFirework (x, y, color) {
  const moving = [];
  const R = generateRandomNumber(firework.lowestRadius, firework.highestRadius);
  for (let i = 0; i < R * 2; i++) {
    const r = R * Math.sqrt(Math.random());
    const theta = 2 * Math.PI * Math.random();
    const distX = r * Math.cos(theta);
    const distY = r * Math.sin(theta);
    const norm = Math.sqrt(distX ** 2 + distY ** 2);
    const speed = generateRandomNumber(firework.lowestSpeed, firework.highestSpeed);
    const speedX = distX / norm * speed;
    const speedY = distY / norm * speed;
    moving.push({
      x,
      y,
      alpha: 1,
      alphaDecrease: generateRandomNumber(firework.lowestAlphaDecrease, firework.highestAlphaDecrease),
      length: generateRandomNumber(firework.lowestLength, firework.highestLength),
      speedX,
      speedY,
      speedDecreaseX: speedX ** 2 / (2 * distX),
      speedDecreaseY: speedY ** 2 / (2 * distY)
    });
  }
  fireworks.push({
    color,
    moving,
    fading: []
  });
}

function createRocket (x, y) {
  const distX = x - canvas.width / 2;
  const distY = y - canvas.height;
  const norm = Math.sqrt(distX ** 2 + distY ** 2);
  const speed = generateRandomNumber(rocket.lowestSpeed, rocket.highestSpeed);
  const speedX = distX / norm * speed;
  const speedY = distY / norm * speed;
  let color;
  if (colorIndex === colorCodes.length + 1) {
    color = generateRandomColor();
  } else if (colorIndex === colorCodes.length) {
    color = rocket.colorDefault;
  } else {
    color = colorCodes[colorIndex];
  }
  rockets.push({
    x: canvas.width / 2,
    y: canvas.height,
    color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
    colorFirework: color,
    length: generateRandomNumber(rocket.lowestLength, rocket.highestLength),
    speedX,
    speedY,
    speedDecreaseX: speedX ** 2 / (2 * distX),
    speedDecreaseY: speedY ** 2 / (2 * distY)
  });
}

window.changeRandom = function () {
  random = !random;
  if (random) {
    document.getElementById('change-random').innerHTML = 'On';
  } else {
    document.getElementById('change-random').innerHTML = 'Off';
  }
};

function mouseDownHandler (e) {
  if (animation !== undefined) {
    createRocket(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  }
}
