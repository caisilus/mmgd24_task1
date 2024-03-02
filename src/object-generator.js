import GameObject from "./game-object";
import RegularPolygon from "./regular-polygon";
import Circle from "./circle";
import RegularPolygon from "./regular-polygon";
import GameObject from "./game-object";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class ObjectGenerator {
  constructor(canvas_width, canvas_height) {
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
  }

  generate() {
    let collider = null;
    if (randomInt(0, 2) == 0) {
      collider = this.generateCircle();
    } else {
      collider = this.generatePolygon();
    }
    const velocity = this.generateVelocity();

    return new GameObject(collider, 3, velocity[0], velocity[1]);
  }

  generateCircle() {
    const r = randomInt(20, 40);
    const x = randomInt(r, this.canvas_width - r);
    const y = randomInt(r, this.canvas_height - r);
    return new Circle(x, y, r);
  }

  generatePolygon() {
    const r = randomInt(20, 40);
    const x = randomInt(r, this.canvas_width - r);
    const y = randomInt(r, this.canvas_height - r);
    let nVerts = 3;
    if (randomInt(0, 2) == 0) {
      nVerts = 6;
    }
    return new RegularPolygon(x, y, r, nVerts);
  }

  generateVelocity() {
    const angle = Math.random() * (2 * Math.PI);
    const r = randomInt(2, 5);
    const vx = Math.floor(Math.cos(angle) * r);
    const vy = Math.floor(Math.sin(angle) * r);
    return [vx, vy];
  }
}
