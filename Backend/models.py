from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum, func, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base
import enum


class Hospital(Base):
    __tablename__ = "hospital"

    hospital_id = Column(Integer, primary_key=True, index=True)
    hospital_name = Column(String, unique=True, index=True, nullable=False)
    country = Column(String, index=True, nullable=False)
    pincode = Column(String, index=True, nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False,
                        default=func.now(), onupdate=func.now())
    __table_args__ = (
        UniqueConstraint("hospital_name", "pincode", name="unique_hospital_name_pincode"),
    )

class NavatarStatus(str, enum.Enum):
    Available = "Available"
    Booked = "Booked"
    InSession = "InSession"
    Offline = "Offline"


class Navatar(Base):
    __tablename__ = "navatar"

    navatar_id = Column(Integer, primary_key=True, index=True)
    navatar_name = Column(String, nullable=False)
    location = Column(String, nullable=True)
    hospital_id = Column(Integer, ForeignKey(
        "hospital.hospital_id"), nullable=True)
    status = Column(Enum(NavatarStatus),
                    default=NavatarStatus.Offline, nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False,
                        default=func.now(), onupdate=func.now())


class Admin(Base):
    __tablename__ = "admin"

    admin_id = Column(Integer, primary_key=True, index=True)
    admin_name = Column(String, unique=True, nullable=False)
    hospital_id = Column(Integer, ForeignKey(
        "hospital.hospital_id"), nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False,
                        default=func.now(), onupdate=func.now())


class Doctor(Base):
    __tablename__ = "doctor"

    doctor_id = Column(Integer, primary_key=True, index=True)
    doctor_name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    hospital_id = Column(Integer, ForeignKey(
        "hospital.hospital_id"), nullable=False)

    hospital = relationship("Hospital", backref="doctors")
    nurses = relationship("Nurse", back_populates="doctor")


class Nurse(Base):
    __tablename__ = "nurse"

    nurse_id = Column(Integer, primary_key=True, index=True)
    nurse_name = Column(String, nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctor.doctor_id"), nullable=False)

    doctor = relationship("Doctor", back_populates="nurses")

