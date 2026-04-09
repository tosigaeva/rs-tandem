import { ArrowLeft, Dumbbell, Flame, LucideIcon, RefreshCw, RotateCcw, ThumbsUp, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { Routes } from '@/lib/routes';
import { MessageKey } from '@/services/locale/messages';

import { Progress } from './ui/progress';

const getResultMeta = (
  percentage: number
): {
  icon: LucideIcon;
  titleKey: MessageKey;
  descriptionKey: MessageKey;
} => {
  if (percentage === 100) {
    return {
      icon: Trophy,
      titleKey: 'results.perfect.title',
      descriptionKey: 'results.perfect.description',
    };
  }

  if (percentage >= 80) {
    return {
      icon: Flame,
      titleKey: 'results.great.title',
      descriptionKey: 'results.great.description',
    };
  }

  if (percentage >= 50) {
    return {
      icon: ThumbsUp,
      titleKey: 'results.good.title',
      descriptionKey: 'results.good.description',
    };
  }

  if (percentage > 0) {
    return {
      icon: Dumbbell,
      titleKey: 'results.keepGoing.title',
      descriptionKey: 'results.keepGoing.description',
    };
  }

  return {
    icon: RotateCcw,
    titleKey: 'results.retry.title',
    descriptionKey: 'results.retry.description',
  };
};

type ResultsProperties = {
  questionsCount: number;
  correctAnswers: number;
  onStartOver: () => void;
};

export default function Results({ questionsCount, correctAnswers, onStartOver }: ResultsProperties) {
  const { t } = useTranslation();

  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  const percentage = Math.round((correctAnswers / questionsCount) * 100);
  const { icon: Icon, titleKey, descriptionKey } = getResultMeta(percentage);
  const { width, height } = useWindowSize();

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start <= percentage) setDisplayedPercentage(start);
      else clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <section className="mx-auto max-w-xl p-4">
      <Confetti
        run={percentage === 100}
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={300}
        gravity={0.3}
      />
      <Card className="text-center">
        <CardHeader>
          <Icon className="text-primary mx-auto mb-4 h-12 w-12" />
          <CardTitle className="text-2xl">{t(titleKey)}</CardTitle>
          <CardDescription className="mt-2">{t(descriptionKey)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg">
            {t('results.correctAnswers')}: <strong>{correctAnswers}</strong> / {questionsCount}
          </div>
          <Progress value={displayedPercentage} className="h-2 rounded-full" />
          <div className="text-muted-foreground text-sm">
            {displayedPercentage}% {t('results.percentage')}
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <PrimaryButton asChild variant="outline" className="mt-4 flex-1 py-6">
          <Link href={Routes.Library}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('results.backToLibrary')}
          </Link>
        </PrimaryButton>
        <PrimaryButton variant="secondary" className="mt-4 flex-1 py-6" onClick={() => onStartOver()}>
          <RefreshCw className="mr-2 h-4 w-4" />{' '}
          {t(percentage === 100 ? 'results.startOver' : 'results.review-mistakes')}
        </PrimaryButton>
      </div>
    </section>
  );
}
