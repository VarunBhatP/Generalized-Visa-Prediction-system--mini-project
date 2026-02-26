from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Prediction
from schemas import VisaApplicant

router = APIRouter()

@router.post("/predict")
def predict(applicant: VisaApplicant, db: Session = Depends(get_db)):

    # Step 1: Decision Logic
    if (
        applicant.bank_balance_usd > 5000 and
        not applicant.has_criminal_record and
        applicant.prev_visa_rejections == 0
    ):
        approval_status = True
    else:
        approval_status = False

    # Step 2: Create DB Object
    new_prediction = Prediction(
        age=applicant.age,
        nationality=applicant.nationality,
        marital_status=applicant.marital_status,
        education_level=applicant.education_level,
        destination_country=applicant.destination_country,
        visa_type=applicant.visa_type,
        duration_of_stay=applicant.duration_of_stay,
        monthly_income_usd=applicant.monthly_income_usd,
        bank_balance_usd=applicant.bank_balance_usd,
        prev_countries_visited=applicant.prev_countries_visited,
        prev_visa_rejections=applicant.prev_visa_rejections,
        has_return_ticket=applicant.has_return_ticket,
        has_criminal_record=applicant.has_criminal_record,
        approval_status=approval_status
    )

    # Step 3: Save to DB
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    # Step 4: Return Response
    return {"approval_status": approval_status}