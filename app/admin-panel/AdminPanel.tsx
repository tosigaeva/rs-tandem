'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

enum AdminPanelTab {
  topics = 'topics',
  widgets = 'widgets',
  questions = 'questions',
}

export default function AdminPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const getCurrentTab = () => {
    const tabParameter = searchParameters.get('tab');

    const validTab = Object.values(AdminPanelTab).find((tab) => tab === tabParameter);

    return validTab ?? AdminPanelTab.topics;
  };

  const currentTab = getCurrentTab();

  const handleTabChange = (value: string) => {
    const parameters = new URLSearchParams(searchParameters);
    parameters.set('tab', value);
    router.push(`${pathname}?${parameters.toString()}`);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList variant="line" className="mx-auto mb-6 h-7 w-full justify-start border-b border-neutral-300 p-1">
        <TabsTrigger value="topics">Topics</TabsTrigger>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="widgets">Widgets</TabsTrigger>
      </TabsList>

      <TabsContent value="topics">
        {/* Your Topic CRUD component */}
        {/* <TopicAdminList /> */}
        Topics list
      </TabsContent>

      <TabsContent value="questions">
        {/* <QuestionAdminList /> */}
        Questions list
      </TabsContent>

      <TabsContent value="widgets">
        Widgets list
        {/* <WidgetAdminList /> */}
      </TabsContent>
    </Tabs>
  );
}
