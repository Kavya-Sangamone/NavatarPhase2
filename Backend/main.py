from fastapi import FastAPI
from database import Base, engine
from router import hospital, navatar, doctor, nurse, admin, session, booking
app = FastAPI(
    title="Hospital Management API",
    description="API for managing hospitals",
    version="1.0.0",
    redirect_slashes=False
)
# Create database tables
Base.metadata.create_all(bind=engine)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your frontend URL like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



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
app.include_router(booking.router)
app.include_router(session.router)
