import { useState } from 'react';

import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { FlipCardPayloadQuestion } from '@/types/schemas/question-payload-schema';
import { ValidationResult } from '@/types/validation';

import styles from './FlipCard.module.css';

type WidgetComponentProperties = {
  questionPayload: FlipCardPayloadQuestion;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  onNext: () => void;
};

export default function FlipCard({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const [isFlipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  const { t, translate } = useTranslation();

  const handleFlip = () => {
    setFlipped(true);
  };

  const handleSelect = (value: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!isFlipped) {
      handleFlip();
    }

    setSelected(value);
  };

  const handleNext = async () => {
    if (selected !== undefined) {
      onNext();
      await onCheck(selected);
    }
  };

  return (
    <div className={styles['flip-card']}>
      <div className={cn(styles['flip-card-inner'], isFlipped && styles.flipped)}>
        <Card className={styles['flip-card-front']}>
          <CardContent className="flex h-full cursor-default flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{translate(questionPayload.term)}</div>
          </CardContent>
        </Card>
        <Card className={styles['flip-card-back']}>
          <CardContent className="flex h-full cursor-default flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{translate(questionPayload.definition)}</div>
          </CardContent>
        </Card>
      </div>
      <div className="m-2 flex justify-center gap-1">
        <Button
          className={`${
            selected === 'true' ? 'bg-correct-answer' : 'bg-correct-answer-muted'
          } text-primary-foreground hover:bg-correct-answer/90 rounded-lg px-4 py-2 transition-colors`}
          onClick={(event) => handleSelect('true', event)}
        >
          {t('widget.flip-card.know')}
        </Button>
        <Button
          className={`${
            selected === 'false' ? 'bg-wrong-answer' : 'bg-wrong-answer-muted'
          } text-primary-foreground hover:bg-wrong-answer/90 rounded-lg px-4 py-2 transition-colors`}
          onClick={(event) => handleSelect('false', event)}
        >
          {t('widget.flip-card.not-know')}
        </Button>
      </div>
      <Button className="m-2 w-4/5" disabled={selected === undefined} onClick={handleNext}>
        {t('button.next')}
      </Button>
      <Hint>{t('widget.flip-card.tooltip_hint')}</Hint>
    </div>
  );
}
