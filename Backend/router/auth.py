from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.orm import Session
import requests as ext_requests
from database import get_db
from models import Admin

router = APIRouter()

@router.post("/auth/verify-token")
async def verify_google_token(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    token = body.get("access_token")

    if not token:
        raise HTTPException(status_code=400, detail="Missing token")

    try:
        # Use Google User Info API to get profile
        response = ext_requests.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            params={"alt": "json"},
            headers={"Authorization": f"Bearer {token}"}
        )

        if response.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid access token")

        profile = response.json()
        email = profile.get("email")
        

        # Match with admin table
        admin = db.query(Admin).filter(Admin.email == email).first()
        if not admin:
            raise HTTPException(status_code=403, detail="Email not authorized")

        return {
            "email": admin.email,
            "hospital_id": admin.hospital_id,
            
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
