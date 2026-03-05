from typing import Optional
from pydantic import BaseModel, Field
from typing_extensions import Literal
from enum import Enum



class VisaApplicant(BaseModel):
    # Numerical
    age: int = Field(..., ge=0, le=120)
    education_level: int = Field(..., ge=0, le=3)
    duration_of_stay: int = Field(..., ge=1, le=365)
    monthly_income_usd: float = Field(..., ge=0)
    bank_balance_usd: float = Field(..., ge=0)
    prev_countries_visited: int = Field(..., ge=0)
    prev_visa_rejections: int = Field(..., ge=0)
    has_return_ticket: int = Field(..., ge=0, le=1)
    has_criminal_record: int = Field(..., ge=0, le=1)

    nationality: Literal[
        "Canadian",
        "Chinese",
        "German",
        "Indian",
        "American",
        "Nigerian",
        "Australian",
        "British"
    ]

    marital_status: Literal[
        "Single",
        "Divorced",
        "Married"
    ]

    visa_type: Literal[
        "Tourist",
        "Student",
        "Work"
    ]

    destination_country: Literal[
        "Canada",
        "France",
        "Germany",
        "UK",
        "USA"
    ]


class PredictionResponse(BaseModel):
    approval_status: bool
    approval_probability: float


class VisaApplicantUpdate(BaseModel):
    age: Optional[int] = Field(None, ge=0, le=120)
    education_level: Optional[int] = Field(None, ge=0, le=10)
    duration_of_stay: Optional[int] = Field(None, ge=1, le=365)
    monthly_income_usd: Optional[float] = Field(None, ge=0)
    bank_balance_usd: Optional[float] = Field(None, ge=0)
    prev_countries_visited: Optional[int] = Field(None, ge=0)
    prev_visa_rejections: Optional[int] = Field(None, ge=0)
    has_return_ticket: Optional[int] = Field(None, ge=0, le=1)
    has_criminal_record: Optional[int] = Field(None, ge=0, le=1)

    nationality: Optional[Literal[
        "Canadian",
        "Chinese",
        "German",
        "Indian",
        "American",
        "Nigerian",
        "Australian",
        "British"
    ]]

    marital_status: Optional[Literal[
        "Single",
        "Divorced",
        "Married"
    ]]

    visa_type: Optional[Literal[
        "Tourist",
        "Student",
        "Work"
    ]]

    destination_country: Optional[Literal[
        "Canada",
        "France",
        "Germany",
        "UK",
        "USA"
    ]]