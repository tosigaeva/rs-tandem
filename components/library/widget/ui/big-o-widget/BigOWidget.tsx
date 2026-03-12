'use client';

import { useEffect, useRef, useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card } from '@/components/ui/card';

import { drawAxes, setupCanvas } from './canvas.helpers';
import { BigOCanvasProperties, Complexity } from './type';

const complexities: Complexity[] = [
  { name: 'O(1)', func: () => 1 },
  { name: 'O(log n)', func: (n: number) => Math.log2(n) },
  { name: 'O(n)', func: (n: number) => n },
  { name: 'O(n log n)', func: (n: number) => n * Math.log2(n) },
  { name: 'O(n^2)', func: (n: number) => n * n },
];

const padding = 50;

export function BigOCanvas({ question, codeExample, selectedComplexity, onSelect, onSubmit }: BigOCanvasProperties) {
  const width = 400;
  const height = 300;
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

    if (closest !== undefined) {
      setSelectedLine(closest);
      onSelect(complexities[closest].name);
    }
  };

  useEffect(() => {
    const canvas = canvasReference.current;
    if (!canvas) return;
    const context = setupCanvas(canvas, width, height);
    if (!context) return;

    context.clearRect(0, 0, width, height);

    context.strokeStyle = '#000';
    context.lineWidth = 1;

    drawAxes(context, width, height, padding);

    const maxX = 10;
    const maxY = Math.max(...complexities.map((c) => c.func(maxX)));

    complexities.forEach((c, index) => {
      context.beginPath();
      for (let x = 1; x <= maxX; x += 0.1) {
        const canvasX = padding + ((x - 1) / (maxX - 1)) * (width - 2 * padding);
        const canvasY = height - padding - 5 - (c.func(x) / maxY) * (height - 2 * padding);

        if (x === 1) context.moveTo(canvasX, canvasY);
        else context.lineTo(canvasX, canvasY);
      }

      context.strokeStyle = selectedLine === index ? '#FF0000' : '#000';
      context.lineWidth = selectedLine === index ? 2 : 1;
      context.stroke();
    });
  }, [width, height, selectedLine]);

  const selectedName =
    selectedComplexity ?? (selectedLine === undefined ? '' : (complexities[selectedLine]?.name ?? ''));

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasReference}
        width={width}
        height={height}
        style={{ border: '1px solid #ccc' }}
        onClick={handleClick}
      />
      <Card className="w-full max-w-md p-4">
        <h2>{question}</h2>
        <CodeBlock code={codeExample} />
      </Card>
      <Card className="w-full max-w-md p-4">
        <p>Selected: {selectedName}</p>
      </Card>
      <PrimaryButton disabled={selectedName === ''} onClick={onSubmit}>
        Check Answer
      </PrimaryButton>
    </div>
  );
}
