'use client';

import { Badge, Progress } from '@/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { formatPercent, roundPercent } from '@/lib/format';
import { LevelLocales, TopicOverview } from '@/types/schemas/topic-schema';

type TopicCardProperties = {
  topic: TopicOverview;
  displayProgress: boolean;
};

export function TopicCard({ topic, displayProgress }: TopicCardProperties) {
  const { languageCode, translate } = useTranslation();
  const roundedProgress = roundPercent(topic.progress);
  const progressLabel = formatPercent(roundedProgress);

  return (
    <Card className="group hover:ring-primary/40 hover:ring-offset-background h-full w-full cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:ring-2 hover:ring-offset-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs capitalize">
            {LevelLocales[topic.level][languageCode]}
          </Badge>
          {displayProgress && <span className="text-muted-foreground text-xs">{progressLabel}</span>}
        </div>
        <CardTitle className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
          {translate(topic.name)}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm">{translate(topic.description)}</CardDescription>
      </CardHeader>
      <CardContent>{displayProgress && <Progress value={roundedProgress} className="h-2" />}</CardContent>
      <CardFooter>
        <Badge variant="outline" className="text-xs font-normal">
          {topic.subject}
        </Badge>
      </CardFooter>
    </Card>
  );
}
