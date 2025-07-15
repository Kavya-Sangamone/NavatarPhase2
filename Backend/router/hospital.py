from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from crud import hospital as hospital_crud
from schemas import hospital as hospital_schema
from typing import Optional

router = APIRouter(prefix="/superadmin/hospital", tags=["Hospitals"])


# Create a hospital
@router.post("/", response_model=hospital_schema.HospitalOut)
def create_hospital(hospital: hospital_schema.HospitalCreate, db: Session = Depends(get_db)):
    return hospital_crud.create_hospital(db, hospital)


# Get all hospitals
@router.get("/", response_model=list[hospital_schema.HospitalOut])
def get_all_hospitals(db: Session = Depends(get_db)):
    return hospital_crud.get_all_hospitals(db)


# Update a specific hospital by ID
@router.put("/{hospital_id}", response_model=hospital_schema.HospitalOut)
def update_hospital(hospital_id: int, hospital: hospital_schema.HospitalCreate, db: Session = Depends(get_db)):
    return hospital_crud.update_hospital(hospital_id, hospital, db)


# Delete a specific hospital by ID
@router.delete("/{hospital_id}")
def delete_hospital(hospital_id: int, db: Session = Depends(get_db)):
    return hospital_crud.delete_hospital(hospital_id, db)

@router.get("/search", response_model=list[hospital_schema.hospitalOut])
def search_hospitals(
    search_query: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return hospital_crud.search_hospitals(db=db, search=search_query)