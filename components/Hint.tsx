'use client';

import dynamic from 'next/dynamic';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslation } from '@/hooks/use-translation';

type HintProperties = {
  children: string;
};

function HintComponent({ children }: HintProperties) {
  const { t } = useTranslation();

  return (
    <div className="m-2 flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="text-muted-foreground cursor-pointer text-sm">
            {t('button.hint')}
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
