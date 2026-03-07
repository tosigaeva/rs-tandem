import { CodeCompletionPayload } from '@/components/library/widget/ui/code-completion-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: CodeCompletionPayload;
  onCheck: (questionId: string, answer: string) => Promise<void>;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  const answer = '';

  return (
    <>
      <p>{questionPayload.code}</p>
      {questionPayload.blanks.map((option, key) => (
        <p key={key}>{option}</p>
      ))}
      {questionPayload.hints.map((option, key) => (
        <p key={key}>{option}</p>
      ))}

      <PrimaryButton onClick={() => onCheck(questionId, answer)}>Check</PrimaryButton>
    </>
  );
}
