import Rectangle from "./rectangle";
import Circle from "./circle";
import Renderer from "./renderer";
import GameObject from "./game-object";

const canvas = document.getElementById("cnvs");

const gameState = {
  circles: [
    new Circle(20, 100, 15, 2, 0),
    new Circle(520, 100, 15, -2, 0),
    new Circle(270, 350, 15, 0, -2),
  ].map((circleCollider) => new GameObject(circleCollider, 3)),

  immuneTicks: 20,
};

const renderer = new Renderer(canvas, gameState);

function queueUpdates(numTicks) {
  for (let i = 0; i < numTicks; i++) {
    gameState.lastTick = gameState.lastTick + gameState.tickLength;
    update(gameState.lastTick);
  }
}

function update(tick) {
  cleanup();
  move();
  collide(tick);
}

function cleanup() {
  gameState.circles = gameState.circles.filter((circle) => circle.alive);
}

function move() {
  gameState.circles.forEach((c) => c.move());
}

function collide(tick) {
  gameState.circles
    .filter((c) => !c.isImmuneOnTick(tick, gameState.immuneTicks))
    .forEach((circle, i) => {
      if (bounceOffWalls(circle)) {
        return;
      }

      for (let j = 0; j < gameState.circles.length; j++) {
        other = gameState.circles[j];
        if (i == j) continue;

        if (circle.collide(other)) {
          circle.lastCollision = tick;
          break;
        }
      }
    });
}

function bounceOffWalls(gameObject) {
  if (gameObject.collider.intersectsWithAxis("x", canvas.width)) {
    gameObject.onCollisionWithWall("x");
    return true;
  }

  if (gameObject.collider.intersectsWithAxis("y", canvas.height)) {
    gameObject.onCollisionWithWall("y");
    return true;
  }

  return false;
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
