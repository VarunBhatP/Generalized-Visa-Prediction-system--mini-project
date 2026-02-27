from typing import Optional

from pydantic import BaseModel

#input schema for visa applicant
class VisaApplicant(BaseModel):
    age: int
    nationality: str
    marital_status: str
    education_level: str
    destination_country: str
    visa_type: str
    duration_of_stay: int
    monthly_income_usd: int
    bank_balance_usd: int
    prev_countries_visited: int
    prev_visa_rejections: int
    has_return_ticket: bool
    has_criminal_record: bool
    
#output schema for prediction response
class PredictionResponse(BaseModel):
    approval_status: bool



class VisaApplicantUpdate(BaseModel):
    age: Optional[int]
    nationality: Optional[str]
    marital_status: Optional[str]
    education_level: Optional[str]
    destination_country: Optional[str]
    visa_type: Optional[str]
    duration_of_stay: Optional[int]
    monthly_income_usd: Optional[float]
    bank_balance_usd: Optional[float]
    prev_countries_visited: Optional[int]
    prev_visa_rejections: Optional[int]
    has_return_ticket: Optional[bool]
    has_criminal_record: Optional[bool]