from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from models import DoctorDepartment, Gender


class DoctorBase(BaseModel):
    name: str = Field(..., min_length=1)
    gender: Gender
    department: DoctorDepartment
    email: EmailStr
    phone: Optional[str] = Field(None, min_length=10, max_length=15)


class DoctorCreate(DoctorBase):
    pass


class DoctorUpdate(BaseModel):
    name: Optional[str]
    gender: Optional[Gender]
    department: Optional[DoctorDepartment]
    email: Optional[EmailStr]
    phone: Optional[str]


class DoctorOut(DoctorBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
