import { Badge, Progress } from '@/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Topic, UserTopic } from '@/types/topic';

type TopicCardProperties = {
  topic: Topic | UserTopic;
};

const isUserTopic = (topic: Topic | UserTopic): topic is UserTopic => {
  return 'progress' in topic && 'lastTrainedAt' in topic;
};

export function TopicCard({ topic }: TopicCardProperties) {
  return (
    <Card className="group transform-gp w-xs shrink-0 cursor-pointer transition-all duration-300 ease-out hover:scale-105">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs capitalize">
            {topic.level}
          </Badge>
          {isUserTopic(topic) && <span className="text-muted-foreground text-xs">{topic.progress}%</span>}
        </div>
        <CardTitle className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
          {topic.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm">{topic.description}</CardDescription>
      </CardHeader>
      <CardContent>{isUserTopic(topic) && <Progress value={Number(topic.progress)} className="h-2" />}</CardContent>
      <CardFooter>
        <Badge variant="outline" className="text-xs font-normal">
          {topic.subject}
        </Badge>
      </CardFooter>
    </Card>
  );
}
