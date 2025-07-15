from pydantic import BaseModel
from typing import List, Optional


class NurseBase(BaseModel):
    nurse_name: str


class NurseCreate(NurseBase):
    pass


class NurseUpdate(BaseModel):
    nurse_name: Optional[str]


class NurseOut(NurseBase):
    nurse_id: int
    doctor_id: int

    class Config:
        from_attributes = True
