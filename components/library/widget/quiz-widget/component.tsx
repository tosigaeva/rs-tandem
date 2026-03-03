import { PrimaryButton } from '@/components/primary-button';
import { QuestionPayload } from '@/types/question';

type WidgetComponentProperties = {
  questionPayload: QuestionPayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <>
      {questionPayload.options.map((option) => (
        <p key={option.ru}>{option.ru}</p>
      ))}

      <PrimaryButton onClick={onCheck}>Check</PrimaryButton>
    </>
  );
}
