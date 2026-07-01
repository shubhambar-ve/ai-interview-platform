function ErrorState({
  message = "Something went wrong.",
  buttonText = "Go Back",
  onClick,
}) {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

        <h2 className="text-xl font-semibold text-slate-900">
          Error
        </h2>

        <p className="mt-3 text-slate-600">
          {message}
        </p>

        {onClick && (
          <button
            onClick={onClick}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            {buttonText}
          </button>
        )}

      </div>
    </main>
  );
}

export default ErrorState;