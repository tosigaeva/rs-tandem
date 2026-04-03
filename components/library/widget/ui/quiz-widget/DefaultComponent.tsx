import { QuizPayload } from '@/components/library/widget/ui/quiz-widget/type';
import QuestionCard from '@/components/QuestionCard';
import { ValidationResult } from '@/types/validation';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: QuizPayload;
  onCheck: (answer: unknown) => Promise<ValidationResult>;
  onNext: () => void;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  return (
    <QuestionCard
      questionId={questionId}
      question={questionPayload.question}
      options={questionPayload.options}
      instruction={'Select one answer'}
      onCheck={onCheck}
      onNext={onNext}
    />
  );
}
