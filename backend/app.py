from fastapi import FastAPI
from database import Base, engine
import models
from routes.predict import router


app = FastAPI()
app.include_router(router)
@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(data: dict):
    return {"prediction": "This is a mock prediction based on the input data."}