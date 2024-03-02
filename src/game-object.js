function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + "," + green + "," + blue + " )";
}

export default class GameObject {
  constructor(collider, numLifes, color) {
    this.collider = collider;
    this.numLifes = numLifes;
    if (color) {
      this.color = color;
    } else {
      this.color = randomColor();
    }
    this.alive = true;
    this.lastCollision = null;
  }

  isImmuneOnTick(tick, threshold) {
    return this.lastCollision && tick - this.lastCollision < threshold;
  }

  collide(other) {
    if (!this.alive) return false;
    if (!this.collider.intersects(other.collider)) return false;

    this.onCollision(other);
    return true;
  }

  onCollision(other) {
    this.collider.vx *= -1;
    this.collider.vy *= -1;

    this.numLifes--;
    if (this.numLifes == 0) {
      this.die();
    }

    this.color = randomColor();
  }

  onCollisionWithWall(axis = "x") {
    if (axis == "x") this.collider.vx *= -1;
    else this.collider.vy *= -1;
  }

  move() {
    if (!this.alive) return;

    this.collider.x += this.collider.vx;
    this.collider.y += this.collider.vy;
  }

  die() {
    this.alive = false;
  }
}
