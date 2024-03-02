function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + "," + green + "," + blue + " )";
}

export default class GameObject {
  constructor(collider, numLifes, vx, vy, color) {
    this.collider = collider;
    this.numLifes = numLifes;
    this.vx = vx;
    this.vy = vy;
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
    this.vx *= -1;
    this.vy *= -1;

    this.numLifes--;
    if (this.numLifes == 0) {
      this.die();
    }

    this.color = randomColor();
  }

  onCollisionWithWall(axis = "x") {
    if (axis == "x") this.vx *= -1;
    else this.vy *= -1;
  }

  move() {
    if (!this.alive) return;

    this.collider.x += this.vx;
    this.collider.y += this.vy;
  }

  die() {
    this.alive = false;
  }
}
