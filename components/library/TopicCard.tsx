'use client';

import { Badge, Progress } from '@/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { formatPercent, roundPercent } from '@/lib/format';
import { LevelLocales, TopicOverview } from '@/types/schemas/topic-schema';

type TopicCardProperties = {
  topic: TopicOverview;
  displayProgressBar: boolean;
};

export function TopicCard({ topic, displayProgressBar }: TopicCardProperties) {
  const { languageCode, translate, t } = useTranslation();
  const roundedProgress = roundPercent(topic.progress);
  const progressLabel = formatPercent(roundedProgress);

  return (
    <Card className="group hover:ring-primary/40 hover:ring-offset-background h-full w-full cursor-pointer gap-4 transition-all duration-300 ease-out hover:shadow-lg hover:ring-2 hover:ring-offset-2">
      <CardHeader className="gap-2 pb-0">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs capitalize">
            {LevelLocales[topic.level][languageCode]}
          </Badge>
          {displayProgressBar && <span className="text-muted-foreground text-xs">{progressLabel}</span>}
          {!displayProgressBar &&
            topic.progress > 0 &&
            (topic.progress > 99 ? (
              <Badge className="bg-correct-answer-muted/25 text-correct-answer border-correct-answer text-xs">
                Completed
              </Badge>
            ) : (
              <Badge className="border-blue-400 bg-blue-500/10 text-xs text-blue-400">
                {' '}
                In Progress: {progressLabel}
              </Badge>
            ))}
        </div>
        <CardTitle
          className="group-hover:text-primary line-clamp-1 text-lg font-semibold tracking-tight transition-colors"
          title={translate(topic.name)}
        >
          {translate(topic.name)}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm">{translate(topic.description)}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {displayProgressBar && <Progress value={roundedProgress} className="h-2" />}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full items-center justify-between gap-2 text-xs">
          <Badge variant="outline" className="text-xs font-normal">
            {topic.subject}
          </Badge>
          <span className="text-muted-foreground">
            {t('library.card.questions')}: {topic.totalQuestions}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
