from sqlalchemy.orm import joinedload
from sqlalchemy import func
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db

from models import Hospital, Admin, Navatar

router = APIRouter()

@router.get("/hospital-navatar-summary")
def get_hospital_navatar_summary(db: Session = Depends(get_db)):
    results = (
        db.query(
            Hospital.hospital_name,
            Hospital.pincode,
            Admin.email.label("admin_email"),
            func.count(Navatar.navatar_id).label("navatar_count")
        )
        .join(Admin, Hospital.hospital_id == Admin.hospital_id)
        .outerjoin(Navatar, Hospital.hospital_id == Navatar.hospital_id)
        .group_by(Hospital.hospital_id, Admin.email)
        .all()
    )

    summary = []
    for row in results:
        summary.append({
            "hospital_name": row.hospital_name,
            "pincode": row.pincode,
            "admin_email": row.admin_email,
            "navatar_count": row.navatar_count,
        })

    return summary
