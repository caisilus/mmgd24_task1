export default class Circle {
  constructor(x, y, r, vx, vy, color = "black") {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
  }

  get center() {
    return { x: this.x, y: this.y };
  }

  get radius() {
    return this.r;
  }

  contains(point) {
    return (
      Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) <=
      Math.pow(this.r, 2)
    );
  }

  intersectsWithCircle(circle) {
    return (
      Math.pow(this.r + circle.r, 2) >=
      Math.pow(this.x - circle.x, 2) + Math.pow(this.y - circle.y, 2)
    );
  }
}