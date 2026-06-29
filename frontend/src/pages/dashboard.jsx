import { useState, useEffect } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [interviewForm, setInterviewForm] = useState({
    role: "",
    difficulty: "",
    number_of_questions: 5,
  });

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userResponse = await api.get(
          "/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(userResponse.data);

        const interviewsResponse = await api.get(
          "/interviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInterviews(interviewsResponse.data);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    }

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
      console.error("Error creating interview:", error);
      alert("Failed to generate interview.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1>Dashboard</h1>

      {user ? (
        <h2>Welcome, {user.name} 👋</h2>
      ) : (
        <p>Loading user...</p>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      <button
        onClick={() => setShowInterviewForm(!showInterviewForm)}
      >
        {showInterviewForm ? "Cancel" : "New Interview"}
      </button>

      {showInterviewForm && (
        <div style={{ marginTop: "20px" }}>
          <h2>Create New Interview</h2>

          <label>Role</label>

          <br />

          <input
            type="text"
            placeholder="Enter role"
            value={interviewForm.role}
            onChange={(e) =>
              setInterviewForm({
                ...interviewForm,
                role: e.target.value,
              })
            }
          />

          <br />
          <br />

          <label>Difficulty</label>

          <br />

          <select
            value={interviewForm.difficulty}
            onChange={(e) =>
              setInterviewForm({
                ...interviewForm,
                difficulty: e.target.value,
              })
            }
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <br />
          <br />

          <label>Number of Questions</label>

          <br />

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
          />

          <br />
          <br />

          <button
            onClick={handleGenerateInterview}
            disabled={loading}
          >
            {loading
              ? "Generating Interview..."
              : "Generate Interview"}
          </button>

          <hr />
        </div>
      )}

      <h2>My Interviews</h2>

      {interviews.length === 0 ? (
        <div
          style={{
            border: "1px dashed gray",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>No Interviews Yet</h3>

          <p>Create your first AI interview to begin practicing.</p>
        </div>
      ) : (
        <div>
          {interviews.map((interview) => (
            <div
              key={interview.id}
              onClick={() => {
                if (interview.completed) {
                  navigate(`/interview/${interview.id}/result`);
                } else {
                  navigate(`/interview/${interview.id}`);
                }
              }}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                cursor: "pointer",
              }}
            >
              <strong>{interview.role}</strong>

              <br />

              {interview.difficulty} •{" "}
              {interview.number_of_questions} Questions

              <br />

              <strong>Status:</strong>{" "}
              {interview.completed
                ? "Completed ✅"
                : "In Progress 🟡"}

              <br />

              <small>
                {new Date(
                  interview.created_at
                ).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;