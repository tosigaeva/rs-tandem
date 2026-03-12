'use client';

import { useEffect, useRef, useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import {
  COMPLEXITIES,
  drawAxes,
  drawComplexityCurves,
  getClosestComplexity,
  PADDING,
  setupCanvas,
} from './canvas.helpers';
import { BigOCanvasProperties } from './type';

export function BigOCanvas({ question, codeExample, selectedComplexity, onSelect, onSubmit }: BigOCanvasProperties) {
  const width = 400;
  const height = 300;
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const [selectedLine, setSelectedLine] = useState<number | undefined>();
  const [hoveredLine, setHoveredLine] = useState<number | undefined>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasReference.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const closest = getClosestComplexity(mouseX, mouseY, width, height);

    if (closest !== undefined) {
      setSelectedLine(closest);
      onSelect(COMPLEXITIES[closest].name);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasReference.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setMousePos({ x: mouseX, y: mouseY });
    const closest = getClosestComplexity(mouseX, mouseY, width, height);
    setHoveredLine(closest);
  };

  const handleMouseLeave = () => {
    setHoveredLine(undefined);
  };

  useEffect(() => {
    const canvas = canvasReference.current;
    if (!canvas) return;
    const context = setupCanvas(canvas, width, height);
    if (!context) return;

    context.clearRect(0, 0, width, height);

    drawAxes(context, width, height, PADDING);
    drawComplexityCurves(context, width, height, selectedLine);
  }, [width, height, selectedLine]);

  const selectedName =
    selectedComplexity ?? (selectedLine === undefined ? '' : (COMPLEXITIES[selectedLine]?.name ?? ''));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasReference}
          width={width}
          height={height}
          style={{ border: '1px solid #ccc' }}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        <HoverCard open={hoveredLine !== undefined}>
          <HoverCardTrigger asChild>
            <div
              style={{
                position: 'absolute',
                left: mousePos.x,
                top: mousePos.y,
                pointerEvents: 'none',
                width: 1,
                height: 1,
              }}
            />
          </HoverCardTrigger>
          <HoverCardContent side="top" className="w-fit px-2 py-1">
            {hoveredLine !== undefined && COMPLEXITIES[hoveredLine]?.name}
          </HoverCardContent>
        </HoverCard>
      </div>
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
