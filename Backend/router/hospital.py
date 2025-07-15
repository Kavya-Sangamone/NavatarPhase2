# routers/hospital.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud import hospital as hospital_crud
from schemas import hospital as hospital_schema

router = APIRouter(prefix="/superadmin/hospital", tags=["Hospitals"])

# Create a hospital
@router.post("/", response_model=hospital_schema.hospitalOut)
def create_hospital(hospital: hospital_schema.hospitalCreate, db: Session = Depends(get_db)):
    return hospital_crud.create_hospital(db, hospital)

# Get all hospitals
@router.get("/", response_model=list[hospital_schema.hospitalOut])
def get_all_hospitals(db: Session = Depends(get_db)):
    return hospital_crud.get_all_hospitals(db)

# Update a specific hospital by ID
@router.put("/{hospital_id}", response_model=hospital_schema.hospitalOut)
def update_hospital(hospital_id: int, hospital: hospital_schema.hospitalCreate, db: Session = Depends(get_db)):
    return hospital_crud.update_hospital(hospital_id, hospital, db)

# Delete a specific hospital by ID
@router.delete("/{hospital_id}")
def delete_hospital(hospital_id: int, db: Session = Depends(get_db)):
    return hospital_crud.delete_hospital(hospital_id, db)
