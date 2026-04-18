type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  action?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, body, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {body ? <p className="max-w-2xl text-sm leading-7 text-soft">{body}</p> : null}
      </div>
      {action}
    </div>
  );
}
