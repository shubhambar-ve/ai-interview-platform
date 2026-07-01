import { useNavigate } from "react-router-dom";

function InterviewCard({ interview }) {
  const navigate = useNavigate();

  function handleClick() {
    if (interview.completed) {
      navigate(`/interview/${interview.id}/result`);
    } else {
      navigate(`/interview/${interview.id}`);
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {interview.role}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {interview.difficulty} • {interview.number_of_questions} Questions
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            interview.completed
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {interview.completed ? "Completed" : "In Progress"}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <span>
          {new Date(interview.created_at).toLocaleDateString()}
        </span>

        <span className="font-medium text-slate-900">
          View →
        </span>
      </div>
    </button>
  );
}

export default InterviewCard;