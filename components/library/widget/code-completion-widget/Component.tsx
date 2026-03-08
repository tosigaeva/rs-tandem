import { CodeCompletionPayload } from '@/components/library/widget/code-completion-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionPayload: CodeCompletionPayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <>
      <p>{questionPayload.code}</p>
      {questionPayload.blanks.map((option, key) => (
        <p key={key}>{option}</p>
      ))}
      {questionPayload.hints.map((option, key) => (
        <p key={key}>{option}</p>
      ))}

      <PrimaryButton onClick={onCheck}>Check</PrimaryButton>
    </>
  );
}
