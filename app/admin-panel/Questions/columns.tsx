'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';

import { LocaleStringTooltip } from '@/components/LocaleStringTooltip';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { LocaleStringSchema } from '@/types/schemas/locale-schemas';
import {
  BigOPayloadAnswer,
  BigOPayloadQuestion,
  CodeCompletionPayloadAnswer,
  CodeCompletionPayloadQuestion,
  FlipCardPayloadQuestion,
  QuizPayloadAnswer,
  QuizPayloadQuestion,
  TrueFalsePayloadAnswer,
  TrueFalsePayloadQuestion,
} from '@/types/schemas/question-payload-schema';
import {
  GeneralQuestion,
  QuestionAdminListItem,
  UniversalPayloadAnswerSchema,
  UniversalPayloadQuestionSchema,
} from '@/types/schemas/question-schemas';
import { WidgetType } from '@/types/widget';

type MetaProperties = {
  handleOpenDialog: (data?: GeneralQuestion) => void;
  confirmDelete: (ids: number[]) => void;
};

export function createColumns({ handleOpenDialog, confirmDelete }: MetaProperties) {
  const columns: ColumnDef<QuestionAdminListItem>[] = [
    {
      accessorKey: 'id',
      header: ({ table }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(value === true)}
            className="border-amber-700 bg-slate-50"
            onClick={(event) => event.stopPropagation()}
          />
          <span>ID</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-nowrap">
          <Checkbox
            className="border-amber-700 bg-slate-50"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(value === true)}
          />
          <span>{row.original.id}</span>
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
      cell: ({ row }) => (
        <div className="flex flex-col justify-start gap-1.5 align-top">
          {displayPayloadQuestion(row.original.payloadQuestion, row.original.widgetType)}
        </div>
      ),
    },
    {
      accessorKey: 'payloadAnswer',
      header: 'Payload Answer',
      cell: ({ row }) => (
        <div className="flex flex-col justify-start gap-1.5 align-top">
          {displayPayloadAnswer(row.original.payloadAnswer, row.original.widgetType)}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
    },
    {
      id: 'actions',
      header: ({ table }) => {
        const selectedRows = table.getSelectedRowModel().rows;
        const rowSelected = selectedRows.length > 0;

        return (
          <div className="flex w-full justify-end gap-2 py-2">
            <Button variant="success" disabled={rowSelected} onClick={() => handleOpenDialog()}>
              <PlusCircle className="h-4 w-4" />
              Add Question
            </Button>
            <Button
              variant="destructive"
              size="icon"
              disabled={!rowSelected}
              onClick={() => confirmDelete(selectedRows.map((row) => row.original.id))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row, table }) => {
        const isDisabled = table.getSelectedRowModel().rows.length > 0;

        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600 hover:text-blue-900"
              disabled={isDisabled}
              onClick={() => {
                handleOpenDialog(row.original);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              disabled={isDisabled}
              onClick={() => confirmDelete([row.original.id])}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return columns;
}

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
  }

  return <span className="text-red-500">Parse failed</span>;
};

const displayQuizPayloadQuestion = (question: QuizPayloadQuestion) => {
  return (
    <>
      <div className="flex justify-start gap-1">
        <span className="font-semibold text-slate-500">Q:</span>
        <LocaleStringTooltip data={question.question} />
      </div>
      <div className="mt-1 flex flex-wrap justify-start gap-2">
        {question.options.map((option, index) => (
          <LocaleStringTooltip
            data={option}
            key={index}
            className="rounded-sm border bg-slate-50 px-2 py-0.5 text-xs"
          />
        ))}
      </div>
    </>
  );
};

const displayTrueFalsePayloadQuestion = (question: TrueFalsePayloadQuestion) => {
  const explanation = LocaleStringSchema.safeParse(question.explanation);

  return (
    <>
      <div className="flex justify-start gap-1">
        <span className="font-semibold">Statement: </span>
        <LocaleStringTooltip data={question.statement} />
      </div>
      <div className="flex justify-start gap-1">
        <span className="font-semibold">Explanation: </span>
        {explanation.success && <LocaleStringTooltip data={explanation.data} />}
      </div>
    </>
  );
};

const displayCodeCompletionPayloadQuestion = (question: CodeCompletionPayloadQuestion) => {
  return (
    <>
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
        <p>{question.hints?.join(', ')}</p>
      </div>
    </>
  );
};

const displayFlipCardPayloadQuestion = (question: FlipCardPayloadQuestion) => {
  return (
    <>
      <div className="flex justify-start gap-1">
        <span>term: </span>
        <LocaleStringTooltip data={question.term} />
      </div>
      <div className="flex justify-start gap-1">
        <span>definition: </span>
        <LocaleStringTooltip data={question.definition} />
      </div>
    </>
  );
};

const displayBigOPayloadQuestion = (question: BigOPayloadQuestion) => {
  return (
    <>
      <div className="flex justify-start gap-1">
        <span>question: </span>
        <LocaleStringTooltip data={question.question} />
      </div>
      <div className="flex justify-start gap-1">
        <span>example: </span>
        <p>{question.codeExample}</p>
      </div>
    </>
  );
};

const displayPayloadAnswer = (answer: unknown, widgetString: string) => {
  const widgetType = Object.values(WidgetType).find((widget) => widget === widgetString);
  if (widgetType === undefined) return 'Could not match widgetType';

  if (widgetType === WidgetType.FlipCard) {
    return <p className="text-gray-500 italic">N/A</p>;
  }

  const parsed = UniversalPayloadAnswerSchema.safeParse({
    type: widgetType,
    data: answer,
  });

  if (parsed.success) {
    switch (parsed.data.type) {
      case WidgetType.Quiz: {
        return displayQuizPayloadAnswer(parsed.data.data);
      }
      case WidgetType.TrueFalse: {
        return displayTrueFalsePayloadAnswer(parsed.data.data);
      }
      case WidgetType.CodeCompletion: {
        return displayCodeCompletionPayloadAnswer(parsed.data.data);
      }
      case WidgetType.BigONotation: {
        return displayBigOPayloadAnswer(parsed.data.data);
      }
    }
  }

  return <span className="text-red-500">Parse failed</span>;
};

const displayQuizPayloadAnswer = (answer: QuizPayloadAnswer) => {
  return (
    <div className="flex justify-start gap-1">
      <span className="font-semibold">Cor. Id: </span>
      <p>{answer.correctIndex}</p>
    </div>
  );
};

const displayTrueFalsePayloadAnswer = (answer: TrueFalsePayloadAnswer) => {
  return (
    <>
      <div className="flex justify-start gap-1">
        <span className="font-semibold">Correct Value: </span>
        <p className={answer.correct ? 'text-green-600' : 'text-red-600'}>{answer.correct ? 'True' : 'False'}</p>
      </div>
    </>
  );
};

const displayCodeCompletionPayloadAnswer = (answer: CodeCompletionPayloadAnswer) => {
  return (
    <div className="flex justify-start gap-1">
      <span className="font-semibold">Answers: </span>
      <p>{answer.answers.join(' -> ')}</p>
    </div>
  );
};

const displayBigOPayloadAnswer = (answer: BigOPayloadAnswer) => {
  return (
    <div className="flex justify-start gap-1">
      <span className="font-semibold">Expected Complexity: </span>
      <code className="rounded-sm bg-slate-100 px-1">{answer.correctComplexity}</code>
    </div>
  );
};
