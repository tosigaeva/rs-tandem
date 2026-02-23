import * as React from 'react';

import { Button } from '@/components/ui/button';

type PrimaryButtonProperties = React.ComponentProps<typeof Button>;

export function PrimaryButton({ children, ...properties }: PrimaryButtonProperties) {
  return (
    <Button variant="default" {...properties}>
      {children}
    </Button>
  );
}
