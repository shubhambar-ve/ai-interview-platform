import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom"

function Interview() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    async function loadInterview() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(
          `/interviews/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInterview(response.data);
        if (response.data.completed) {
          navigate(`/interview/${id}/result`);
          return;
        }
      } catch (error) {
        console.error("Error loading interview:", error);
      }
    }

    loadInterview();
  }, [id]);

  if (!interview) {
    return <p>Loading interview...</p>;
  }

  function handleNext() {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = currentAnswer;
    setAnswers(updatedAnswers);

    if (currentQuestion < interview.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer(updatedAnswers[currentQuestion + 1] || "");
    }
  }

  function handlePrevious() {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = currentAnswer;
    setAnswers(updatedAnswers);

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentAnswer(updatedAnswers[currentQuestion - 1] || "");
    }
  }

  async function handleSubmit() {
    setSubmitting(true);

    try {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion] = currentAnswer;
      setAnswers(updatedAnswers);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/interviews/${id}/submit",
        {
          answers: updatedAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      navigate(`/interview/${id}/result`);

      // Later we'll navigate to the results page here.
      // navigate(`/interview/${id}/result`);

    } catch (error) {
      console.error("Error submitting interview:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Interview</h1>

      <h2>{interview.role}</h2>

      <p>
        <strong>Difficulty:</strong> {interview.difficulty}
      </p>

      <hr />

      <h3>
        Question {currentQuestion + 1} of {interview.questions.length}
      </h3>

      <p>{interview.questions[currentQuestion]}</p>

      <textarea
        rows="8"
        cols="70"
        placeholder="Type your answer here..."
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={handlePrevious}
        disabled={currentQuestion === 0 || submitting}
      >
        Previous
      </button>

      {" "}

      {currentQuestion === interview.questions.length - 1 ? (
        <button
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Evaluating..." : "Submit Interview"}
        </button>
      ) : (
        <button
          onClick={handleNext}
          disabled={submitting}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Interview;