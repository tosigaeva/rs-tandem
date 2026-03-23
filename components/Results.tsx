import { ArrowLeft, RefreshCw } from 'lucide-react';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Progress } from './ui/progress';

type ResultsProperties = {
  questionsCount: number;
  correctAnswers: number;
};

export default function Results({ questionsCount, correctAnswers }: ResultsProperties) {
  const percentage = Math.round((correctAnswers / questionsCount) * 100);

  return (
    <section className="mx-auto max-w-xl p-4">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">🎉 You did it!</CardTitle>
          <CardDescription className="mt-2">You have completed the workout.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg">
            Correct Answers: <strong>{correctAnswers}</strong> / {questionsCount}
          </div>
          <Progress value={percentage} className="h-2 rounded-full" />
          <div className="text-muted-foreground text-sm">{percentage}% correct</div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <PrimaryButton variant="outline" className="mt-4 flex-1 py-3 py-6" onClick={() => console.log('restart')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Library
        </PrimaryButton>
        <PrimaryButton variant="secondary" className="mt-4 flex-1 py-3 py-6" onClick={() => console.log('restart')}>
          <RefreshCw className="mr-2 h-4 w-4" /> Restart
        </PrimaryButton>
      </div>
    </section>
  );
}
