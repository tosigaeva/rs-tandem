import { Badge } from '@/components/ui';

export default function TopicProgressBadge({
  progressValue,
  progressLabel,
}: {
  progressValue: number;
  progressLabel: string;
}) {
  if (progressValue === 0) {
    return <Badge className="bg-secondary/25 border-primary text-xs">No Progress</Badge>;
  }

  if (progressValue > 99) {
    return (
      <Badge className="bg-correct-answer-muted/25 text-correct-answer border-correct-answer text-xs">Completed</Badge>
    );
  }

  return <Badge className="border-blue-400 bg-blue-500/10 text-xs text-blue-400"> In Progress: {progressLabel}</Badge>;
}
