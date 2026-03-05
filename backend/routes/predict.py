from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Prediction
from schemas import PredictionResponse, VisaApplicant, VisaApplicantUpdate
from ml.inference import predict_visa

router = APIRouter()


# ---------------- POST ----------------
@router.post("/predict", response_model=PredictionResponse)
def predict(applicant: VisaApplicant, db: Session = Depends(get_db)):

    # Convert Pydantic → dict
    data = applicant.model_dump()

    # ML inference
    prediction, probability = predict_visa(data)

    approval_status = bool(prediction)

    # Add ML outputs
    data["approval_status"] = approval_status
    
    print("Probability:", probability)
    # Create DB object
    new_prediction = Prediction(**data)

    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return {
    "approval_status": approval_status,
    "approval_probability": probability
}


# ---------------- PATCH ----------------
@router.patch("/predict/{prediction_id}", response_model=PredictionResponse)
def update_prediction(
    prediction_id: int,
    applicant_update: VisaApplicantUpdate,
    db: Session = Depends(get_db)
) -> dict:

    prediction = (
        db.query(Prediction)
        .filter(Prediction.id == prediction_id)
        .first()
    )

    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction not found")

    # Update provided fields only
    update_data = applicant_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(prediction, key, value)

    # Build dictionary from updated SQLAlchemy object
    model_data = {
        column.name: getattr(prediction, column.name)
        for column in Prediction.__table__.columns
        if column.name not in ["id", "approval_status", "created_at"]
    }

    # Re-run ML prediction
    new_prediction, new_probability = predict_visa(model_data)

    prediction.approval_status = bool(new_prediction)
    

    db.commit()
    db.refresh(prediction)

    return {
    "approval_status": bool(new_prediction),
    "approval_probability": new_probability
}


# ---------------- GET ALL ----------------
@router.get("/predict")
def get_all_predictions(db: Session = Depends(get_db)):
    return db.query(Prediction).all()


@router.get("/predict/{id}")
def get_prediction(id: int, db: Session = Depends(get_db)):
    prediction = db.query(Prediction).filter(Prediction.id == id).first()
    if not prediction:
        raise HTTPException(404, "Prediction not found")
    return prediction

# ---------------- DELETE ----------------
@router.delete("/predict/{id}")
def delete_prediction(id: int, db: Session = Depends(get_db)):
    prediction = db.query(Prediction).filter(Prediction.id == id).first()
    if not prediction:
        raise HTTPException(404, "Prediction not found")
    db.delete(prediction)
    db.commit()
    return {"detail": "Prediction deleted successfully"}