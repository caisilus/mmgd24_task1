import Rectangle from "./rectangle";
import Circle from "./circle";
import Renderer from "./renderer";
import GameObject from "./game-object";
import RegularPolygon from "./regular-polygon";

const canvas = document.getElementById("cnvs");

const gameState = {
  // circles: [
  //   new Circle(20, 100, 15, 2, 0),
  //   new Circle(520, 100, 15, -2, 0),
  //   new Circle(270, 350, 15, 0, -2),
  // ].map((circleCollider) => new GameObject(circleCollider, 3)),
  circles: [],
  polygons: [
    new RegularPolygon(20, 100, 15, 6, 2, 0),
    new RegularPolygon(520, 100, 15, 3, -2, 0),
  ].map((polygonCollider) => new GameObject(polygonCollider, 3)),

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
  gameState.polygons.forEach((p) => p.move());
}

function collide(tick) {
  const objects = [...gameState.circles, ...gameState.polygons];
  objects
    .filter((c) => !c.isImmuneOnTick(tick, gameState.immuneTicks))
    .forEach((object, i) => {
      if (bounceOffWalls(object)) {
        return;
      }

      for (let j = 0; j < objects.length; j++) {
        other = objects[j];
        if (i == j) continue;

        if (object.collide(other)) {
          object.lastCollision = tick;
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
