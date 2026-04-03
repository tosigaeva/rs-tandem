import { WidgetComponent } from '@/components/library/widget/widget.config';
import { AnyQuestionPayload } from '@/types/schemas/question-payload-schema';

type QuestionProperties = {
  questionId: number;
  WidgetComponent: WidgetComponent;
  questionPayload: AnyQuestionPayload;
  onCheck: (answer: unknown) => Promise<boolean | undefined>;
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
