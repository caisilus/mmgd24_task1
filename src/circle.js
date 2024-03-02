import { solveSquareEquation } from "./vector_utils";

export default class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
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

  intersects(collider) {
    if (collider instanceof Circle) return this.intersectsWithCircle(collider);

    return this.intersectsWithPolygon(collider);
  }

  intersectsWithCircle(circle) {
    return (
      Math.pow(this.r + circle.r, 2) >=
      Math.pow(this.x - circle.x, 2) + Math.pow(this.y - circle.y, 2)
    );
  }

  intersectsWithPolygon(polygon) {
    return polygon.edges.some((edge) => {
      return this.intersectsWithEdge(edge);
    });
  }

  intersectsWithEdge(edge) {
    const x1 = edge[0].x;
    const y1 = edge[0].y;
    const x2 = edge[1].x;
    const y2 = edge[1].y;
    const xc = this.center.x;
    const yc = this.center.y;

    const a = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    const b = 2 * (x2 - x1) * (x1 - xc) + 2 * (y2 - y1) * (y1 - yc);
    const c = (x1 - xc) ** 2 + (y1 - yc) ** 2 - this.radius ** 2;
    const roots = solveSquareEquation(a, b, c);
    return roots.some((root) => root >= 0 && root <= 1);
  }

  intersectsWithAxis(axis, maxValue) {
    if (axis == "x") {
      return this.x - this.r <= 0 || this.x + this.r >= maxValue;
    }

    return this.y - this.r <= 0 || this.y + this.r >= maxValue;
  }
}
