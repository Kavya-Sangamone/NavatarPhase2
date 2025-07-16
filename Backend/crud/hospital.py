from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import Hospital
from schemas import hospital as hospital_schema
from fastapi import HTTPException
from typing import Optional



def create_hospital(db: Session, hospital: hospital_schema.HospitalCreate):
    db_hospital = Hospital(**hospital.dict())
    db.add(db_hospital)
    try:
        db.commit()
        db.refresh(db_hospital)
        return db_hospital
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Hospital with this name and pincode already exists."
        )


def get_all_hospitals(db: Session):
    return db.query(Hospital).all()


def update_hospital(hospital_id: int, hospital: hospital_schema.HospitalCreate, db: Session):
    db_hospital = db.query(Hospital).filter(
        Hospital.hospital_id == hospital_id).first()
    if db_hospital is None:
        raise HTTPException(status_code=404, detail="Hospital not found")
    for key, value in hospital.dict().items():
        setattr(db_hospital, key, value)
    db.commit()
    db.refresh(db_hospital)
    return db_hospital


def delete_hospital(hospital_id: int, db: Session):
    db_hospital = db.query(Hospital).filter(
        Hospital.hospital_id == hospital_id).first()
    if db_hospital is None:
        raise HTTPException(status_code=404, detail="Hospital not found")
    db.delete(db_hospital)
    db.commit()
    return {"detail": "Hospital deleted successfully"}

def search_hospitals(db: Session, search_query: Optional[str] = None):
    query = db.query(Hospital)
    if search_query:
        query = query.filter(Hospital.name.ilike(f"%{search_query}%"))
    return query.all()
