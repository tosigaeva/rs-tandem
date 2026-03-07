'use client';

import { useEffect, useRef, useState } from 'react';

type Complexity = {
  name: string;
  func: (n: number) => number;
};

const complexities: Complexity[] = [
  { name: 'O(1)', func: (n: number) => 1 },
  { name: 'O(log n)', func: (n: number) => Math.log2(n) },
  { name: 'O(n)', func: (n: number) => n },
  { name: 'O(n log n)', func: (n: number) => n * Math.log2(n) },
  { name: 'O(n^2)', func: (n: number) => n * n },
];

const padding = 50;

type BigOCanvasProperties = {
  width?: number;
  height?: number;
};

export function BigOCanvas({ width = 600, height = 400 }: BigOCanvasProperties) {
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const [selectedLine, setSelectedLine] = useState<number | undefined>();

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasReference.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const maxX = 10;
    const maxY = Math.max(...complexities.map((c) => c.func(maxX)));

    let closest: number | undefined;
    let minDistance = 10;
    complexities.forEach((c, index) => {
      for (let x = 1; x <= maxX; x += 0.1) {
        const canvasX = padding + ((x - 1) / (maxX - 1)) * (width - 2 * padding);
        const canvasY = height - padding - (c.func(x) / maxY) * (height - 2 * padding);
        const distance = Math.hypot(canvasX - mouseX, canvasY - mouseY);
        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      }
    });

    setSelectedLine(closest);
  };

  useEffect(() => {
    const canvas = canvasReference.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, width, height);

    context.strokeStyle = '#000';
    context.beginPath();
    context.moveTo(padding, padding);
    context.lineTo(padding, height - padding);
    context.lineTo(width - padding, height - padding);
    context.stroke();

    const maxX = 10;
    const maxY = Math.max(...complexities.map((c) => c.func(maxX)));

    complexities.forEach((c, index) => {
      context.beginPath();
      for (let x = 1; x <= maxX; x += 0.1) {
        const canvasX = padding + ((x - 1) / (maxX - 1)) * (width - 2 * padding);
        const canvasY = height - padding - (c.func(x) / maxY) * (height - 2 * padding);

        if (x === 1) context.moveTo(canvasX, canvasY);
        else context.lineTo(canvasX, canvasY);
      }

      context.strokeStyle = selectedLine === index ? '#FF0000' : '#000';
      context.lineWidth = selectedLine === index ? 4 : 2;
      context.stroke();
    });
  }, [width, height, selectedLine]);

  const selectedName = selectedLine === undefined ? '' : (complexities[selectedLine]?.name ?? '');

  return (
    <div>
      <canvas
        ref={canvasReference}
        width={width}
        height={height}
        style={{ border: '1px solid #ccc' }}
        onClick={handleClick}
      />
      <p>Selected: {selectedName}</p>
    </div>
  );
}
