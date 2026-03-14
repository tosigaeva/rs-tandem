import { CodeCompletionPayload } from '@/components/library/widget/ui/code-completion-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionPayload: CodeCompletionPayload;
  onCheck: (answer: string) => Promise<void>;
};

export default function DefaultComponent({ questionPayload, onCheck }: WidgetComponentProperties) {
  const answer = '';
  const validate = async () => {
    await onCheck(answer);
  };

  return (
    <>
      <p>{questionPayload.code}</p>
      {questionPayload.blanks.map((option, key) => (
        <p key={key}>{option}</p>
      ))}
      {questionPayload.hints.map((option, key) => (
        <p key={key}>{option}</p>
      ))}

      <PrimaryButton onClick={() => validate()}>Check</PrimaryButton>
    </>
  );
}
