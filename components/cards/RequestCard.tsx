import Link from "next/link";
import { HelpRequest } from "@/lib/types";

type RequestCardProps = {
  request: HelpRequest;
};

const urgencyStyles = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

export function RequestCard({ request }: RequestCardProps) {
  return (
    <article className="panel p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`chip ${urgencyStyles[request.urgency]}`}>{request.urgency}</span>
        <span className="chip bg-[var(--surface-muted)] text-[var(--text)]">{request.category}</span>
        <span className="text-sm text-soft">{request.location}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{request.title}</h3>
      <p className="mt-3 text-sm leading-7 text-soft">{request.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {request.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-soft">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-sm text-soft">
          <p>{request.createdBy.name}</p>
          <p>{request.helpers.length} helpers interested</p>
        </div>
        <Link href={`/requests/${request._id}`} className="btn-secondary">
          View details
        </Link>
      </div>
    </article>
  );
}
