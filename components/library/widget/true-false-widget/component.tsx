import { TrueFalsePayload } from '@/components/library/widget/true-false-widget/type';
import { PrimaryButton } from '@/components/primary-button';

type WidgetComponentProperties = {
  questionPayload: TrueFalsePayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <>
      <p>{questionPayload.statement.ru}</p>
      <p>{questionPayload.explanation.ru}</p>

      <PrimaryButton onClick={onCheck}>Check</PrimaryButton>
    </>
  );
}
