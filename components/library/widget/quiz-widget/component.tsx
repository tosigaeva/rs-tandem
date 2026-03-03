import { PrimaryButton } from '@/components/primary-button';
import { QuestionPayload } from '@/types/question';

type WidgetComponentProperties = {
  questionPayload: QuestionPayload;
};

export default function Component({ questionPayload }: WidgetComponentProperties) {
  return (
    <>
      {questionPayload.options.map((option) => (
        <p key={option.ru}>{option.ru}</p>
      ))}

      <PrimaryButton onClick={() => {}}>Check</PrimaryButton>
    </>
  );
}
