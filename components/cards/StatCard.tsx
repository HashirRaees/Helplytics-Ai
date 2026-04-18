type StatCardProps = {
  label: string;
  value: string | number;
  meta: string;
};

export function StatCard({ label, value, meta }: StatCardProps) {
  return (
    <div className="panel p-5">
      <p className="text-sm font-medium text-soft">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-soft">{meta}</p>
    </div>
  );
}
