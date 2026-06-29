import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Result() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadResult() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://127.0.0.1:8000/interviews/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInterview(response.data);
      } catch (error) {
        console.error("Error loading result:", error);
      }
    }

    loadResult();
  }, [id]);

  if (!interview) {
    return <p>Loading result...</p>;
  }

  return (
  <div
    style={{
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial",
    }}
  >
    <h1>Interview Results</h1>

    <hr />

    <h2>{interview.role}</h2>

    <p>
      <strong>Difficulty:</strong> {interview.difficulty}
    </p>

    <p>
      <strong>Status:</strong>{" "}
      {interview.completed ? "Completed ✅" : "Pending"}
    </p>

    <hr />

    <h2>
      Overall Score: {interview.evaluation.overall_score}/10
    </h2>

    <h3>Strengths</h3>
    <p>{interview.evaluation.strengths}</p>

    <h3>Weaknesses</h3>
    <p>{interview.evaluation.weaknesses}</p>

    <h3>Areas to Improve</h3>
    <p>{interview.evaluation.areas_to_improve}</p>

    <hr />

    <h2>Question Evaluation</h2>

    {interview.questions.map((question, index) => (
      <div
        key={index}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h3>Question {index + 1}</h3>

        <p>
          <strong>Question:</strong>
        </p>

        <p>{question}</p>

        <p>
          <strong>Your Answer:</strong>
        </p>

        <p>{interview.answers[index]}</p>

        <p>
          <strong>Score:</strong>{" "}
          {interview.evaluation.questions[index].score}/10
        </p>

        <p>
          <strong>Feedback:</strong>
        </p>

        <p>{interview.evaluation.questions[index].feedback}</p>

        <p>
          <strong>Ideal Answer:</strong>
        </p>

        <p>{interview.evaluation.questions[index].ideal_answer}</p>
      </div>
    ))}

    <button onClick={() => navigate("/dashboard")}>
      Back to Dashboard
    </button>
  </div>
);
}

export default Result;