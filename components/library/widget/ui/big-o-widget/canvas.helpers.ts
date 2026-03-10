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
