import { useFormContext } from 'react-hook-form';

import { CustomArrayInput } from '@/components/CustomArrayInput';
import { CustomInput } from '@/components/CustomInput';
import { CustomSelect } from '@/components/CustomSelect';
import { LocaleInput } from '@/components/LocaleInput';
import { BigOComplexity } from '@/types/schemas/question-payload-schema';
import { WidgetType } from '@/types/widget';

export const PayloadFields = ({ widgetType }: { widgetType: WidgetType }) => {
  const { trigger } = useFormContext();
  const quizIndices = [1, 2, 3, 4];

  const renderQuizPayload = () => {
    return (
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-medium">Quiz Question Configuration</h3>
        <LocaleInput name={'payloadQuestion.question'} label={'Question'} />
        <h4 className="mb-2 font-semibold text-blue-600">Available Options</h4>
        {quizIndices.map((index) => (
          <div key={index} className="shadow-sm">
            <LocaleInput name={`payloadQuestion.options.${index - 1}`} label={`Option ${index} `} />
          </div>
        ))}
        <h3 className="text-sm font-medium">Quiz Answer Configuration</h3>
        <CustomInput name="payloadAnswer.correctIndex" label="Correct Option Index" type="number" />
      </div>
    );
  };

  const renderTrueFalsePayload = () => (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-sm font-medium">True-False Question Configuration</h3>
      <LocaleInput name={'payloadQuestion.statement'} label={'Statement'} />
      <LocaleInput name={'payloadQuestion.explanation'} label={'Explanation'} />
      <h3 className="text-sm font-medium">True-False Answer Configuration</h3>
      <CustomSelect<boolean>
        name="payloadAnswer.correct"
        label="Is this statement Correct?"
        options={[
          { label: 'True', value: true },
          { label: 'False', value: false },
        ]}
        onChange={{
          validator: (value) => value === 'true',
          act: () => {
            trigger();
          },
        }}
      />
    </div>
  );

  const renderCodeCompletionPayload = () => (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-sm font-medium">Code Completion Question Configuration</h3>
      <CustomInput name={'payloadQuestion.code'} label={'Code'} type={'text'} />
      <CustomArrayInput name={'payloadQuestion.blanks'} label={'Blanks'} type={'text'} />
      <CustomArrayInput name={'payloadQuestion.hints'} label={'Hints'} type={'text'} />
      <h3 className="text-sm font-medium">Code Completion Configuration</h3>
      <CustomArrayInput name={'payloadAnswer.correctOrder'} label={'Correct order'} type={'number'} />
    </div>
  );

  const renderFlipCardPayload = () => (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-sm font-medium">FlipCard Configuration</h3>
      <LocaleInput name={'payloadQuestion.term'} label={'Term'} />
      <LocaleInput name={'payloadQuestion.definition'} label={'Definition'} />
    </div>
  );

  const renderBigONotationPayload = () => (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-sm font-medium">Big O Question Configuration</h3>
      <LocaleInput name={'payloadQuestion.question'} label={'Question'} />
      <CustomInput name={'payloadQuestion.codeExample'} label={'Code example'} type={'text'} />
      <h3 className="text-sm font-medium">Big O Answer Configuration</h3>
      <CustomSelect<BigOComplexity>
        name="payloadAnswer.correctComplexity"
        label={'Correct Complexity'}
        options={Object.values(BigOComplexity).map((c) => ({
          value: c,
          label: c,
        }))}
      />
    </div>
  );

  switch (widgetType) {
    case WidgetType.Quiz: {
      return renderQuizPayload();
    }
    case WidgetType.TrueFalse: {
      return renderTrueFalsePayload();
    }
    case WidgetType.CodeCompletion: {
      return renderCodeCompletionPayload();
    }
    case WidgetType.FlipCard: {
      return renderFlipCardPayload();
    }
    case WidgetType.BigONotation: {
      return renderBigONotationPayload();
    }
    default: {
      return;
    }
  }
};
