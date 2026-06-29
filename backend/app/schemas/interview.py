from pydantic import BaseModel, ConfigDict
from datetime import datetime

class InterviewCreate(BaseModel):
    role: str
    difficulty: str
    number_of_questions: int

class InterviewResponse(BaseModel):
    id: int
    role: str
    difficulty: str
    number_of_questions: int
    questions: list
    answers: list
    evaluation: dict | None
    completed: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class InterviewSubmission(BaseModel):
    answers: list[str]