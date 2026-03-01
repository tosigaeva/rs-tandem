'use client';

import './flip-card.css';

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';

export function FlipCard({ front, back }: { front: string; back: string }) {
  const [isFlipped, setFlipped] = useState(false);

  return (
    <div className="flip-card">
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <Card className="flip-card-front">
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{front}</div>
            <button
              onClick={() => setFlipped(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 transition-colors"
            >
              Show Answer
            </button>
          </CardContent>
        </Card>

        <Card className="flip-card-back">
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{back}</div>
            <button
              onClick={() => setFlipped(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 transition-colors"
            >
              Show Question
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
