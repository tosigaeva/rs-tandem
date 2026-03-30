type MetricProperties = {
  label: string;
  value: string | number;
};

export default function Metric({ label, value }: MetricProperties) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
