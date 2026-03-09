import { QuizPayload } from '@/components/library/widget/ui/quiz-widget/type';
import QuestionCard from '@/components/QuestionCard';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: QuizPayload;
  onCheck: (p: boolean | undefined) => Promise<void>;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <QuestionCard
      questionId={questionId}
      question={questionPayload.question}
      options={questionPayload.options}
      instruction={'Select one answer'}
      onCheck={onCheck}
    />
  );
}
