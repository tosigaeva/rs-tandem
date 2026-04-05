import { Info } from 'lucide-react';

type InfoBoxProperties = {
  title: string;
  description: string;
};

export default function InfoBox({ title, description }: InfoBoxProperties) {
  return (
    <div className="border-border/60 bg-muted/40 text-muted-foreground mt-4 flex flex-col gap-3 rounded-lg border px-3 py-2 text-xs">
      <div className="text-foreground/70 mb-1 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
        <Info className="text-primary h-4 w-4" />
        {title}
      </div>
      <div className="leading-5">{description}</div>
    </div>
  );
}
