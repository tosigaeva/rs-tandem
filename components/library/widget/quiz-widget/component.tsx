import { QuizWidget } from '@/components/library/widget/quiz-widget/type';

type WidgetListProperties = {
  widget: QuizWidget;
};

export default function Component({ widget }: WidgetListProperties) {
  return (
    <>
      {widget.payload.options.map((option) => (
        <p key={option.ru}>{option.ru}</p>
      ))}

      <button onClick={() => {}}>Check</button>
    </>
  );
}
