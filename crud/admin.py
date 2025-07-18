from sqlalchemy.orm import Session
from models import Admin as AdminModel
from schemas.admin import AdminCreate
from fastapi import HTTPException
from typing import Optional


# Create Admin
def create_admin(db: Session, admin: AdminCreate):
    if db.query(AdminModel).filter(AdminModel.email == admin.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_admin = AdminModel(**admin.dict())
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin


# Get all admins
def get_all_admins(db: Session):
    return db.query(AdminModel).all()


# Get admin by ID
def get_admin_by_id(admin_id: int, db: Session):
    admin = db.query(AdminModel).filter(
        AdminModel.admin_id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin


# Update admin
def update_admin(admin_id: int, admin_data: AdminCreate, db: Session):
    db_admin = db.query(AdminModel).filter(
        AdminModel.admin_id == admin_id).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    for key, value in admin_data.dict().items():
        setattr(db_admin, key, value)
    db.commit()
    db.refresh(db_admin)
    return db_admin


# Delete admin
def delete_admin(admin_id: int, db: Session):
    db_admin = db.query(AdminModel).filter(
        AdminModel.admin_id == admin_id).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    db.delete(db_admin)
    db.commit()
    return {"detail": "Admin deleted"}


# get admin by hospital
def get_admins_by_hospital(db: Session, hospital_id: Optional[int]):
    query = db.query(AdminModel)
    if hospital_id:
        query = query.filter(AdminModel.hospital_id == hospital_id)
    return query.all()


def search_admins(db: Session, hospital_id: Optional[int] = None, search: Optional[str] = None, skip: int = 0, limit: int = 10):
    query = db.query(AdminModel)
    if hospital_id:
        query = query.filter(AdminModel.hospital_id == hospital_id)
    if search:
        query = query.filter(AdminModel.admin_name.ilike(f"%{search}%"))
    return query.offset(skip).limit(limit).all()
