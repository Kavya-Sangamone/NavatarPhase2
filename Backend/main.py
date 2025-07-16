from fastapi import FastAPI
from database import Base, engine
from router import hospital, navatar, doctor, nurse, admin
app = FastAPI(
    title="Hospital Management API",
    description="API for managing hospitals",
    version="1.0.0"
)
# Create database tables
Base.metadata.create_all(bind=engine)
@app.get("/")
def root():
    return {"message": "Welcome to the Hospital Management API"}
# Create FastAPI app


# Register routers
app.include_router(hospital.router)
app.include_router(navatar.router)
app.include_router(doctor.router)
app.include_router(nurse.router)
app.include_router(admin.router)
