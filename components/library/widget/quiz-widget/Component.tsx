import { QuizPayload } from '@/components/library/widget/quiz-widget/type';
import { PrimaryButton } from '@/components/primary-button';

type WidgetComponentProperties = {
  questionPayload: QuizPayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <>
      {questionPayload.options.map((option, key) => (
        <p key={key}>{option}</p>
      ))}

      <PrimaryButton onClick={onCheck}>Check</PrimaryButton>
    </>
  );
}
