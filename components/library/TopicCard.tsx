'use client';

import { Badge, Progress } from '@/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocale } from '@/providers/locale.provider';
import { Topic } from '@/types/schemas/topic-schema';

type TopicCardProperties = {
  topic: Topic;
};

export function TopicCard({ topic }: TopicCardProperties) {
  const { languageCode } = useLocale();

  return (
    <Card className="group transform-gp w-xs shrink-0 cursor-pointer transition-all duration-300 ease-out hover:scale-105">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs capitalize">
            {topic.level}
          </Badge>
          <span className="text-muted-foreground text-xs">{`(${topic.correctAnswers}/${topic.totalQuestions})`}</span>
        </div>
        <CardTitle className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
          {topic.name[languageCode]}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm">{topic.description[languageCode]}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={(topic.correctAnswers / topic.totalQuestions) * 100} className="h-2" />
      </CardContent>
      <CardFooter>
        <Badge variant="outline" className="text-xs font-normal">
          {topic.subject}
        </Badge>
      </CardFooter>
    </Card>
  );
}
