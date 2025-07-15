from fastapi import FastAPI
from database import Base, engine
from router import hospital, navatar, doctor, nurse, admin

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Hospital Management API",
    description="API for managing hospitals",
    version="1.0.0"
)

# Register routers
app.include_router(hospital.router)
app.include_router(navatar.router)
app.include_router(doctor.router)
app.include_router(nurse.router)
app.include_router(admin.router)
