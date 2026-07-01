import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

import InterviewCard from "../components/InterviewCard";
import NewInterviewForm from "../components/NewInterviewForm";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [showInterviewForm, setShowInterviewForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [interviewForm, setInterviewForm] = useState({
    role: "",
    difficulty: "",
    number_of_questions: 5,
  });

  async function loadDashboard() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setPageLoading(true);
    setPageError("");

    try {
      const userResponse = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userResponse.data);

      const interviewsResponse = await api.get("/interviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInterviews(interviewsResponse.data);
    } catch (error) {
      console.error(error);
      setPageError("Unable to load your dashboard.");
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, [navigate]);

  async function handleGenerateInterview() {
    if (
      interviewForm.role.trim() === "" ||
      interviewForm.difficulty.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/interviews",
        interviewForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/interview/${response.data.id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate interview.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (pageError) {
    return (
      <ErrorState
        message={pageError}
        buttonText="Try Again"
        onClick={loadDashboard}
      />
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Welcome, {user.name}
            </h1>

            <p className="mt-2 text-slate-500">
              Create new interviews and review your previous sessions.
            </p>
          </div>

          {!showInterviewForm && (
            <button
              onClick={() => setShowInterviewForm(true)}
              className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              New Interview
            </button>
          )}

        </div>

        {showInterviewForm && (
          <NewInterviewForm
            interviewForm={interviewForm}
            setInterviewForm={setInterviewForm}
            handleGenerateInterview={handleGenerateInterview}
            loading={loading}
            onCancel={() => setShowInterviewForm(false)}
          />
        )}

        <section>

          <h2 className="mb-6 text-xl font-semibold text-slate-900">
            Interview History
          </h2>

          {interviews.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-5">
              {interviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                />
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default Dashboard;