import { ArrowLeft, Dumbbell, Flame, RefreshCw, RotateCcw, ThumbsUp, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Routes } from '@/lib/routes';

import { Progress } from './ui/progress';

const getResultMeta = (percentage: number) => {
  if (percentage === 100) {
    return {
      icon: Trophy,
      title: 'Perfect Score!',
      description: 'Outstanding work. You got everything right!',
    };
  }

  if (percentage >= 80) {
    return {
      icon: Flame,
      title: 'Great job!',
      description: 'You did really well. Keep it up!',
    };
  }

  if (percentage >= 50) {
    return {
      icon: ThumbsUp,
      title: 'Good effort!',
      description: 'Nice progress. A bit more practice and you will master it.',
    };
  }

  if (percentage > 0) {
    return {
      icon: Dumbbell,
      title: 'Keep going!',
      description: 'Not bad. Try again and you will improve.',
    };
  }

  return {
    icon: RotateCcw,
    title: 'Give it another try',
    description: 'No correct answers yet, but that is how learning starts.',
  };
};

type ResultsProperties = {
  questionsCount: number;
  correctAnswers: number;
  onStartOver: () => void;
};

export default function Results({ questionsCount, correctAnswers, onStartOver }: ResultsProperties) {
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  const percentage = Math.round((correctAnswers / questionsCount) * 100);
  const { icon: Icon, title, description } = getResultMeta(percentage);

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
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={300}
        gravity={0.3}
      />
      <Card className="text-center">
        <CardHeader>
          <Icon className="text-primary mx-auto mb-4 h-12 w-12" />
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg">
            Correct Answers: <strong>{correctAnswers}</strong> / {questionsCount}
          </div>
          <Progress value={displayedPercentage} className="h-2 rounded-full" />
          <div className="text-muted-foreground text-sm">{displayedPercentage}% correct</div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <PrimaryButton asChild variant="outline" className="mt-4 flex-1 py-6">
          <Link href={Routes.Library}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </PrimaryButton>
        <PrimaryButton variant="secondary" className="mt-4 flex-1 py-6" onClick={() => onStartOver()}>
          <RefreshCw className="mr-2 h-4 w-4" /> Start Over
        </PrimaryButton>
      </div>
    </section>
  );
}
