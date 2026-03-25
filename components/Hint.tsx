'use client';

import dynamic from 'next/dynamic';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type HintProperties = {
  children: string;
};

function HintComponent({ children }: HintProperties) {
  return (
    <div className="m-2 flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="text-muted-foreground cursor-pointer text-sm">
            Hint
          </button>
        </PopoverTrigger>

        <PopoverContent side="bottom" className="px-2 py-1">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const Hint = dynamic(() => Promise.resolve(HintComponent), {
  ssr: false,
});
