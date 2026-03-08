import { WidgetComponent } from '@/components/library/widget/widget.config';
import { QuestionPayload } from '@/types/question';

type QuestionProperties = {
  WidgetComponent: WidgetComponent;
  questionId: string;
  questionPayload: QuestionPayload;
  onCheck: (p: boolean | undefined) => Promise<void>;
};

export default function QuestionWrapper({ WidgetComponent, questionId, questionPayload, onCheck }: QuestionProperties) {
  return <WidgetComponent questionId={questionId} questionPayload={questionPayload} onCheck={onCheck} />;
}
