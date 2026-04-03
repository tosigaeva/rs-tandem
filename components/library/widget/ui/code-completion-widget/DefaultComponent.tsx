import { PrimaryButton } from '@/components/PrimaryButton';
import { useTranslation } from '@/hooks/use-translation';
import { CodeCompletionPayloadQuestion } from '@/types/schemas/question-payload-schema';

type WidgetComponentProperties = {
  questionPayload: CodeCompletionPayloadQuestion;
  onCheck: (answer: unknown) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function DefaultComponent({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const answer = '';
  const validate = async () => {
    await onCheck(answer);
    onNext();
  };

  const { translate } = useTranslation();

  return (
    <>
      <p>{questionPayload.code}</p>
      {questionPayload.blanks.map((option, key) => (
        <p key={key}>{option}</p>
      ))}
      {questionPayload?.hints?.map((option, key) => (
        <p key={key}>{translate(option)}</p>
      ))}

      <PrimaryButton onClick={() => validate()}>Check</PrimaryButton>
    </>
  );
}
