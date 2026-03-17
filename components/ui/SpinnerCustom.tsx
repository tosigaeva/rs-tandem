import { LoaderIcon } from 'lucide-react';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return <LoaderIcon role="status" aria-label="Loading" className={cn('size-10 animate-spin', className)} {...props} />;
}

export function SpinnerCustom() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      data-testid="global-overlay-spinner"
      className="fixed z-20 flex h-full w-full items-center justify-center gap-4 bg-amber-100/30 backdrop-blur-sm"
    >
      <Spinner />
    </div>
  );
}
