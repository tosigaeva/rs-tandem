'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CustomInput } from '@/components/CustomInput';
import { CustomSelect } from '@/components/CustomSelect';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  BigOQuestion,
  BigOQuestionSchema,
  BlankQuestion,
  CodeCompletionQuestion,
  CodeCompletionQuestionSchema,
  FlipCardQuestion,
  FlipCardQuestionSchema,
  QuizQuestion,
  QuizQuestionSchema,
  TrueFalseQuestion,
  TrueFalseQuestionSchema,
} from '@/types/schemas/question-schemas';
import { WidgetType } from '@/types/widget';

import { PayloadFields } from './PayloadFields';

export type FullQuestion = QuizQuestion | TrueFalseQuestion | CodeCompletionQuestion | FlipCardQuestion | BigOQuestion;

type QuestionDialogProperties = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FullQuestion) => void;
  defaultValues?: BlankQuestion;
  topics: { id: number; name: string }[];
};

export const QuestionDialog = ({ open, onOpenChange, onSubmit, defaultValues, topics }: QuestionDialogProperties) => {
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>(defaultValues?.widgetType ?? WidgetType.Quiz);
  const [previousId, setPreviousId] = useState<number | undefined>(defaultValues?.id);
  const activeSchema = useMemo(() => {
    const schemaMap = {
      [WidgetType.Quiz]: QuizQuestionSchema,
      [WidgetType.TrueFalse]: TrueFalseQuestionSchema,
      [WidgetType.CodeCompletion]: CodeCompletionQuestionSchema,
      [WidgetType.FlipCard]: FlipCardQuestionSchema,
      [WidgetType.BigONotation]: BigOQuestionSchema,
    };
    return schemaMap[selectedWidget];
  }, [selectedWidget]);

  const id = 'question-form';
  const formKey = defaultValues?.id ?? 'new';
  const newMode = defaultValues?.id === 0;

  if (defaultValues != undefined && defaultValues.id != previousId) {
    setPreviousId(defaultValues.id);
    setSelectedWidget(defaultValues.widgetType);
  }

  const methods = useForm<FullQuestion>({
    resolver: zodResolver(activeSchema),
    defaultValues,
  });

  const onInternalSubmit = (data: FullQuestion) => {
    onSubmit(data);
  };

  const {
    trigger,
    clearErrors,
    resetField,
    reset,
    formState: { isValid, errors },
  } = methods;

  useEffect(() => {
    clearErrors();

    resetField('payloadQuestion');
    resetField('payloadAnswer');
    trigger();
  }, [selectedWidget, clearErrors, resetField, trigger]);

  useEffect(() => {
    if (open && defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, open]);

  useEffect(() => {
    console.log(isValid);
    Object.values(errors).forEach((error) => console.log(error));
  }, [isValid, errors]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} key={formKey}>
      <DialogContent key={formKey} className="flex max-h-[90%] flex-col sm:max-w-150">
        <DialogHeader className="border-b-2 pb-4">
          <DialogTitle>
            <DialogDescription className="hidden">
              {newMode ? 'Add New Topic' : `Edit Question with ID: ${defaultValues?.id}`}
            </DialogDescription>
            {newMode ? 'Add New Topic' : `Edit Question with ID: ${defaultValues?.id}`}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-auto px-4">
          <FormProvider {...methods}>
            <form id={id} className="w-full" onSubmit={methods.handleSubmit(onInternalSubmit)}>
              <div className={cn('mb-2 grid w-full grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2')}>
                <CustomInput name="id" label="Question ID" type={'number'} disabled={true} />
                <CustomSelect<number>
                  name="topicId"
                  label="Topic"
                  options={topics.map((pair) => ({ label: pair.name, value: pair.id }))}
                  disabled={!newMode}
                />
                <CustomSelect<WidgetType>
                  name="widgetType"
                  label="Widget Type"
                  options={Object.values(WidgetType).map((type) => ({ label: type, value: type }))}
                  disabled={!newMode}
                  onChange={{
                    validator: (value) => Object.values(WidgetType).find((type) => type == value),
                    act: (value) => {
                      console.log('acting');
                      return setSelectedWidget(value);
                    },
                  }}
                />
                <div className="col-span-2">
                  <PayloadFields widgetType={selectedWidget} />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
        <Button variant="success" form={id} type="submit" disabled={!isValid}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};
