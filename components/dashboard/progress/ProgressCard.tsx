import Metric from '@/components/dashboard/progress/Metric';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ProgressCardProperties = {
  todayAnswers: number;
  totalAnswers: number;
  accuracy: number;
  streak: number;
};

export function ProgressCard({ todayAnswers, totalAnswers, accuracy, streak }: ProgressCardProperties) {
  return (
    <Card className="bg-card/90 flex h-full justify-start rounded-3xl border-none py-4 shadow-none">
      <CardHeader className="px-5 pt-4 pb-0">
        <CardTitle className="text-lg">Your progress</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <Metric label="Today" value={todayAnswers} />
          <Metric label="Streak" value={`${streak} days`} />
          <Metric label="Total answers" value={totalAnswers} />
          <Metric label="Accuracy" value={`${accuracy}%`} />
        </div>
      </CardContent>
    </Card>
  );
}
