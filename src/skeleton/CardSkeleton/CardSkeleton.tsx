export const CardDataSkeleton = () => {
  return (
    <article className="w-full px-6 py-4.5 bg-erp-hover rounded-xl animate-pulse">
      <div className="flex justify-between items-center mb-4.5">
        <div className="w-12 h-12 rounded-lg bg-erp-brand-hover" />

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-erp-brand-hover" />
          <div className="w-12 h-4 rounded bg-erp-brand-hover" />
        </div>
      </div>

      <div>
        <div className="w-40 h-4 rounded bg-erp-brand-hover mb-3" />

        <div className="w-32 h-8 rounded bg-erp-brand-hover" />
      </div>
    </article>
  );
};
