from sqlalchemy import JSON, ForeignKey, Integer, String, DateTime, Text, Boolean
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base



class Interview(Base):
    __tablename__ = "interviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    role: Mapped[str] = mapped_column(String)
    difficulty: Mapped[str] = mapped_column(String)
    number_of_questions: Mapped[int] = mapped_column(Integer)
    questions: Mapped[list] = mapped_column(JSON) 
    answers: Mapped[list] = mapped_column(JSON, default=list)
    evaluation: Mapped[dict|None] = mapped_column(JSON, nullable=True)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
     