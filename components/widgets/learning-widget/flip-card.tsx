'use client';

import './flip-card.css';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type AnswerState = boolean | undefined | null;

export function FlipCard({ front, back }: { front: string; back: string }) {
  const [isFlipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<AnswerState>();

  const handleSelect = (value: AnswerState) => {
    setSelected(value);
    setFlipped(true);
  };

  return (
    <div className="flip-card">
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <Card className="flip-card-front">
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{front}</div>
            <Button
              className={`${
                (selected ?? false) ? 'bg-correct-answer' : 'bg-correct-answer-muted'
              } text-primary-foreground hover:bg-correct-answer/90 rounded-lg px-4 py-2 transition-colors`}
              onClick={() => handleSelect(true)}
            >
              I know this
            </Button>
            <Button
              className={`${
                selected === false ? 'bg-wrong-answer' : 'bg-wrong-answer-muted'
              } text-primary-foreground hover:bg-wrong-answer/90 rounded-lg px-4 py-2 transition-colors`}
              onClick={() => handleSelect(false)}
            >
              I don&apos;t know this
            </Button>
          </CardContent>
        </Card>
        <Card className="flip-card-back">
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{back}</div>
            <Button
              className={`${
                (selected ?? false) ? 'bg-correct-answer' : 'bg-correct-answer-muted'
              } text-primary-foreground hover:bg-correct-answer/90 rounded-lg px-4 py-2 transition-colors`}
              onClick={() => handleSelect(true)}
            >
              I know this
            </Button>
            <Button
              className={`${
                selected === false ? 'bg-wrong-answer' : 'bg-wrong-answer-muted'
              } text-primary-foreground hover:bg-wrong-answer/90 rounded-lg px-4 py-2 transition-colors`}
              onClick={() => handleSelect(false)}
            >
              I don&apos;t know this
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
