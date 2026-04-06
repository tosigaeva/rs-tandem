import { TrueFalsePayload } from '@/components/library/widget/ui/true-false-widget/type';
import QuestionCard from '@/components/QuestionCard';
import { ValidationResult } from '@/types/validation';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: TrueFalsePayload;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  onNext: () => void;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  return (
    <QuestionCard
      questionId={questionId}
      question={questionPayload.statement}
      options={['true', 'false']}
      instruction={'True or False'}
      onCheck={onCheck}
      onNext={onNext}
    />
  );
}
