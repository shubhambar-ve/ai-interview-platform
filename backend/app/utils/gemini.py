from google import genai
import json

from app.core.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_questions(role: str, difficulty: str, number_of_questions: int):

    prompt = f"""
You are an expert technical interviewer.

Generate exactly {number_of_questions} interview questions.

Role: {role}
Difficulty: {difficulty}

Return ONLY a JSON array.

Example:

[
  "Question 1",
  "Question 2",
  "Question 3"
]

Do not include markdown.
Do not number the questions.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return json.loads(response.text)

def evaluate_interview(questions: list[str], answers: list[str], role: str, difficulty: str):
    interview_text = ""
    for i, (question, answer) in enumerate(zip(questions, answers), start=1):
        interview_text += f"""
Question {i}:
{question}

Candidate Answer:
{answer}

"""
    prompt = f"""
You are an expert technical interviewer.

Evaluate this interview.
Role: {role} 
Difficulty: {difficulty}

{interview_text}

For each question, provide:

- Score out of 10
- Feedback
- Correct answer

Finally give:

Overall score
Strengths
Weaknesses
Areas to improve.

return only JSON object.
Examlpe:
Example:

{{
  "overall_score": 8,
  "strengths": "...",
  "weaknesses": "...",
  "questions": [
    {{
      "score": 9,
      "feedback": "...",
      "ideal_answer": "..."
    }}
  ]
}}
"""
    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

    print("\n===== GEMINI RAW RESPONSE =====")
    print(response.text)
    print("===== END RESPONSE =====\n")

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.removeprefix("```json").strip()

    if text.endswith("```"):
        text = text.removesuffix("```").strip()

    return json.loads(text)