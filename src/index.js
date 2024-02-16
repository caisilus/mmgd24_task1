import Rectangle from "./rectangle";
import Circle from "./circle";
import Renderer from "./renderer";

const canvas = document.getElementById("cnvs");

const gameState = {
  rects: [
    // new Rectangle(10,10,20,20, 1, 0),
    // new Rectangle(500,10,20,20, -1, 0)
  ],
  circles: [
    new Circle(10, 100, 15, 1, 0, "blue"),
    new Circle(510, 100, 15, -1, 0, "red"),
    new Circle(260, 350, 15, 0, -1, "yellow")
  ],
};

const renderer = new Renderer(canvas, gameState)

function queueUpdates(numTicks) {
  for (let i = 0; i < numTicks; i++) {
    gameState.lastTick = gameState.lastTick + gameState.tickLength;
    update(gameState.lastTick);
  }
}

function update(tick) {
  gameState.rects.forEach((r) => {
    r.x += r.vx;
    r.y += r.vy;
  });

  for (let i = 0; i < gameState.circles.length; i++) {
    c1 = gameState.circles[i];
    for (let j = 0; j < gameState.circles.length; j++) {
      if (j == i) continue;

      c2 = gameState.circles[j];

      if (c1.intersectsWithCircle(c2)) {
        c1.vx = -c1.vx;
        c1.vy = -c1.vy;
        break;
      }
    }

    c1.x += c1.vx;
    c1.y += c1.vy;
  }
}

function run(tFrame) {
  gameState.stopCycle = window.requestAnimationFrame(run);

  const nextTick = gameState.lastTick + gameState.tickLength;
  let numTicks = 0;

  if (tFrame > nextTick) {
    const timeSinceTick = tFrame - gameState.lastTick;
    numTicks = Math.floor(timeSinceTick / gameState.tickLength);
  }

  queueUpdates(numTicks);
  renderer.render(tFrame);
  gameState.lastRender = tFrame;
}

function stopGame(handle) {
  window.cancelAnimationFrame(handle);
}

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gameState.lastTick = performance.now();
  gameState.lastRender = gameState.lastTick;
  gameState.tickLength = 15; //ms
}

setup();
run();
