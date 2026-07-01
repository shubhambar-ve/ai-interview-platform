function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <h2 className="text-xl font-semibold text-slate-900">
        No interviews yet
      </h2>

      <p className="mt-3 text-slate-500">
        Create your first AI interview to begin practicing.
      </p>
    </div>
  );
}

export default EmptyState;