export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-6 animate-pulse">
      <div className="h-4 w-3/4 rounded-full bg-neutral-200" />
      <div className="flex gap-1.5">
        <div className="h-5 w-16 rounded-full bg-neutral-200" />
        <div className="h-5 w-12 rounded-full bg-neutral-200" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-neutral-200" />
        <div className="h-3 w-5/6 rounded-full bg-neutral-200" />
        <div className="h-3 w-4/6 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}