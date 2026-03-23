import { WidgetComponent } from '@/components/library/widget/widget.config';
import { QuestionPayload } from '@/types/question';

type QuestionProperties = {
  questionId: string;
  WidgetComponent: WidgetComponent;
  questionPayload: QuestionPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function QuestionWrapper({
  questionId,
  WidgetComponent,
  questionPayload,
  onCheck,
  onNext,
}: QuestionProperties) {
  return (
    <WidgetComponent questionId={questionId} questionPayload={questionPayload} onCheck={onCheck} onNext={onNext} />
  );
}
