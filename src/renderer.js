export default class Renderer {
  constructor(canvas, gameState) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.gameState = gameState;
  }

  render(tframe) {
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.gameState.circles.forEach((circle) => {
      this.renderCircle(circle);
    });
    this.gameState.polygons
      // .filter((p) => p.alive)
      .forEach((polygon) => {
        this.renderPolygon(polygon);
      });
  }

  renderCircle(circle) {
    this.context.beginPath();
    this.context.fillStyle = circle.color;
    this.context.arc(
      circle.collider.center.x,
      circle.collider.center.y,
      circle.collider.radius,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  renderPolygon(polygon) {
    this.context.beginPath();
    this.context.fillStyle = polygon.color;
    const verts = polygon.collider.vertices;
    this.context.moveTo(verts[0].x, verts[0].y);
    for (let i = 1; i < verts.length; i++) {
      const vertex = verts[i];
      this.context.lineTo(vertex.x, vertex.y);
    }

    this.context.closePath();
    this.context.fill();
  }
}
