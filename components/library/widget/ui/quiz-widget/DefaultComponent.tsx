import { QuizPayload } from '@/components/library/widget/ui/quiz-widget/type';
import QuestionCard from '@/components/QuestionCard';

type WidgetComponentProperties = {
  questionPayload: QuizPayload;
  onCheck: (answer: string) => Promise<void>;
};

export default function DefaultComponent({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <QuestionCard
      question={questionPayload.question}
      options={questionPayload.options}
      instruction={'Select one answer'}
      onCheck={onCheck}
    />
  );
}
