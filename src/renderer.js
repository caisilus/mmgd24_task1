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
      this.drawCircle(circle);
    });
  }

  drawCircle(circle) {
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
}
