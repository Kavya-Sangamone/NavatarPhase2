from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Nurse, Doctor
from schemas.nurse import *
from database import get_db

router = APIRouter()


@router.post("/doctors/{doctor_id}/nurses", response_model=NurseOut)
def create_nurse(doctor_id: int, nurse: NurseCreate, db: Session = Depends(get_db)):
    if not db.query(Doctor).get(doctor_id):
        raise HTTPException(status_code=404, detail="Doctor not found")
    db_nurse = Nurse(**nurse.dict(), doctor_id=doctor_id)
    db.add(db_nurse)
    db.commit()
    db.refresh(db_nurse)
    return db_nurse


@router.get("/doctors/{doctor_id}/nurses", response_model=List[NurseOut])
def list_nurses(doctor_id: int, db: Session = Depends(get_db)):
    return db.query(Nurse).filter(Nurse.doctor_id == doctor_id).all()


@router.get("/nurses/{nurse_id}", response_model=NurseOut)
def get_nurse(nurse_id: int, db: Session = Depends(get_db)):
    nurse = db.query(Nurse).get(nurse_id)
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    return nurse


@router.put("/nurses/{nurse_id}", response_model=NurseOut)
def update_nurse(nurse_id: int, updates: NurseUpdate, db: Session = Depends(get_db)):
    nurse = db.query(Nurse).get(nurse_id)
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(nurse, field, value)
    db.commit()
    db.refresh(nurse)
    return nurse


@router.delete("/nurses/{nurse_id}")
def delete_nurse(nurse_id: int, db: Session = Depends(get_db)):
    nurse = db.query(Nurse).get(nurse_id)
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    db.delete(nurse)
    db.commit()
    return {"message": "Nurse deleted"}
