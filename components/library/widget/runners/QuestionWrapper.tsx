import { WidgetComponent } from '@/components/library/widget/widget.config';
import { AnyQuestionPayload } from '@/types/schemas/question-payload-schema';
import { ValidationResult } from '@/types/validation';

type QuestionProperties = {
  questionId: number;
  WidgetComponent: WidgetComponent;
  questionPayload: AnyQuestionPayload;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
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
    <WidgetComponent
      key={questionId}
      questionId={questionId}
      questionPayload={questionPayload}
      onCheck={onCheck}
      onNext={onNext}
    />
  );
}
