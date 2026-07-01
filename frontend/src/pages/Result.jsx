import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  async function loadResult() {
    setPageLoading(true);
    setPageError("");

    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/interviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInterview(response.data);
    } catch (error) {
      console.error(error);
      setPageError("Unable to load interview results.");
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    loadResult();
  }, [id]);

  if (pageLoading) {
    return <LoadingState message="Loading results..." />;
  }

  if (pageError) {
    return (
      <ErrorState
        message={pageError}
        buttonText="Back to Dashboard"
        onClick={() => navigate("/dashboard")}
      />
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Interview Results
          </h1>

          <p className="mt-2 text-slate-500">
            Review your performance and AI feedback.
          </p>

        </div>

        {/* Summary */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-2xl font-semibold text-slate-900">
                {interview.role}
              </h2>

              <p className="mt-2 text-slate-500">
                {interview.difficulty} • {interview.questions.length} Questions
              </p>

            </div>

            <div className="text-center">

              <p className="text-sm text-slate-500">
                Overall Score
              </p>

              <h2 className="mt-2 text-5xl font-bold text-slate-900">
                {interview.evaluation.overall_score}
                <span className="text-2xl text-slate-400">/10</span>
              </h2>

            </div>

          </div>

        </div>

        {/* Overall Feedback */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              Strengths
            </h3>

            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-600">
              {interview.evaluation.strengths}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              Weaknesses
            </h3>

            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-600">
              {interview.evaluation.weaknesses}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              Areas to Improve
            </h3>

            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-600">
              {interview.evaluation.areas_to_improve}
            </p>

          </div>

        </div>

        {/* Question Review */}

        <section className="mt-10">

          <h2 className="mb-6 text-2xl font-semibold text-slate-900">
            Question Review
          </h2>

          <div className="space-y-6">

            {interview.questions.map((question, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-6 flex items-center justify-between">

                  <h3 className="text-lg font-semibold text-slate-900">
                    Question {index + 1}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    Score {interview.evaluation.questions[index].score}/10
                  </span>

                </div>

                <div className="space-y-6">

                  <div>

                    <h4 className="mb-2 font-medium text-slate-900">
                      Question
                    </h4>

                    <p className="whitespace-pre-wrap leading-7 text-slate-600">
                      {question}
                    </p>

                  </div>

                  <div>

                    <h4 className="mb-2 font-medium text-slate-900">
                      Your Answer
                    </h4>

                    <p className="whitespace-pre-wrap leading-7 text-slate-600">
                      {interview.answers[index]}
                    </p>

                  </div>

                  <div>

                    <h4 className="mb-2 font-medium text-slate-900">
                      Feedback
                    </h4>

                    <p className="whitespace-pre-wrap leading-7 text-slate-600">
                      {interview.evaluation.questions[index].feedback}
                    </p>

                  </div>

                  <div>

                    <h4 className="mb-2 font-medium text-slate-900">
                      Ideal Answer
                    </h4>

                    <p className="whitespace-pre-wrap leading-7 text-slate-600">
                      {interview.evaluation.questions[index].ideal_answer}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

        <div className="mt-10">

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    </main>
  );
}

export default Result;