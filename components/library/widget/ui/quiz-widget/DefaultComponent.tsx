import { QuizPayload } from '@/components/library/widget/ui/quiz-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: QuizPayload;
  onCheck: (questionId: string, answer: string) => Promise<void>;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  const answer = '';

  return (
    <>
      {questionPayload.options.map((option, key) => (
        <p key={key}>{option}</p>
      ))}

      <PrimaryButton onClick={() => onCheck(questionId, answer)}>Check</PrimaryButton>
    </>
  );
}
