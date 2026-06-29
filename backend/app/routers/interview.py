from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.schemas import interview
from app.schemas.interview import InterviewCreate, InterviewResponse
from app.models.interview import Interview
from app.utils.auth import get_current_user
from app.models.user import User
from app.utils.gemini import generate_questions
from database import get_db
from app.utils.gemini import evaluate_interview


router = APIRouter()

@router.post("/interviews", response_model=interview.InterviewResponse)
def create_interview(
    interview: InterviewCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_interview = Interview(
    user_id=current_user.id,
    role=interview.role,
    difficulty=interview.difficulty,
    number_of_questions=interview.number_of_questions,

    questions=generate_questions(
        role=interview.role,
        difficulty=interview.difficulty,
        number_of_questions=interview.number_of_questions,
    ),

    answers=[],
    evaluation=None,
    completed=False,
)
    db.add(db_interview)
    db.commit()
    db.refresh(db_interview)
    return db_interview

@router.get("/interviews", response_model=list[InterviewResponse])
def get_interviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    interviews = db.query(Interview).filter(Interview.user_id == current_user.id).all()
    return interviews

@router.get("/interviews/{interview_id}", response_model=InterviewResponse)
def get_interview(
    interview_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    interview = db.query(Interview).filter(Interview.id == interview_id, Interview.user_id == current_user.id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Invalid interview ID or you do not have permission to access this interview.")
    return interview

@router.post("/interviews/{interview_id}/submit", response_model=InterviewResponse)
def submit_interview(
    interview_id: int,
    submission: interview.InterviewSubmission,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    interview = db.query(Interview).filter(Interview.id == interview_id, Interview.user_id == current_user.id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    interview.answers = submission.answers
    evaluation = evaluate_interview(
    questions=interview.questions,
    answers=interview.answers,
    role=interview.role,
    difficulty=interview.difficulty,
)
    interview.evaluation = evaluation
    interview.completed = True
    db.commit()
    db.refresh(interview)
    return interview