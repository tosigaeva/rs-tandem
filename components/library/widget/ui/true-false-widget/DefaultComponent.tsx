import { TrueFalsePayload } from '@/components/library/widget/ui/true-false-widget/type';
import QuestionCard from '@/components/QuestionCard';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: TrueFalsePayload;
  onCheck: (p: boolean | undefined) => Promise<void>;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <QuestionCard
      questionId={questionId}
      question={questionPayload.statement}
      options={['true', 'false']}
      instruction={'True or False'}
      onCheck={onCheck}
    />
  );
}
