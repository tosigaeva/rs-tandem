import { validateQuestion } from '@/api/trainer.api';
import { QuizPayload } from '@/components/library/widget/ui/quiz-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: QuizPayload;
  onCheck: (p: boolean | undefined) => Promise<void>;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  const answer = '';
  const validate = async () => {
    await onCheck(await validateQuestion(questionId, answer));
  };

  return (
    <>
      {questionPayload.options.map((option, key) => (
        <p key={key}>{option}</p>
      ))}

      <PrimaryButton onClick={() => validate()}>Check</PrimaryButton>
    </>
  );
}
