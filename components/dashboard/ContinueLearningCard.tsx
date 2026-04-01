import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Progress } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InProgressTopic } from '@/data/dashboard.api';
import { useTranslation } from '@/hooks/use-translation';

type ContinueLearningCardProperties = {
  topics: InProgressTopic[];
};

export default function ContinueLearningCard({ topics }: ContinueLearningCardProperties) {
  const { translate } = useTranslation();

  if (topics.length === 0) return;

  return (
    <Card className="bg-card/90 h-full rounded-3xl border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Continue learning</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {topics.map((topic) => {
          const percent = (topic.completed / topic.total) * 100;

          return (
            <Link
              key={topic.id}
              href={topic.href}
              className="group bg-muted/60 hover:bg-muted flex items-center gap-4 rounded-xl p-3 transition"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium">{translate(topic.title)}</p>
                  <p className="text-muted-foreground text-xs">
                    {topic.completed}/{topic.total}
                  </p>
                </div>

                <Progress value={percent} className="h-2" />

                <p className="text-muted-foreground text-xs">
                  {formatDistanceToNow(topic.lastPracticedAt, { addSuffix: true })}
                </p>
              </div>

              <ArrowRight className="text-muted-foreground h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
