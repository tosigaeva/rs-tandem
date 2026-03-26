import { CodeCompletionPayload } from '@/components/library/widget/ui/code-completion-widget/type';
import { PrimaryButton } from '@/components/PrimaryButton';

type WidgetComponentProperties = {
  questionPayload: CodeCompletionPayload;
  onCheck: (answer: string) => Promise<boolean | undefined>;
  onNext: () => void;
};

export default function DefaultComponent({ questionPayload, onCheck, onNext }: WidgetComponentProperties) {
  return (
    <>
      <p>Code Ordering</p>
    </>
  );
}
