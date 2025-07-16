from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Doctor, Hospital
from schemas.doctor import DoctorCreate, DoctorUpdate


def create_doctor(db: Session, hospital_id: int, doctor: DoctorCreate):
    existing = db.query(Doctor).filter(Doctor.email == doctor.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    if not db.query(Hospital).filter_by(hospital_id=hospital_id).first():
        raise HTTPException(status_code=404, detail="Hospital not found")

    db_doctor = Doctor(**doctor.dict(), hospital_id=hospital_id)
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


def list_doctors_by_hospital(db: Session, hospital_id: int):
    return db.query(Doctor).filter(Doctor.hospital_id == hospital_id).all()


def get_doctor(db: Session, doctor_id: int):
    doctor = db.query(Doctor).get(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor


def update_doctor(db: Session, doctor_id: int, updates: DoctorUpdate):
    doctor = db.query(Doctor).get(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(doctor, field, value)
    db.commit()
    db.refresh(doctor)
    return doctor


def delete_doctor(db: Session, doctor_id: int):
    doctor = db.query(Doctor).get(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    db.delete(doctor)
    db.commit()
    return {"message": f"Doctor '{doctor.name}' deleted successfully"}
