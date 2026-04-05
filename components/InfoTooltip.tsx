'use client';

import { ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type IconTooltipProperties = {
  trigger: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'default' | 'secondary';
  className?: string;
};

export function InfoTooltip({
  trigger,
  children,
  side = 'top',
  variant = 'default',
  className,
}: IconTooltipProperties) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent side={side} variant={variant} className={className}>
        {children}
      </TooltipContent>
    </Tooltip>
  );
}
