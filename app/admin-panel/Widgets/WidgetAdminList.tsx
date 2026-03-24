import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/DataTable';
import { WidgetService } from '@/services/widget.service';
import { WidgetAdminListItem } from '@/types/schemas/widget-schema';

import { columns } from './columns';

export default function TopicAdminList() {
  const [widgets, setWidgets] = useState<WidgetAdminListItem[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWidgets() {
      try {
        const { data, error } = await WidgetService.loadWidgetAdminList();

        if (error != undefined) {
          toast.error(error);
        }

        if (data != undefined) {
          setWidgets(data);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchWidgets();
  }, []);

  return (
    <>
      {isLoading && <div>Waiting for response from server...</div>}
      {!isLoading && widgets && <DataTable columns={columns} data={widgets}></DataTable>}
      {!isLoading && !widgets && <div>Failed to load items</div>}
    </>
  );
}
