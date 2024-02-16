import Circle from "./circle";

describe("Circle getters", () => {
  it("should calculate center correctly", () => {
    const circle = new Circle(10, 5, 50);
    expect(circle.center.x).toBe(10);
    expect(circle.center.y).toBe(5);
  });

  it("should calculate radius correctly", () => {
    const circle = new Circle(10, 5, 10);
    expect(circle.radius).toBe(10);
  });
});

describe("Circle.contains()", () => {
  let circle;
  beforeEach(() => {
    circle = new Circle(10, 10, 5);
  });

  it("should return true if point is inside circle", () => {
    expect(circle.contains({ x: 13, y: 9 })).toBeTruthy();
  });

  it("should return true if point is on circle", () => {
    expect(circle.contains({ x: 15, y: 10 })).toBeTruthy();
  });

  it("should return false if point is out of circle", () => {
    expect(circle.contains({ x: 20, y: 20 })).toBeFalsy();
  });
});

describe("Circle.intersectsWithCircle", () => {
  let circle
  beforeEach(() => {
    circle = new Circle(10, 10, 10)
  })

  it("should return false if circles don't intersect by x and y", () => {
    const otherCircle = new Circle(31, 30, 10)
    expect(circle.intersectsWithCircle(otherCircle)).toBeFalsy()
  })

  it("should return false if circles don't intersect by x", () => {
    const otherCircle = new Circle(-31, 10, 10)
    expect(circle.intersectsWithCircle(otherCircle)).toBeFalsy()
  })

  it("should return false if circles don't intersect by y", () => {
    const otherCircle = new Circle(15, 31, 10)
    expect(circle.intersectsWithCircle(otherCircle)).toBeFalsy()
  })

  it("should return false if circles intersect by x and y but overall don't", () => {
    const otherCircle = new Circle(29, 29, 10)
    expect(circle.intersectsWithCircle(otherCircle)).toBeFalsy()
  })
  
  it("should return true if circles intersect", () => {
    const otherCircle = new Circle(22, 22, 10)
    expect(circle.intersectsWithCircle(otherCircle)).toBeTruthy()
  })

  it("should return true if one circle contains another", () => {
    const otherCircle = new Circle(10, 10, 5)
    expect(circle.intersectsWithCircle(otherCircle)).toBeTruthy()
  })
})
