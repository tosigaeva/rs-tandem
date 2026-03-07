import { TrueFalsePayload } from '@/components/library/widget/ui/true-false-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: TrueFalsePayload;
  onCheck: (questionId: string, answer: string) => Promise<void>;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  const answer = '';

  return (
    <>
      <p>{questionPayload.statement}</p>
      <p>{questionPayload.explanation}</p>

      <PrimaryButton onClick={() => onCheck(questionId, answer)}>Check</PrimaryButton>
    </>
  );
}
