'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';

import { LocaleStringTooltip } from '@/components/LocaleStringTooltip';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  BigOPayloadQuestion,
  CodeCompletionPayloadQuestion,
  FlipCardPayloadQuestion,
  QuestionAdminListItem,
  QuizPayloadQuestion,
  TrueFalsePayloadQuestion,
  UniversalPayloadQuestionSchema,
} from '@/types/schemas/question-schemas';
import { WidgetType } from '@/types/widget';

export const columns: ColumnDef<QuestionAdminListItem>[] = [
  {
    accessorKey: 'id',
    header: ({ table }) => (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(value === true)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-nowrap">
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(value === true)} />
      </div>
    ),
  },
  {
    accessorKey: 'widgetType',
    header: 'Widget Type',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-nowrap">
        <span>{row.original.widgetType}</span>
      </div>
    ),
  },
  {
    accessorKey: 'topicName',
    header: 'Topic Name (EN)',
    cell: ({ row }) => <LocaleStringTooltip data={row.original.topicName} />,
  },
  {
    accessorKey: 'payloadQuestion',
    header: 'Payload Question',
    cell: ({ row }) => displayPayloadQuestion(row.original.payloadQuestion, row.original.widgetType),
  },
  {
    accessorKey: 'payloadAnswer',
    header: 'Payload Answer',
    cell: 'placeholder',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
  },
  {
    id: 'actions',
    header: ({ table }) => {
      const rowSelected = table.getSelectedRowModel().rows.length > 0;

      return (
        <div className="flex justify-end gap-2 py-2">
          <Button variant="success" disabled={rowSelected}>
            <PlusCircle className="h-4 w-4" />
            Add Question
          </Button>
          <Button variant="destructive" size="icon" disabled={!rowSelected}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ table }) => {
      const isDisabled = table.getSelectedRowModel().rows.length > 0;

      return (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-900" disabled={isDisabled}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled={isDisabled}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

const displayPayloadQuestion = (question: unknown, widgetString: string) => {
  const widgetType = Object.values(WidgetType).find((widget) => widget === widgetString);
  if (widgetType == undefined) return 'Could not match widgetType';

  const parsed = UniversalPayloadQuestionSchema.safeParse({
    type: widgetType,
    data: question,
  });

  if (parsed.success) {
    switch (parsed.data.type) {
      case WidgetType.Quiz: {
        return displayQuizPayloadQuestion(parsed.data.data);
      }
      case WidgetType.TrueFalse: {
        return displayTrueFalsePayloadQuestion(parsed.data.data);
      }
      case WidgetType.CodeCompletion: {
        return displayCodeCompletionPayloadQuestion(parsed.data.data);
      }
      case WidgetType.FlipCard: {
        return displayFlipCardPayloadQuestion(parsed.data.data);
      }
      case WidgetType.BigONotation: {
        return displayBigOPayloadQuestion(parsed.data.data);
      }
    }
  } else if (!parsed.success) {
    return 'parse failed';
  }

  return 'placeholder';
};

const displayQuizPayloadQuestion = (question: QuizPayloadQuestion) => {
  return (
    <div className="flex flex-col justify-start gap-1.5 align-top">
      <div>
        <span>question: </span>
        <LocaleStringTooltip data={question.question} />
      </div>
      <p>{question.options.join(', ')}</p>
    </div>
  );
};

const displayTrueFalsePayloadQuestion = (question: TrueFalsePayloadQuestion) => {
  return (
    <div className="flex flex-col justify-start gap-1.5 align-top">
      <div className="flex justify-start gap-1">
        <span>statement: </span>
        <LocaleStringTooltip data={question.statement} />
      </div>
    </div>
  );
};

const displayCodeCompletionPayloadQuestion = (question: CodeCompletionPayloadQuestion) => {
  return (
    <div className="flex flex-col justify-start gap-1.5 align-top">
      <div className="flex justify-start gap-1">
        <span>code: </span>
        <p>{question.code}</p>
      </div>
      <div className="flex justify-start gap-1">
        <span>blanks: </span>
        <p>{question.blanks.join(', ')}</p>
      </div>
      <div className="flex justify-start gap-1">
        <span>hints: </span>
        <p>{question.hints.join(', ')}</p>
      </div>
    </div>
  );
};

const displayFlipCardPayloadQuestion = (question: FlipCardPayloadQuestion) => {
  return (
    <div className="flex flex-col justify-start gap-1.5 align-top">
      <div className="flex justify-start gap-1">
        <span>term: </span>
        <p>{question.term}</p>
      </div>
      <div className="flex justify-start gap-1">
        <span>definition: </span>
        <p>{question.definition}</p>
      </div>
    </div>
  );
};

const displayBigOPayloadQuestion = (question: BigOPayloadQuestion) => {
  return (
    <div className="flex flex-col justify-start gap-1.5 align-top">
      <div className="flex justify-start gap-1">
        <span>question: </span>
        <LocaleStringTooltip data={question.question} />
      </div>
      <div className="flex justify-start gap-1">
        <span>example: </span>
        <p>{question.codeExample}</p>
      </div>
    </div>
  );
};
