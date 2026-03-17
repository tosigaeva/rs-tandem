import { WidgetType } from '@/types/widget';

export const mockWidgets = [
  {
    type: WidgetType.Quiz,
    title: 'Single Choice Quiz',
    description: 'Select the correct answer from the given options.',
    icon: 'Q',
  },
  {
    type: WidgetType.TrueFalse,
    title: 'True or False',
    description: 'Decide whether the given statement is true or false.',
    icon: 'T',
  },
  {
    type: WidgetType.CodeCompletion,
    title: 'Code Completion',
    description: 'Fill in the missing parts of the code.',
    icon: 'C',
  },
  {
    type: WidgetType.FlipCard,
    title: 'Flip Card',
    description: 'Flip the card to reveal the explanation.',
    icon: 'F',
  },
  {
    type: WidgetType.BigONotation,
    title: 'Big O Notation',
    description: 'Hover lines to see values and select the correct complexity.',
    icon: 'O',
  },
];
