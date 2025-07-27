from pydantic import BaseModel, EmailStr, Field, validator
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
    # password: str
    pass


class DoctorUpdate(BaseModel):
    name: Optional[str]
    gender: Optional[Gender]
    department: Optional[DoctorDepartment]
    email: Optional[EmailStr]
    # password: Optional[str] = None
    phone: Optional[str] = Field(
        None, min_length=10, max_length=15)


class DoctorOut(DoctorBase):
    id: int
    hospital_id: int
    created_at: datetime
    updated_at: datetime

    @validator("phone", pre=True, always=True)
    def validate_phone(cls, v):
        if v is None or len(v) < 10:
            raise ValueError("Phone number must be at least 10 characters")
        return v

    class Config:
        from_attributes = True
# # schemas/hospital_admin.py
# from pydantic import BaseModel, EmailStr
# from typing import Optional

# class HospitalAdminCreate(BaseModel):
#     hospital_name: str
#     country: Optional[str]
#     pincode: Optional[str]

#     admin_name: str
#     email: EmailStr
    # password: str  # If you want to hash later
