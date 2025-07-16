# crud/nurse.py
from sqlalchemy.orm import Session
from models import Nurse, Doctor
from schemas.nurse import NurseCreate, NurseUpdate
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError

def create_nurse(db: Session, doctor_id: int, nurse: NurseCreate):
    if not db.query(Doctor).get(doctor_id):
        raise HTTPException(status_code=404, detail="Doctor not found")
    db_nurse = Nurse(**nurse.dict(), doctor_id=doctor_id)
    db.add(db_nurse)
    db.commit()
    db.refresh(db_nurse)
    return db_nurse

def get_nurse(db: Session, nurse_id: int):
    nurse = db.query(Nurse).get(nurse_id)
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    return nurse

def list_nurses_for_doctor(db: Session, doctor_id: int):
    return db.query(Nurse).filter(Nurse.doctor_id == doctor_id).all()

def update_nurse(db: Session, nurse_id: int, updates: NurseUpdate):
    nurse = db.query(Nurse).get(nurse_id)
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(nurse, field, value)
    db.commit()
    db.refresh(nurse)
    return nurse

def delete_nurse(db: Session, nurse_id: int):
    nurse = db.query(Nurse).get(nurse_id)
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    db.delete(nurse)
    db.commit()
    return {"message": "Nurse deleted"}
