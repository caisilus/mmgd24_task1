import Rectangle from "./rectangle";
import Renderer from "./renderer";
import ObjectGenerator from "./object-generator";

const canvas = document.getElementById("cnvs");

function generateObjects(objectGenerator, n) {
  gameObjects = [];
  for (let i = 0; i < n; i++) {
    gameObjects.push(objectGenerator.generate());
  }
  return gameObjects;
}

const gameState = {
  immuneTicks: 50,
  gameObjects: [],
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
  gameState.gameObjects = gameState.gameObjects.filter(
    (object) => object.alive
  );
}

function move() {
  gameState.gameObjects.forEach((c) => c.move());
}

function collide(tick) {
  gameState.gameObjects
    // .filter((c) => !c.isImmuneOnTick(tick, gameState.immuneTicks))
    .forEach((object, i) => {
      if (bounceOffWalls(object)) {
        return;
      }

      for (let j = 0; j < gameState.gameObjects.length; j++) {
        other = gameState.gameObjects[j];
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
  const objectGenerator = new ObjectGenerator(canvas.width, canvas.height);
  gameState.gameObjects = generateObjects(objectGenerator, 20);
  console.log(gameState.gameObjects);
}

function keyDown(event) {
  console.log(event);
  if (event.key === " ") {
    stopGame(gameState.stopCycle);
  }
  if (event.key === "n") {
    console.log("here");
    queueUpdates(1);
    renderer.render();
  }
}

setup();
document.addEventListener("keydown", keyDown);
run();
