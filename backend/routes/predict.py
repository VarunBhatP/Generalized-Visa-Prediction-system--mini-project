#This is just dummy logic, will attach the real working ML Model later.


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Prediction
from schemas import PredictionResponse, VisaApplicant, VisaApplicantUpdate
from fastapi import HTTPException

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
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
    #Actual implementation of this is below. We can use the model_dump() method to convert the Pydantic model to a dictionary, which we can then unpack into the Prediction constructor. This way, we avoid manually mapping each field.
    """
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
    """

    data = applicant.model_dump()
    data["approval_status"] = approval_status

    new_prediction = Prediction(**data)

    # Step 3: Save to DB
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    # Step 4: Return Response
    return PredictionResponse(approval_status=approval_status)

#This function is just for demonstration of PATCH Method. You can replace it with your actual ML model logic later.
def calculate_approval(data: dict) -> bool:
    return (
        data.get("bank_balance_usd", 0) > 5000 and
        not data.get("has_criminal_record", False) and
        data.get("prev_visa_rejections", 0) == 0
    )

@router.patch("/predict/{prediction_id}", response_model=PredictionResponse)
def update_prediction(
    prediction_id: int,
    applicant_update: VisaApplicantUpdate,
    db: Session = Depends(get_db)
):
    # 1. Fetch existing record
    prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction not found")

    # 2. Update only fields provided in PATCH
    update_data = applicant_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(prediction, key, value)

    # 3. Re-run approval logic with updated data
    prediction.approval_status = calculate_approval(prediction.__dict__)

    # 4. Save changes
    db.commit()
    db.refresh(prediction)

    # 5. Return response
    return PredictionResponse(approval_status=prediction.approval_status)