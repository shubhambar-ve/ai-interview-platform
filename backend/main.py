from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import database

from app.routers.user import router as user_router
from app.routers.interview import router as interview_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://YOUR-VERCEL-APP.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Hello FastAPI"}

app.include_router(user_router)
app.include_router(interview_router)