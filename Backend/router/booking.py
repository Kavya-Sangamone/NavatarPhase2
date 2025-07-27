from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import schemas.booking as booking_schema
import crud.booking as booking_crud
from database import get_db
from typing import List

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.post("/", response_model=booking_schema.BookingOut)
def create(booking: booking_schema.BookingCreate, db: Session = Depends(get_db)):
    return booking_crud.create_booking(db, booking)


@router.get("/hospital/{hospital_id}", response_model=List[booking_schema.BookingOut])
def read_by_hospital(hospital_id: int, db: Session = Depends(get_db)):
    return booking_crud.get_bookings_by_hospital(db, hospital_id)


@router.get("/{booking_id}", response_model=booking_schema.BookingOut)
def read(booking_id: int, db: Session = Depends(get_db)):
    return booking_crud.get_booking(db, booking_id)


@router.get("/", response_model=List[booking_schema.BookingOut])
def read_all(db: Session = Depends(get_db)):
    return booking_crud.get_all_bookings(db)


@router.patch("/bookings/{booking_id}/status", response_model=booking_schema.BookingOut)
def patch_booking_status(booking_id: int, updated: booking_schema.BookingUpdateStatus, db: Session = Depends(get_db)):
    return booking_crud.update_booking_status(db, booking_id, updated)


@router.delete("/{booking_id}")
def delete(booking_id: int, db: Session = Depends(get_db)):
    return booking_crud.delete_booking(db, booking_id)
