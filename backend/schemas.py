from pydantic import BaseModel

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
    