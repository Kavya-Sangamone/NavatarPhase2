from fastapi import FastAPI
from database import Base, engine
from router import hospital, navatar, doctor, nurse, admin
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

origins = [
    "http://localhost:3000",  # or your React frontend origin
]

app.add_middleware(
    CORSMiddleware,
    
    allow_origins=["http://localhost:5173"], # # can use ["*"] for development (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],  # or ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers=["*"],
)
# Register routers
app.include_router(hospital.router)
app.include_router(navatar.router)
app.include_router(doctor.router)
app.include_router(nurse.router)
app.include_router(admin.router)

