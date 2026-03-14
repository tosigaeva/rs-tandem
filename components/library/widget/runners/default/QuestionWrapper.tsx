import { WidgetComponent } from '@/components/library/widget/widget.config';
import { QuestionPayload } from '@/types/question';

type QuestionProperties = {
  WidgetComponent: WidgetComponent;
  questionPayload: QuestionPayload;
  onCheck: (answer: string) => Promise<void>;
};

export default function QuestionWrapper({ WidgetComponent, questionPayload, onCheck }: QuestionProperties) {
  return <WidgetComponent questionPayload={questionPayload} onCheck={onCheck} />;
}
