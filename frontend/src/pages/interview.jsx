import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function Interview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  async function loadInterview() {
    setPageLoading(true);
    setPageError("");

    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/interviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.completed) {
        navigate(`/interview/${id}/result`);
        return;
      }

      setInterview(response.data);
    } catch (error) {
      console.error(error);
      setPageError("Unable to load this interview.");
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    loadInterview();
  }, [id, navigate]);

  function saveCurrentAnswer() {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = currentAnswer;
    setAnswers(updatedAnswers);

    return updatedAnswers;
  }

  function handleNext() {
    const updatedAnswers = saveCurrentAnswer();

    if (currentQuestion < interview.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer(updatedAnswers[currentQuestion + 1] || "");
    }
  }

  function handlePrevious() {
    const updatedAnswers = saveCurrentAnswer();

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentAnswer(updatedAnswers[currentQuestion - 1] || "");
    }
  }

  async function handleSubmit() {
    setSubmitting(true);

    try {
      const updatedAnswers = saveCurrentAnswer();

      const token = localStorage.getItem("token");

      await api.post(
        `/interviews/${id}/submit`,
        {
          answers: updatedAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/interview/${id}/result`);
    } catch (error) {
      console.error(error);
      alert("Failed to submit interview.");
    } finally {
      setSubmitting(false);
    }
  }

  if (pageLoading) {
    return <LoadingState message="Loading interview..." />;
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

  const progress =
    ((currentQuestion + 1) / interview.questions.length) * 100;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-10">

        <div className="mb-8">

          <h1 className="text-3xl font-semibold text-slate-900">
            {interview.role}
          </h1>

          <p className="mt-2 text-slate-500">
            {interview.difficulty} • {interview.questions.length} Questions
          </p>

        </div>

        <div className="mb-10">

          <div className="mb-3 flex justify-between text-sm text-slate-600">
            <span>
              Question {currentQuestion + 1} of {interview.questions.length}
            </span>

            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-slate-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">
            Question {currentQuestion + 1}
          </h2>

          <p className="mt-6 whitespace-pre-wrap leading-8 text-slate-700">
            {interview.questions[currentQuestion]}
          </p>

          <textarea
            rows={10}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="mt-8 w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-slate-900"
          />

          <div className="mt-8 flex justify-between">

            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || submitting}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {currentQuestion === interview.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Evaluating..." : "Submit Interview"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={submitting}
                className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                Next
              </button>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}

export default Interview;