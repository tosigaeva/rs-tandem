import { validateQuestion } from '@/api/trainer.api';
import { TrueFalsePayload } from '@/components/library/widget/ui/true-false-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: TrueFalsePayload;
  onCheck: (p: boolean | undefined) => Promise<void>;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  const answer = '';
  const validate = async () => {
    await onCheck(await validateQuestion(questionId, answer));
  };

  return (
    <>
      <p>{questionPayload.statement}</p>
      <p>{questionPayload.explanation}</p>

      <PrimaryButton onClick={() => validate()}>Check</PrimaryButton>
    </>
  );
}
