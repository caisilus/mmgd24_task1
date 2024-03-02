import {
  calculateNormal,
  projectPointToNormal,
  projectEdgeToNormal,
  projectFigureToNormal,
  projectionsOverlap,
} from "./vector_utils";

import Circle from "./circle";

export default class RegularPolygon {
  constructor(x, y, r, nVerts, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.nVerts = nVerts;
  }

  get vertices() {
    const vertices = Array(this.nVerts).fill(null);

    for (let i = 0; i < this.nVerts; i++) {
      let angle = i * this.angle;

      let x = this.x + Math.cos(angle) * this.r;
      let y = this.y + Math.sin(angle) * this.r;

      vertices[i] = { x: x, y: y };
    }

    return vertices;
  }

  get edges() {
    const edges = Array(this.nVerts);

    this.vertices.forEach((vert, i) => {
      const nextIndex = i < this.nVerts - 1 ? i + 1 : 0;
      edges[i] = [vert, this.vertices[nextIndex]];
    });

    return edges;
  }

  get center() {
    return { x: this.x, y: this.y };
  }

  get angle() {
    return (2 * Math.PI) / this.nVerts;
  }

  // I am too lazy to implement, but in case it is needed:
  // Use ray intersection method: if ray from a point has even number of intersections with edges,
  // then it is outside of ngon. Otherwise - inside.
  contains() {}

  intersects(collider) {
    if (collider instanceof Circle) {
      return this.intersectsWithCircle(collider);
    } else {
      return this.intersectsWithRightPolygon(collider);
    }
  }

  intersectsWithCircle(circle) {
    return circle.intersectsWithPolygon(this);
  }

  intersectsWithRightPolygon(other) {
    for (const edge of this.edges) {
      const normal = calculateNormal(edge);
      const proj = projectFigureToNormal(this, normal);
      const otherProj = projectFigureToNormal(other, normal);

      if (!projectionsOverlap(proj, otherProj)) return false;
    }

    return true;
  }

  intersectsWithAxis(axis, maxValue) {
    const axisVector = this.getAxisVector(axis);
    const proj = projectFigureToNormal(this, axisVector);
    return proj.min < 0 || proj.max > maxValue;
  }

  getAxisVector(axis) {
    if (axis == "x") {
      return { x: 1, y: 0 };
    } else {
      return { x: 0, y: 1 };
    }
  }
}
