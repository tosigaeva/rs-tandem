import { CodeCompletionPayload } from '@/components/library/widget/code-completion-widget/type';
import { PrimaryButton } from '@/components/primary-button';

type WidgetComponentProperties = {
  questionPayload: CodeCompletionPayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <>
      <p>{questionPayload.code}</p>
      {questionPayload.blanks.map((option) => (
        <p key={option}>{option}</p>
      ))}
      {questionPayload.hints.map((option) => (
        <p key={option.ru}>{option.ru}</p>
      ))}

      <PrimaryButton onClick={onCheck}>Check</PrimaryButton>
    </>
  );
}
