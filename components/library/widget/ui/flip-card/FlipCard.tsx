import { useState } from 'react';

import { FlipCardPayload } from '@/components/library/widget/ui/flip-card/type';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import styles from './FlipCard.module.css';

type WidgetComponentProperties = {
  questionPayload: FlipCardPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function FlipCard({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const [isFlipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  const handleFlip = () => {
    setFlipped((previous) => !previous);
  };

  const handleSelect = async (value: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setSelected(value);

    await onCheck(value);
    onNext();
  };

  return (
    <div className={styles['flip-card']} onClick={handleFlip}>
      <div className={cn(styles['flip-card-inner'], isFlipped && styles.flipped)}>
        <Card className={styles['flip-card-front']}>
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{questionPayload.term}</div>
            <div className="text-muted-foreground text-sm">Click on the card to flip</div>
          </CardContent>
        </Card>

        <Card className={styles['flip-card-back']}>
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-center text-lg">{questionPayload.definition}</div>
            <div className="text-muted-foreground text-center text-sm">
              Press &quot;I know&quot; if you remember the term, or press &quot;I do not know&quot; if you do not.
            </div>
          </CardContent>
        </Card>
      </div>
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
  );
}
