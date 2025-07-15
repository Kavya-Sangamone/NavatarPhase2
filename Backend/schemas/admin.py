from pydantic import BaseModel, EmailStr
from typing import Optional

# /c:/NavatarPhase2/Backend/schemas/admin.py


class AdminBase(BaseModel):
    username: str
    email: EmailStr
    is_active: Optional[bool] = True

class AdminCreate(AdminBase):
    password: str

class AdminUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None

class AdminOut(AdminBase):
    id: int

    class Config:
        orm_mode = True