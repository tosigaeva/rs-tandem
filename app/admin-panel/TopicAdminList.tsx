import { getTopics } from '@/api/topic.api';

export default function TopicAdminList() {
  getTopics().then((result) => console.log(result));

  return <div></div>;
}
