import { useState } from 'react';

import { FlipCardPayload } from '@/components/library/widget/ui/flip-card/type';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import styles from './FlipCard.module.css';

type WidgetComponentProperties = {
  questionPayload: FlipCardPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

const TOOLTIP_HINT =
  'Decide whether you know the answer to reveal it. You can change your resolution after card reveal.';

export default function FlipCard({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const [isFlipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

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
            <div className="text-center text-lg">{questionPayload.term}</div>
          </CardContent>
        </Card>
        <Card className={styles['flip-card-back']}>
          <CardContent className="flex h-full cursor-default flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{questionPayload.definition}</div>
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
          I know this
        </Button>
        <Button
          className={`${
            selected === 'false' ? 'bg-wrong-answer' : 'bg-wrong-answer-muted'
          } text-primary-foreground hover:bg-wrong-answer/90 rounded-lg px-4 py-2 transition-colors`}
          onClick={(event) => handleSelect('false', event)}
        >
          I don&apos;t know this
        </Button>
      </div>
      <Button className="m-2 w-4/5" disabled={selected === undefined} onClick={handleNext}>
        Next
      </Button>
      <div className="m-2">
        <Popover>
          <PopoverTrigger asChild>
            <p className="text-muted-foreground cursor-pointer text-sm">Hint</p>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="px-2 py-1">
            {TOOLTIP_HINT}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
