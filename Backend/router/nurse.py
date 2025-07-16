# routers/nurse.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.nurse import NurseCreate, NurseUpdate, NurseOut
from typing import List

import crud.nurse as nurse_crud

router = APIRouter()

@router.post("/doctors/{doctor_id}/nurses", response_model=NurseOut)
def create_nurse(doctor_id: int, nurse: NurseCreate, db: Session = Depends(get_db)):
    return nurse_crud.create_nurse(db, doctor_id, nurse)

@router.get("/doctors/{doctor_id}/nurses", response_model=List[NurseOut])
def list_nurses(doctor_id: int, db: Session = Depends(get_db)):
    return nurse_crud.list_nurses_for_doctor(db, doctor_id)

@router.get("/nurses/{nurse_id}", response_model=NurseOut)
def get_nurse(nurse_id: int, db: Session = Depends(get_db)):
    return nurse_crud.get_nurse(db, nurse_id)

@router.put("/nurses/{nurse_id}", response_model=NurseOut)
def update_nurse(nurse_id: int, updates: NurseUpdate, db: Session = Depends(get_db)):
    return nurse_crud.update_nurse(db, nurse_id, updates)

@router.delete("/nurses/{nurse_id}")
def delete_nurse(nurse_id: int, db: Session = Depends(get_db)):
    return nurse_crud.delete_nurse(db, nurse_id)
