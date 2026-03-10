from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes.predict import router
from ml.inference import load_model

app = FastAPI(title="Visa AI Backend")

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- STARTUP ----------
@app.on_event("startup")
def startup_event():
    # create DB tables
    Base.metadata.create_all(bind=engine)

    # load ML model once
    load_model()

    print("✅ Application startup complete")


# ---------- ROUTERS ----------
app.include_router(router)


# ---------- HEALTH CHECK ----------
@app.get("/health")
def health():
    return {"status": "ok"}