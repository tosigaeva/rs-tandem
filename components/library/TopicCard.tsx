'use client';

import { Badge, Progress } from '@/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { LevelLocales, TopicOverview } from '@/types/schemas/topic-schema';

type TopicCardProperties = {
  topic: TopicOverview;
  displayProgress: boolean;
};

export function TopicCard({ topic, displayProgress }: TopicCardProperties) {
  const { languageCode, translate } = useTranslation();

  return (
    <Card className="group transform-gp w-xs shrink-0 cursor-pointer transition-all duration-300 ease-out hover:scale-105">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs capitalize">
            {LevelLocales[topic.level][languageCode]}
          </Badge>
          {displayProgress && <span className="text-muted-foreground text-xs">{`${topic.progress}%`}</span>}
        </div>
        <CardTitle className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
          {translate(topic.name)}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm">{translate(topic.description)}</CardDescription>
      </CardHeader>
      <CardContent>{displayProgress && <Progress value={topic.progress} className="h-2" />}</CardContent>
      <CardFooter>
        <Badge variant="outline" className="text-xs font-normal">
          {topic.subject}
        </Badge>
      </CardFooter>
    </Card>
  );
}
