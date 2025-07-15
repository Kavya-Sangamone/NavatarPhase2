from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class hospitalBase(BaseModel):
    hospital_name: str
    country: str
    pincode: str

class hospitalCreate(hospitalBase):
    pass

class hospitalOut(hospitalBase):
    hospital_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # for Pydantic v2
