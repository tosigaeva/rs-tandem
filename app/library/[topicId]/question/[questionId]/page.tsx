import {getQuestion} from "@/app/library/[topicId]/widget/[widgetId]/page";
import {renderWidget} from "@/components/library/widget/widget-engine";
import {Locale} from "@/components/library/widget/quiz-widget";
import {WidgetType} from "@/types/widget";

type PageProperties = {
  params: Promise<{ topicId: number, questionId: number }>
};

// TODO: Simplify generic
export function parseEnum<T extends Record<string, string>>(enumObj: T, str: string): T[keyof T] {
  if (Object.values(enumObj).includes(str)) {
    return str as T[keyof T];
  }
  throw new Error(`Invalid enum value: ${str}`);
}

export function mapToLocale<T extends Record<string, string>>(obj: T): Record<Locale, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[parseEnum(Locale, key)] = value;
    return acc;
  }, {} as Record<Locale, string>);
}

export default async function Page({ params }: PageProperties) {
  const { topicId, questionId } = await params;

  const question = getQuestion(topicId, questionId)
  const widget = {
    type: parseEnum(WidgetType, question.type),
    payload: {
      question: mapToLocale(question.payload.question),
      options: question.payload.options.map(option => (mapToLocale(option))),
    },
  }

  return renderWidget(widget, () => {});
}