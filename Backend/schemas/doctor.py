# schemas/doctor.py

from pydantic import BaseModel
from typing import List, Optional


class DoctorBase(BaseModel):
    doctor_name: str
    specialization: str


class DoctorCreate(DoctorBase):
    pass


class DoctorUpdate(BaseModel):
    doctor_name: Optional[str]
    specialization: Optional[str]


class DoctorOut(DoctorBase):
    doctor_id: int
    hospital_id: int

    class Config:
        from_attributes = True
