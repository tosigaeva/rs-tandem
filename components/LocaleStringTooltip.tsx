import { cn } from '@/lib/utils';
import { LanguageCode } from '@/services/locale/locale.service';
import { LocaleString } from '@/types/schemas/locale-schemas';

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type LocaleStringTooltip = {
  data: LocaleString;
  className?: string;
};

const POP_UP_DELAY = 750;

export function LocaleStringTooltip({ data, className }: LocaleStringTooltip) {
  return (
    <Tooltip delayDuration={POP_UP_DELAY}>
      <TooltipTrigger asChild>
        <span
          className={cn(
            'inline-block max-w-62.5 cursor-help truncate underline decoration-dotted underline-offset-4',
            className
          )}
        >
          {data[LanguageCode.en]}
        </span>
      </TooltipTrigger>
      <TooltipContent className="p-3" align="center" side="top">
        <div className="flex flex-col gap-1.5">
          {Object.entries(data).map(([lang, value]) => (
            <div key={lang} className="text-xs leading-relaxed">
              <span className="text-muted-foreground mr-2 font-bold uppercase">{lang}:</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
