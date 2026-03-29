'use client';

import { useEffect, useRef, useState } from 'react';

import CodeBlock from '@/components/CodeBlock';
import { Hint } from '@/components/Hint';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useTranslation } from '@/hooks/use-translation';

import {
  COMPLEXITIES,
  drawAxes,
  drawComplexityCurves,
  getClosestComplexity,
  PADDING,
  setupCanvas,
  TOOLTIP_HINT,
} from './canvas.helpers';
import { BigOCanvasProperties } from './type';

export function BigOCanvas({
  question,
  codeExample,
  selectedComplexity,
  onSelect,
  onSubmit,
  isCorrect,
  isSubmitted,
}: BigOCanvasProperties) {
  const width = 400;
  const height = 300;
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const [selectedLine, setSelectedLine] = useState<number | undefined>();
  const [hoveredLine, setHoveredLine] = useState<number | undefined>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { t, translate } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isSubmitted === true) return;
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
    if (isSubmitted === true) return;
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
    drawComplexityCurves(context, width, height, selectedLine, isCorrect, isSubmitted);
  }, [width, height, selectedLine, isCorrect, isSubmitted]);

  const selectedName =
    selectedComplexity ?? (selectedLine === undefined ? '' : (COMPLEXITIES[selectedLine]?.name ?? ''));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasReference}
          width={width}
          height={height}
          style={{ border: '1px solid #ccc', cursor: hoveredLine === undefined ? 'default' : 'pointer' }}
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
      <Card className="w-full max-w-md cursor-default p-4">
        <h2>{translate(question)}</h2>
        <CodeBlock code={codeExample} />
      </Card>
      <Card className="w-full max-w-md cursor-default p-4">
        <p>
          {t('widget.big-o.selected')}: {selectedName}
        </p>
      </Card>
      <PrimaryButton disabled={selectedName === ''} onClick={onSubmit}>
        {t(isSubmitted === true ? 'button.next' : 'button.check-answer')}
      </PrimaryButton>
      <Hint>{t(TOOLTIP_HINT)}</Hint>
    </div>
  );
}
