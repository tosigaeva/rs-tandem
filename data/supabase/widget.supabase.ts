import { supabaseServer } from '@/lib/supabase/server';
import { getServerLanguageCode } from '@/services/locale/locale.server';
import { Widget, WidgetType } from '@/types/widget';

type WidgetRow = {
  widget_type: WidgetType;
  widgets: {
    name: Record<string, string>;
    description: Record<string, string>;
    icon: string;
  };
};

export async function getWidgets(topicId: string): Promise<Widget[]> {
  const supabase = await supabaseServer();
  const languageCode = await getServerLanguageCode();

  const query = supabase
    .from('topic_widgets')
    .select(
      `
    widget_type,
    widgets (
      name,
      description,
      icon
    )
  `
    )
    .eq('topic_id', topicId);

  const { data, error } = await query.overrideTypes<WidgetRow[]>();
  if (error) {
    throw error;
  }

  if (data === null) {
    return [];
  }

  return data.map((q) => ({
    type: q.widget_type,
    title: q.widgets.name[languageCode],
    description: q.widgets.description[languageCode],
    icon: q.widgets.icon,
  }));
}
