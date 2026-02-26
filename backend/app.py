from fastapi import FastAPI
from database import Base, SessionLocal, engine
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


@app.get("/predict")
async def predict():
    session = SessionLocal()
    try:
        predictions = session.query(models.Prediction).all()
        return predictions
    finally:        
        session.close()

@app.get("/predict/{id}")
async def predict_by_id(id: int):
    session = SessionLocal()
    try:
        prediction = session.query(models.Prediction).filter(models.Prediction.id == id).first()
        return prediction
    except:
        return {"error": "Prediction not found"}
    finally:
        session.close()