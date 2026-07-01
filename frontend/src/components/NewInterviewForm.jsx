function NewInterviewForm({
  interviewForm,
  setInterviewForm,
  handleGenerateInterview,
  loading,
  onCancel,
}) {
  return (
    <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">
          Create New Interview
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Configure your interview and let AI generate the questions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>

          <input
            type="text"
            placeholder="Frontend Developer"
            value={interviewForm.role}
            onChange={(e) =>
              setInterviewForm({
                ...interviewForm,
                role: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Difficulty
          </label>

          <select
            value={interviewForm.difficulty}
            onChange={(e) =>
              setInterviewForm({
                ...interviewForm,
                difficulty: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Number of Questions
        </label>

        <input
          type="number"
          min="1"
          max="20"
          value={interviewForm.number_of_questions}
          onChange={(e) =>
            setInterviewForm({
              ...interviewForm,
              number_of_questions: Number(e.target.value),
            })
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
        />

      </div>

      <div className="mt-8 flex gap-4">

        <button
          onClick={handleGenerateInterview}
          disabled={loading}
          className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Interview"}
        </button>

        <button
          onClick={onCancel}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default NewInterviewForm;