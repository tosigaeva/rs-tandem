import { Suspense } from 'react';

import AdminPanel from './AdminPanel';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Panel...</div>}>
      <AdminPanel />
    </Suspense>
  );
}
