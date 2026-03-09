import { useState } from 'react';

import { getAnswer } from '@/api/trainer.api';
import { FlipCardPayload } from '@/components/library/widget/ui/flip-card/type';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import styles from './FlipCard.module.css';

type AnswerState = boolean | undefined | null;

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: FlipCardPayload;
  onCheck: (p: boolean | undefined) => Promise<void>;
};

export default function FlipCard({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  const [answer, setAnswer] = useState('');
  const [isFlipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<AnswerState>();

  const handleSelect = async (value: AnswerState) => {
    setSelected(value);
    setAnswer(await getAnswer(questionId));
    setFlipped(true);
    await onCheck(true);
  };

  return (
    <div className={styles['flip-card']}>
      <div className={cn(styles['flip-card-inner'], isFlipped && styles.flipped)}>
        <Card className={styles['flip-card-front']}>
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{questionPayload.question}</div>
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
        <Card className={styles['flip-card-back']}>
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{answer}</div>
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
