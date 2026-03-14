import { TrueFalsePayload } from '@/components/library/widget/ui/true-false-widget/type';
import QuestionCard from '@/components/QuestionCard';

type WidgetComponentProperties = {
  questionPayload: TrueFalsePayload;
  onCheck: (answer: string) => Promise<void>;
};

export default function DefaultComponent({ questionPayload, onCheck }: WidgetComponentProperties) {
  return (
    <QuestionCard
      question={questionPayload.statement}
      options={['true', 'false']}
      instruction={'True or False'}
      onCheck={onCheck}
    />
  );
}
