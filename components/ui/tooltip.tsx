'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const tooltipContentVariants = cva(
  'animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background [&_[data-slot=tooltip-arrow]]:bg-foreground [&_[data-slot=tooltip-arrow]]:fill-foreground',
        secondary:
          'bg-secondary text-secondary-foreground [&_[data-slot=tooltip-arrow]]:bg-secondary [&_[data-slot=tooltip-arrow]]:fill-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  variant,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & VariantProps<typeof tooltipContentVariants>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants({ variant }), className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          data-slot="tooltip-arrow"
          className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
