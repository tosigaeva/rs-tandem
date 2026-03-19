import { Suspense } from 'react';

import LibraryContent from './library-content';

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryContent />
    </Suspense>
  );
}
