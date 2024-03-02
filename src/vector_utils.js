function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

export function calculateNormal(edge) {
  // Assuming edge is represented by two vertices
  const dx = edge[1].x - edge[0].x;
  const dy = edge[1].y - edge[0].y;
  return { x: -dy, y: dx }; // Normal vector
}

export function projectPointToNormal(point, normal) {
  const dot = dotProduct(point, normal);
  return { min: dot, max: dot };
}

export function projectEdgeToNormal(edge, normal) {
  const dot1 = dotProduct(edge[0], normal);
  const dot2 = dotProduct(edge[1], normal);

  if (dot1 < dot2) return { min: dot1, max: dot2 };
  else return { min: dot2, max: dot1 };
}

export function projectFigureToNormal(figure, normal) {
  let proj = projectEdgeToNormal(figure.edges[0], normal);
  let min = proj.min;
  let max = proj.max;
  figure.edges.slice(1).forEach((edge) => {
    proj = projectEdgeToNormal(edge, normal);
    if (proj.min < min) min = proj.min;
    if (proj.max > max) max = proj.max;
  });

  return { min: min, max: max };
}

export function projectionsOverlap(proj1, proj2) {
  return proj1.min <= proj2.max && proj2.min <= proj1.max;
}
