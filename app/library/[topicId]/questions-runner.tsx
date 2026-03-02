"use client";

import {WidgetType} from '@/types/widget';
import Question from "@/app/library/[topicId]/question";
import {useState} from "react";
import {mapToLocale, parseEnum} from "@/app/library/[topicId]/question/[questionId]/page";

type WidgetListProperties = {
  questions: any;
  widgets?: any;
};

export default function QuestionsRunner({ questions, widgets}: WidgetListProperties) {

  // TODO: const [currentIndex, setCurrentIndex] = useState(0)
  const [question, setQuestion] = useState(questions[0]);

  const widget = {
    type: parseEnum(WidgetType, question.type),
    payload: questions.payload,
  }

  return (
    <section>
      <Question widget={widget}></Question>
    </section>
  );
}

/*"use client";

import WidgetCard from '@/components/library/widget-card';
import {Widget, WidgetType} from '@/types/widget';
import {Routes} from "@/lib/routes";
import Link from "next/link";
import Question from "@/app/library/[topicId]/question";
import {useState} from "react";
import {WidgetStrategy} from "@/components/library/widget/widget-engine";
import {quizStrategy} from "@/components/library/widget/quiz-widget";
import {mapToLocale, parseEnum} from "@/app/library/[topicId]/question/[questionId]/page";

type WidgetListProperties = {
  questions: any;
  widgets?: any;
};

export default function QuestionsRunner({ questions, widgets}: WidgetListProperties) {
  const [question, setQuestion] = useState(questions[0]);

  const widget = {
    type: parseEnum(WidgetType, question.type),
    payload: {
      question: mapToLocale(question.payload.question),
      options: question.payload.options.map(option => (mapToLocale(option))),
    },
  }

  return (
    <section>
      <Question widget={widget}></Question>
    </section>
  );
}*/

