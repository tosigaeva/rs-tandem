'use client';
import { Suspense } from 'react';

import AuthContent from './auth-content';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
