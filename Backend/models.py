from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum, func
from sqlalchemy.orm import relationship
from database import Base
import enum


class hospital(Base):
    __tablename__ = "hospital"
    
    hospital_id = Column(Integer, primary_key=True, index=True)
    hospital_name= Column(String, unique=True, index=True,nullable=False)
    country= Column(String, index=True,nullable=False)
    pincode = Column(String, index=True,nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())



class NavatarStatus(str, enum.Enum):
    Available = "Available"
    Booked = "Booked"
    InSession = "InSession"
    Offline = "Offline"

class navatar(Base):
    __tablename__ = "navatar"

    navatar_id = Column(Integer, primary_key=True, index=True)
    navatar_name = Column(String, nullable=False)
    location = Column(String, nullable=True)
    hospital_id = Column(Integer, ForeignKey("Hospital.hospital_id"), nullable=True)
    status = Column(Enum(NavatarStatus), default=NavatarStatus.Offline, nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())

class admin(Base):
    __tablename__ = "admin"

    admin_id = Column(Integer, primary_key=True, index=True)
    admin_name = Column(String, unique=True, nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospital.hospital_id"), nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())
