'use client';

import { Badge, Progress } from '@/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocale } from '@/providers/locale.provider';
import { LevelLocales, Topic } from '@/types/schemas/topic-schema';

type TopicCardProperties = {
  topic: Topic;
  displayProgress: boolean;
};

export function TopicCard({ topic, displayProgress }: TopicCardProperties) {
  const { languageCode } = useLocale();

  return (
    <Card className="group transform-gp w-xs shrink-0 cursor-pointer transition-all duration-300 ease-out hover:scale-105">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs capitalize">
            {LevelLocales[topic.level][languageCode]}
          </Badge>
          {displayProgress && <span className="text-muted-foreground text-xs">{`${topic.progress.toFixed(2)}%`}</span>}
        </div>
        <CardTitle className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
          {topic.name[languageCode]}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm">{topic.description[languageCode]}</CardDescription>
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
