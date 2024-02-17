import Rectangle from "./rectangle";
import Circle from "./circle";
import Renderer from "./renderer";

const canvas = document.getElementById("cnvs");

const gameState = {
  circles: [
    new Circle(20, 100, 15, 1, 0, "blue"),
    new Circle(520, 100, 15, -1, 0, "red"),
    new Circle(270, 350, 15, 0, -1, "yellow")
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
  gameState.circles.forEach((circle, i) => {
    circle.updatePosition()

    if (bounceOffWalls(circle)) {
      return
    } 

    for (let j = 0; j < gameState.circles.length; j++) {
      other = gameState.circles[j]
      if (i == j) continue

      if (other.intersectsWithCircle(circle)) {
        circle.vx *= -1
        circle.vy *= -1
        break
      }
    }
  })
}

function bounceOffWalls(collider) {
  if (collider.intersectsWithAxis("x", canvas.width)) {
    collider.vx *= -1
    return true
  }

  if (collider.intersectsWithAxis("y", canvas.height)) {
    collider.vy *= -1
    return true
  }
  
  return false
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
