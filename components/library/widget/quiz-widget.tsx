import {WidgetStrategy} from "@/components/library/widget/widget-engine";
import {WidgetType} from "@/types/widget";

export enum Locale {
  ru = 'ru',
  en = 'en',
  by = 'by',
}

type QuizPayload = {
  question: Record<Locale, string>,
  options: Record<Locale, string>[]
}
export type QuizWidget = {
  type: WidgetType.Quiz;
  payload: QuizPayload
}

interface QuizAnswer {
  selectedIndex: number;
}

export const quizStrategy: WidgetStrategy<QuizWidget, QuizAnswer> = {
  type: WidgetType.Quiz,
  render(widget, onAnswer) {
    return render(widget);
  },
  validate(answer) {
    // return answer.selectedIndex === await getCorrectAnswer(topicId, questionId);
    return answer.selectedIndex === 1;
  },
};

function render(widget: QuizWidget) {
  return <>
    {
      widget.payload.options.map(
        (option) =>
          <p>{ option.ru }</p>)
    }

    <button onClick={() => quizStrategy.validate({selectedIndex: 1})}>Check</button>
  </>
}

type WidgetListProperties = {
  widget: any;
};
export default function QuizWidget({widget}: WidgetListProperties) {
  return <>
    {
      widget.payload.options.map(
        (option) =>
          <p>{ option.ru }</p>)
    }

    <button onClick={() => quizStrategy.validate({selectedIndex: 1})}>Check</button>
  </>
}