from jose import jwt
from datetime import datetime, timedelta
from jose.exceptions import ExpiredSignatureError, JWTError


from app.core.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

def create_access_token(subject: str):
    expire = datetime.utcnow() + timedelta(
    minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
    "sub": subject,
    "exp": expire
    }
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise JWTError("Invalid token")
        return user_id
    except ExpiredSignatureError:
        raise JWTError("Token has expired")