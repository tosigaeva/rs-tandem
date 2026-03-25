import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/DataTable';
import { TopicService } from '@/services/topic.service';
import { SchemaData } from '@/types/schemas/schema-registry';
import { Topic, TopicAdminListItem } from '@/types/schemas/topic-schema';

import { createColumns } from './columns';
import { TopicDialog } from './TopicDialog';

const handleSubmit = (data: SchemaData) => {
  console.log(data);
};

export default function TopicAdminList() {
  const [topics, setTopics] = useState<TopicAdminListItem[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isModalOpening = useRef(false);

  const handleOpenDialog = (data?: Topic) => {
    if (isModalOpening.current) return;

    isModalOpening.current = true;
    setSelectedTopic(data);
    setIsDialogOpen(true);

    setTimeout(() => {
      isModalOpening.current = false;
    }, 500);
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
          <DataTable columns={createColumns({ handleOpenDialog: handleOpenDialog })} data={topics} />
          <TopicDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            defaultValues={selectedTopic}
            onSubmit={handleSubmit}
          />
        </>
      )}
      {!isLoading && !topics && <div>Failed to load items</div>}
    </>
  );
}
