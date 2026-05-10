type DetailsRowProps = {
  label: string;
  value: string | number;
};

export const DetailsRow = ({ label, value }: DetailsRowProps) => {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="min-w-0 break-words font-medium text-slate-950">{value}</dd>
    </div>
  );
};
