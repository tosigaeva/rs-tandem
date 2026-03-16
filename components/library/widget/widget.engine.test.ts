jest.mock('@/components/library/widget/widget.config', () => ({
  widgetRegistry: {
    quiz: { default: 'asd' },
  },
}));

import { getWidgetComponent } from '@/components/library/widget/widget.engine';
import { WidgetType } from '@/types/widget';

describe('getWidgetComponent', () => {
  it('returns component for known widget type', () => {
    const component = getWidgetComponent(WidgetType.Quiz);
    expect(component).toBe('asd');
  });

  it('throws for unknown widget type', () => {
    expect(() => getWidgetComponent(WidgetType.TrueFalse)).toThrow('Unknown widget type');
  });
});
