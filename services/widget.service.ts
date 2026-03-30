import { getAllWidgets } from '@/api/widget.api';
import { WidgetAdminListItem } from '@/types/schemas/widget-schema';

export const WidgetService = {
  loadWidgetAdminList: (): Promise<{ data: WidgetAdminListItem[] | undefined; error?: string }> => {
    return getAllWidgets();
  },
};
