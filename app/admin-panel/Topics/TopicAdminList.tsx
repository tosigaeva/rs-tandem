import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/DataTable';
import { TopicService } from '@/services/topic.service';
import { TopicAdminListItem } from '@/types/schemas/topic-schema';

import { columns } from './columns';

export default function TopicAdminList() {
  const [topics, setTopics] = useState<TopicAdminListItem[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

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
      {!isLoading && topics && <DataTable columns={columns} data={topics}></DataTable>}
      {!isLoading && !topics && <div>Failed to load items</div>}
    </>
  );
}
