function LoadingState({ message = "Loading..." }) {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-6">
      <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />

        <p className="text-slate-600">{message}</p>
      </div>
    </main>
  );
}

export default LoadingState;