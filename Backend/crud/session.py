from sqlalchemy.orm import Session
from models import Session as SessionModel
import schemas.session as session_schema
from fastapi import HTTPException
from models import Booking


def create_session(db: Session, session: session_schema.SessionCreate):
    booking = db.query(Booking).filter(
        Booking.booking_id == session.booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db_session = SessionModel(**session.dict())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


def get_session(db: Session, session_id: int):
    session = db.query(SessionModel).filter(
        SessionModel.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


def get_all_sessions(db: Session):
    return db.query(SessionModel).all()


def update_session(db: Session, session_id: int, updated: session_schema.SessionUpdate):
    db_session = db.query(SessionModel).filter(
        SessionModel.session_id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    for key, value in updated.dict(exclude_unset=True).items():
        setattr(db_session, key, value)
    db.commit()
    db.refresh(db_session)
    return db_session


def delete_session(db: Session, session_id: int):
    session = db.query(SessionModel).filter(
        SessionModel.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    db.delete(session)
    db.commit()
    return {"detail": "Session deleted"}
