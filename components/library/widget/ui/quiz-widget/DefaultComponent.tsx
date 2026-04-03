import QuestionCard from '@/components/QuestionCard';
import { useTranslation } from '@/hooks/use-translation';
import { QuizPayloadQuestion } from '@/types/schemas/question-payload-schema';

type WidgetComponentProperties = {
  questionId: number;
  questionPayload: QuizPayloadQuestion;
  onCheck: (answer: unknown) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  const { translate } = useTranslation();

  return (
    <QuestionCard
      questionId={questionId.toString()}
      question={translate(questionPayload.question)}
      options={questionPayload.options.map((opt) => translate(opt))}
      instruction={translate({
        en: 'Select one answer',
        ru: 'Выберите один ответ',
        by: 'Выберыце адзін адказ',
      })}
      onCheck={onCheck}
      onNext={onNext}
    />
  );
}
