from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class AdminBase(BaseModel):
    admin_name: str
    hospital_id: int
    email: EmailStr

class AdminCreate(AdminBase):
    pass

class AdminOut(AdminBase):
    admin_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2
