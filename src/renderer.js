export default class Renderer {
  constructor(canvas, gameState) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")
    this.gameState = gameState
  }

  render(tframe) {
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw
    this.gameState.rects.forEach((rect) => {
      this.drawRect(rect);
    });

    this.gameState.circles.forEach((circle) => {
      this.drawCircle(circle)
    });
  }

  drawRect(rect) {
    this.context.beginPath();
    this.context.rect(rect.x, rect.y, rect.w, rect.h);
    this.context.fill();
  }

  drawCircle(circle) {
    this.context.beginPath();
    this.context.fillStyle = circle.color;
    this.context.arc(
      circle.center.x,
      circle.center.y,
      circle.radius,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }
}