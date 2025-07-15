# crud/hospital.py
from sqlalchemy.orm import Session
from models import hospital as hospital_model
from schemas import hospital as hospital_schema
from fastapi import HTTPException
from typing import Optional

# Create a new hospital
def create_hospital(db: Session, hospital: hospital_schema.hospitalCreate):
    db_hospital = hospital_model.Hospital(**hospital.dict())
    db.add(db_hospital)
    db.commit()
    db.refresh(db_hospital)
    return db_hospital

# Get all hospitals
def get_all_hospitals(db: Session):
    return db.query(hospital_model.Hospital).all()

# Update a hospital by ID
def update_hospital(hospital_id: int, hospital: hospital_schema.hospitalCreate, db: Session):
    db_hospital = db.query(hospital_model.Hospital).filter(hospital_model.Hospital.hospital_id == hospital_id).first()
    if db_hospital is None:
        raise HTTPException(status_code=404, detail="Hospital not found")
    for key, value in hospital.dict().items():
        setattr(db_hospital, key, value)
    db.commit()
    db.refresh(db_hospital)
    return db_hospital

# Delete a hospital by ID
def delete_hospital(hospital_id: int, db: Session):
    db_hospital = db.query(hospital_model.Hospital).filter(hospital_model.Hospital.hospital_id == hospital_id).first()
    if db_hospital is None:
        raise HTTPException(status_code=404, detail="Hospital not found")
    db.delete(db_hospital)
    db.commit()
    return {"detail": "Hospital deleted successfully"}

def search_hospitals(db: Session, search_query: Optional[str] = None):
    query = db.query(hospital_model.Hospital)
    if search_query:
        query = query.filter(hospital_model.Hospital.name.ilike(f"%{search_query}%"))
    return query.all()
