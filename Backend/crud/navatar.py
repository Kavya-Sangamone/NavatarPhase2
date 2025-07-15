from sqlalchemy.orm import Session
from models import Navatar
from schemas.navatar import NavatarCreate
from fastapi import HTTPException


def create_navatar(db: Session, navatar: NavatarCreate):
    db_navatar = Navatar(**navatar.dict())
    db.add(db_navatar)
    db.commit()
    db.refresh(db_navatar)
    return db_navatar


def get_all_navatars(db: Session):
    return db.query(Navatar).all()


def get_navatar_by_id(navatar_id: int, db: Session):
    nav = db.query(Navatar).filter(Navatar.navatar_id == navatar_id).first()
    if not nav:
        raise HTTPException(status_code=404, detail="Navatar not found")
    return nav


def update_navatar(navatar_id: int, navatar: NavatarCreate, db: Session):
    db_navatar = db.query(Navatar).filter(
        Navatar.navatar_id == navatar_id).first()
    if not db_navatar:
        raise HTTPException(status_code=404, detail="Navatar not found")
    for key, value in navatar.dict().items():
        setattr(db_navatar, key, value)
    db.commit()
    db.refresh(db_navatar)
    return db_navatar


def delete_navatar(navatar_id: int, db: Session):
    db_navatar = db.query(Navatar).filter(
        Navatar.navatar_id == navatar_id).first()
    if not db_navatar:
        raise HTTPException(status_code=404, detail="Navatar not found")
    db.delete(db_navatar)
    db.commit()
    return {"detail": "Navatar deleted"}
