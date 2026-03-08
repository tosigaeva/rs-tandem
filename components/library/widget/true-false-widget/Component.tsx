import { TrueFalsePayload } from '@/components/library/widget/true-false-widget/type';
import QuestionCard from '@/components/QuestionCard';

type WidgetComponentProperties = {
  questionPayload: TrueFalsePayload;
  onCheck: () => void;
};

export default function Component({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <QuestionCard
      question={questionPayload.statement}
      options={['true', 'false']}
      instruction={'True or False'}
      onCheck={onCheck}
    />
  );
}
