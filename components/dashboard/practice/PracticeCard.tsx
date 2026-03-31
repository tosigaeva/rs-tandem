import Metric from '@/components/dashboard/practice/Metric';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PracticeCardProperties = {
  correctAnswers: number;
  totalAnswers: number;
  accuracy: number;
  totalDays: number;
};

export function PracticeCard({ correctAnswers, totalAnswers, accuracy, totalDays }: PracticeCardProperties) {
  return (
    <Card className="border-border/60 from-background via-muted/40 to-muted/20 flex h-full justify-start rounded-3xl border bg-gradient-to-br py-4 shadow-sm">
      <CardHeader className="px-5 pt-4 pb-0">
        <CardTitle className="text-foreground text-lg">Practice snapshot</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <Metric label="Correct answers" value={correctAnswers} />
          <Metric label="Accuracy" value={`${accuracy}%`} />
          <Metric label="Total answers" value={totalAnswers} />
          <Metric label="Total days" value={totalDays} />
        </div>
      </CardContent>
    </Card>
  );
}
