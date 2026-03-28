import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/DataTable';
import { updateWidget } from '@/data/widget.api';
import { WidgetService } from '@/services/widget.service';
import { SchemaData } from '@/types/schemas/schema-registry';
import { Widget, WidgetAdminListItem, WidgetBaseSchema } from '@/types/schemas/widget-schema';

import { createColumns } from './columns';
import { WidgetDialog } from './WidgetDialog';

export default function TopicAdminList() {
  const [widgets, setWidgets] = useState<WidgetAdminListItem[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWidget, setSelectedWidget] = useState<Widget | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isModalOpening = useRef(false);

  const handleOpenDialog = (data: Widget) => {
    if (isModalOpening.current) return;

    isModalOpening.current = true;
    setSelectedWidget(data);
    setIsDialogOpen(true);

    setTimeout(() => {
      isModalOpening.current = false;
    }, 100);
  };

  const handleSubmit = async (formData: SchemaData) => {
    console.log('handle submit');

    const parsed = WidgetBaseSchema.omit({ created_at: true }).safeParse(formData);

    if (parsed.success) {
      const { data, error } = await updateWidget(parsed.data).finally(() => setIsDialogOpen(false));

      if (error != undefined) {
        toast.error(error);
      }

      if (data) {
        setWidgets((previous) =>
          previous?.map((widget) =>
            widget.type === data.type ? { ...data, sumQuestions: widget.sumQuestions } : widget
          )
        );
        toast.success('Updated existing topic');
      }
    } else {
      toast.error('Failed to parse form data correctly');
    }
  };

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
      <>
        {!isLoading && widgets && <DataTable columns={createColumns({ handleOpenDialog })} data={widgets}></DataTable>}
        <WidgetDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          defaultValues={selectedWidget}
          onSubmit={handleSubmit}
        ></WidgetDialog>
      </>
      {!isLoading && !widgets && <div>Failed to load items</div>}
    </>
  );
}
