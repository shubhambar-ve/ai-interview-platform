from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate
from app.models.user import User
from database import get_db
from app.schemas.user import UserResponse
from app.utils.security import hash_password
from app.schemas.user import UserLogin
from app.utils.security import verify_password
from app.utils.jwt import create_access_token
from app.utils.auth import get_current_user

router = APIRouter()


@router.post("/user")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )
    
    new_user = User(
        email=user.email,
        name=user.name,
        password_hash=hash_password(user.password)
    )
    

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created",
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    }

@router.get("/users", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return users


@router.get("/user/{id}", response_model=UserResponse)
def get_user(
    id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@router.put("/user/{id}", response_model=UserResponse)
def update_user(
        id: int,
        user: UserCreate,
        db: Session = Depends(get_db)
    ):
        update_user = db.query(User).filter(User.id == id).first()
        if update_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        update_user.name = user.name
        update_user.role = user.role
        db.commit()

        return update_user

@router.delete("/user/{id}")
def delete_user(
    id: int,
    db: Session = Depends(get_db)
):
    delete_user = db.query(User).filter(User.id == id).first()
    if delete_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(delete_user)
    db.commit()

    return {"message": "User deleted"}

@router.post("/login")
def login(
     user: UserLogin,
     db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(str(db_user.id))
    
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user)
):
    return current_user