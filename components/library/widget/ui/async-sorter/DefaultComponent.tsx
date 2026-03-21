import { AsyncSorterPayload } from '@/components/library/widget/ui/async-sorter/type';

type WidgetComponentProperties = {
  questionId: string;
  questionPayload: AsyncSorterPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function DefaultComponent({ questionId, questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  return <section>{`Async-Sorter: ${questionId}`}</section>;
}
