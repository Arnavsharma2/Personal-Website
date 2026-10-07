type Point = { x: number; y: number };
type Segment = [string, string];

const STEP = 20;
const COLUMNS = 89;
const ROWS = 59;
const OFFSET = -80;

// Contours of a gently warped surface create a continuous, nonrepeating field.
// Everything is deterministic and rendered as SVG on the server.
function surface(x: number, y: number) {
  const u = x + 110 * Math.sin(y / 350) + 55 * Math.cos(x / 560 + y / 420);
  const v = y + 70 * Math.sin(x / 460) - 35 * Math.cos(y / 240);
  const hill = Math.exp(-(((u - 1240) / 510) ** 2) - ((v - 110) / 440) ** 2);
  const valley = Math.exp(-(((u - 330) / 390) ** 2) - ((v - 710) / 350) ** 2);

  return (
    0.38 * Math.sin(u / 390) +
    0.3 * Math.cos(v / 270) +
    0.2 * Math.sin((u + v) / 530) +
    0.18 * Math.cos((u - v) / 300) +
    0.95 * hill -
    0.78 * valley
  );
}

const samples = Array.from({ length: ROWS }, (_, row) =>
  Array.from({ length: COLUMNS }, (_, column) =>
    surface(OFFSET + column * STEP, OFFSET + row * STEP),
  ),
);

function smoothPath(points: Point[], closed: boolean) {
  if (points.length < 4) return "";

  const coordinates = (point: Point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  const midpoint = (a: Point, b: Point): Point => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  });
  const first = points[0];
  const last = points[points.length - 1];
  const start = closed ? midpoint(last, first) : first;
  let path = `M${coordinates(start)}Q${coordinates(first)} ${coordinates(midpoint(first, points[1]))}`;

  // Midpoint quadratics give smooth curves without long lists of control points.
  for (let index = 1; index < points.length - 1; index += 1) {
    path += `T${coordinates(midpoint(points[index], points[index + 1]))}`;
  }

  return path + `T${coordinates(closed ? start : last)}${closed ? "Z" : ""}`;
}

function contour(level: number) {
  const vertices = new Map<string, Point>();
  const neighbors = new Map<string, string[]>();

  function connect([a, b]: Segment) {
    neighbors.set(a, [...(neighbors.get(a) ?? []), b]);
    neighbors.set(b, [...(neighbors.get(b) ?? []), a]);
  }

  for (let row = 0; row < ROWS - 1; row += 1) {
    for (let column = 0; column < COLUMNS - 1; column += 1) {
      const values = [
        samples[row][column],
        samples[row][column + 1],
        samples[row + 1][column + 1],
        samples[row + 1][column],
      ];
      const corners: Point[] = [
        { x: OFFSET + column * STEP, y: OFFSET + row * STEP },
        { x: OFFSET + (column + 1) * STEP, y: OFFSET + row * STEP },
        { x: OFFSET + (column + 1) * STEP, y: OFFSET + (row + 1) * STEP },
        { x: OFFSET + column * STEP, y: OFFSET + (row + 1) * STEP },
      ];
      const ids = [
        `h${row}:${column}`,
        `v${row}:${column + 1}`,
        `h${row + 1}:${column}`,
        `v${row}:${column}`,
      ];
      const crossings: string[] = [];

      for (let edge = 0; edge < 4; edge += 1) {
        const next = (edge + 1) % 4;
        if ((values[edge] > level) === (values[next] > level)) continue;

        const fraction = (level - values[edge]) / (values[next] - values[edge]);
        vertices.set(ids[edge], {
          x: corners[edge].x + fraction * (corners[next].x - corners[edge].x),
          y: corners[edge].y + fraction * (corners[next].y - corners[edge].y),
        });
        crossings.push(ids[edge]);
      }

      if (crossings.length === 2) {
        connect([crossings[0], crossings[1]]);
      } else if (crossings.length === 4) {
        const centerAbove = values.reduce((sum, value) => sum + value, 0) / 4 > level;
        const pairs = centerAbove === (values[0] > level) ? [[0, 1], [2, 3]] : [[0, 3], [1, 2]];
        for (const [a, b] of pairs) connect([crossings[a], crossings[b]]);
      }
    }
  }

  const visited = new Set<string>();
  const paths: string[] = [];
  // Trace boundary-to-boundary curves first, then the remaining closed contours.
  const starts = [...neighbors.keys()].sort(
    (a, b) => neighbors.get(a)!.length - neighbors.get(b)!.length,
  );

  for (const start of starts) {
    if (visited.has(start)) continue;
    const points: Point[] = [];
    let current: string | undefined = start;

    while (current !== undefined && !visited.has(current)) {
      visited.add(current);
      points.push(vertices.get(current)!);
      current = neighbors.get(current)!.find((neighbor) => !visited.has(neighbor));
    }

    const path = smoothPath(points, neighbors.get(start)!.length === 2);
    if (path) paths.push(path);
  }

  return paths.join("");
}

const contours = Array.from({ length: 94 }, (_, index) => contour(-1.3 + index * 0.03)).filter(Boolean);

export default function FlowField() {
  return (
    <svg
      className="flow-field"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="#a1a687" strokeOpacity="0.19" strokeWidth="0.65">
        {contours.map((path, index) => (
          <path key={index} d={path} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
