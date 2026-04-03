import QuestionCard from '@/components/QuestionCard';
import { useTranslation } from '@/hooks/use-translation';
import { TrueFalsePayloadQuestion } from '@/types/schemas/question-payload-schema';

type WidgetComponentProperties = {
  questionId: number;
  questionPayload: TrueFalsePayloadQuestion;
  onCheck: (answer: unknown) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const { translate } = useTranslation();

  return (
    <QuestionCard
      questionId={questionId.toString()}
      question={translate(questionPayload.statement)}
      options={['true', 'false']}
      instruction={'True or False'}
      onCheck={onCheck}
      onNext={onNext}
    />
  );
}
