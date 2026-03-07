import { TrueFalsePayload } from '@/components/library/widget/true-false-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionPayload: TrueFalsePayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <>
      <p>{questionPayload.statement}</p>
      <p>{questionPayload.explanation}</p>

      <PrimaryButton onClick={onCheck}>Check</PrimaryButton>
    </>
  );
}
