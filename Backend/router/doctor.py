from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Doctor, Hospital
from schemas.doctor import *
from database import get_db

router = APIRouter()


@router.post("/hospitals/{hospital_id}/doctors", response_model=DoctorOut)
def create_doctor(hospital_id: int, doctor: DoctorCreate, db: Session = Depends(get_db)):
    db_doctor = Doctor(**doctor.dict(), hospital_id=hospital_id)
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


@router.get("/hospitals/{hospital_id}/doctors", response_model=List[DoctorOut])
def list_doctors(hospital_id: int, db: Session = Depends(get_db)):
    return db.query(Doctor).filter(Doctor.hospital_id == hospital_id).all()


@router.get("/doctors/{doctor_id}", response_model=DoctorOut)
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).get(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor


@router.put("/doctors/{doctor_id}", response_model=DoctorOut)
def update_doctor(doctor_id: int, updates: DoctorUpdate, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).get(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(doctor, field, value)
    db.commit()
    db.refresh(doctor)
    return doctor


@router.delete("/doctors/{doctor_id}")
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).get(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    db.delete(doctor)
    db.commit()
    return {"message": "Doctor deleted"}
