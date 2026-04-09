from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Prediction
from schemas import PredictionResponse, VisaApplicant, VisaApplicantUpdate
from ml.inference import predict_visa

router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
def predict(applicant: VisaApplicant, db: Session = Depends(get_db)):

    data = applicant.model_dump()

    result = predict_visa(data)

    approval_status = bool(result["prediction"])

    new_prediction = Prediction(
        **data,
        approval_status=approval_status
    )

    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return {
        "approval_status": approval_status,
        "approval_probability": result["probability"],
        "explanation": result["explanation"],
        "feature_impacts": result["feature_impacts"]
    }



@router.patch("/predict/{prediction_id}", response_model=PredictionResponse)
def update_prediction(prediction_id: int, applicant_update: VisaApplicantUpdate, db: Session = Depends(get_db)):

    prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()

    if not prediction:
        raise HTTPException(404, "Prediction not found")

    update_data = applicant_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(prediction, key, value)

    model_data = {
        column.name: getattr(prediction, column.name)
        for column in Prediction.__table__.columns
        if column.name not in ["id","approval_status","created_at"]
    }

    result = predict_visa(model_data)

    prediction.approval_status = bool(result["prediction"])

    db.commit()
    db.refresh(prediction)

    return {
        "approval_status": bool(result["prediction"]),
        "approval_probability": result["probability"],
        "explanation": result["explanation"],
        "feature_impacts": result["feature_impacts"]
    }

# ---------------- GET ALL ----------------
@router.get("/predict")
def get_all_predictions(db: Session = Depends(get_db)):
    return db.query(Prediction).all()


# ---------------- GET ONE ----------------
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