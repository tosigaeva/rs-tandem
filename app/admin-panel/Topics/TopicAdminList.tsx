import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/DataTable';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteTopics, upsertTopic } from '@/data/topic.client';
import { TopicService } from '@/services/topic.service';
import { SchemaData } from '@/types/schemas/schema-registry';
import { Topic, TopicAdminListItem, TopicBaseSchema } from '@/types/schemas/topic-schema';

import { createColumns } from './columns';
import { TopicDialog } from './TopicDialog';

export default function TopicAdminList() {
  const [topics, setTopics] = useState<TopicAdminListItem[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);

  const isModalOpening = useRef(false);

  const handleOpenDialog = (data?: Topic) => {
    if (isModalOpening.current) return;

    isModalOpening.current = true;
    setSelectedTopic(data);
    setIsDialogOpen(true);

    setTimeout(() => {
      isModalOpening.current = false;
    }, 100);
  };

  const handleSubmit = async (formData: SchemaData) => {
    const parsed = TopicBaseSchema.omit({ created_at: true }).safeParse(formData);

    if (parsed.success) {
      const { data, error } = await upsertTopic(parsed.data).finally(() => setIsDialogOpen(false));

      if (error != undefined) {
        toast.error(error);
      }

      if (data) {
        if (parsed.data.id === 0) {
          setTopics((previous) => [data, ...(previous || [])]);
          toast.success('Added new topic');
        } else {
          setTopics((previous) => previous?.map((topic) => (topic.id === data.id ? data : topic)));
          toast.success('Updated existing topic');
        }
      }
    } else {
      toast.error('Failed to parse form data correctly');
    }
  };

  const confirmDelete = async (ids: number[]) => {
    if (ids.length === 0) return;

    setIdsToDelete(ids);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    const { error } = await deleteTopics(idsToDelete);

    if (error != undefined) {
      toast.error(error);

      return;
    }

    setTopics((previous) => previous?.filter((topic) => !idsToDelete.includes(topic.id)));
    toast.success(`Deleted ${idsToDelete.length} item(s)`);

    setIdsToDelete([]);
  };

  useEffect(() => {
    async function fetchTopics() {
      try {
        const { data, error } = await TopicService.loadTopicsAdminList();

        if (error != undefined) {
          toast.error(error);
        }

        if (data != undefined) {
          setTopics(data);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchTopics();
  }, []);

  return (
    <>
      {isLoading && <div>Waiting for response from server...</div>}
      {!isLoading && topics && (
        <>
          <DataTable columns={createColumns({ handleOpenDialog, confirmDelete })} data={topics} />
          <TopicDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            defaultValues={selectedTopic}
            onSubmit={handleSubmit}
          />
          <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {idsToDelete.length} Topics and related
                  questions from database
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
      {!isLoading && !topics && <div>Failed to load items</div>}
    </>
  );
}
