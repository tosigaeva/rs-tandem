import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/DataTable';
import { QuestionService } from '@/services/question.service';
import { QuestionAdminListItem } from '@/types/schemas/question-schemas';

import { columns } from './columns';

export default function QuestionAdminList() {
  const [questions, setQuestions] = useState<QuestionAdminListItem[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data, error } = await QuestionService.loadQuestionAdminList();

        if (error != undefined) {
          toast.error(error);
        }

        if (data != undefined) {
          setQuestions(data);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <>
      {isLoading && <div>Waiting for response from server...</div>}
      {!isLoading && questions && <DataTable columns={columns} data={questions}></DataTable>}
      {!isLoading && !questions && <div>Failed to load items</div>}
    </>
  );
}
