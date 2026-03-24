import { Complexity } from './type';

export const PADDING = 50;
export const TOOLTIP_HINT = 'Click on a curve to select complexity of the algorithm';

export const COMPLEXITIES: Complexity[] = [
  { name: 'O(1)', func: () => 1 },
  { name: 'O(log n)', func: (n: number) => Math.log2(n) },
  { name: 'O(n)', func: (n: number) => n },
  { name: 'O(n log n)', func: (n: number) => n * Math.log2(n) },
  { name: 'O(n^2)', func: (n: number) => n * n },
];

export function getClosestComplexity(
  mouseX: number,
  mouseY: number,
  width: number,
  height: number
): number | undefined {
  const minX = 1;
  const maxX = 5;
  const maxY = Math.max(...COMPLEXITIES.map((c) => c.func(maxX) - c.func(minX)));

  let closest: number | undefined;
  let minDistance = 10;

  COMPLEXITIES.forEach((c, index) => {
    const startValue = c.func(minX);
    for (let x = minX; x <= maxX; x += 0.1) {
      const canvasX = PADDING + ((x - minX) / (maxX - minX)) * (width - 2 * PADDING);
      const normalizedY = c.func(x) - startValue;
      const canvasY = height - PADDING - 5 - (normalizedY / maxY) * (height - 2 * PADDING);
      const distance = Math.hypot(canvasX - mouseX, canvasY - mouseY);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    }
  });

  return closest;
}

export function drawComplexityCurves(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  selectedLineIndex?: number,
  isCorrect?: boolean,
  isSubmitted?: boolean
) {
  const minX = 1;
  const maxX = 5;
  const maxY = Math.max(...COMPLEXITIES.map((c) => c.func(maxX) - c.func(minX)));

  COMPLEXITIES.forEach((c, index) => {
    const startValue = c.func(minX);
    context.beginPath();
    for (let x = minX; x <= maxX; x += 0.1) {
      const canvasX = PADDING + ((x - minX) / (maxX - minX)) * (width - 2 * PADDING);
      const normalizedY = c.func(x) - startValue;
      const canvasY = height - PADDING - 5 - (normalizedY / maxY) * (height - 2 * PADDING);

      if (x === minX) context.moveTo(canvasX, canvasY);
      else context.lineTo(canvasX, canvasY);
    }

    let strokeColor = '#000';
    let lineWidth = 1;

    if (selectedLineIndex === index) {
      lineWidth = 2;
      if (isSubmitted === true) {
        strokeColor = isCorrect === true ? '#22c55e' : '#ef4444';
      } else {
        strokeColor = '#3b82f6';
      }
    }

    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    context.stroke();
  });
}

export function drawAxes(context: CanvasRenderingContext2D, width: number, height: number, padding: number) {
  context.strokeStyle = '#000';
  context.lineWidth = 1;

  // Y axis
  context.beginPath();
  context.moveTo(padding, height - padding);
  context.lineTo(padding, padding);
  context.stroke();

  // X axis
  context.beginPath();
  context.moveTo(padding, height - padding);
  context.lineTo(width - padding, height - padding);
  context.stroke();

  // Y arrow
  context.beginPath();
  context.moveTo(padding, padding);
  context.lineTo(padding - 5, padding + 10);
  context.lineTo(padding + 5, padding + 10);
  context.closePath();
  context.fill();

  // X arrow
  context.beginPath();
  context.moveTo(width - padding, height - padding);
  context.lineTo(width - padding - 10, height - padding - 5);
  context.lineTo(width - padding - 10, height - padding + 5);
  context.closePath();
  context.fill();

  context.font = '14px sans-serif';

  context.fillText('Input Size (n)', width / 2, height - 15);

  context.save();
  context.translate(25, height / 2);
  context.rotate(-Math.PI / 2);

  context.fillText('Time', 0, 0);
  context.restore();
}

export function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext('2d');
  if (!context) return;

  context.scale(dpr, dpr);

  return context;
}
