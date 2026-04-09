from pydantic import BaseModel, Field
from typing import List, Optional
from typing_extensions import Literal


class VisaApplicant(BaseModel):

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
        "Canadian","Chinese","German","Indian",
        "American","Nigerian","Australian","British"
    ]

    marital_status: Literal[
        "Single","Divorced","Married"
    ]

    visa_type: Literal[
        "Tourist","Student","Work"
    ]

    destination_country: Literal[
        "Australia","Canada","France",
        "Germany","UK","USA"
    ]


class ExplanationItem(BaseModel):

    feature: str
    impact: str
    score: float


class FeatureImpact(BaseModel):

    feature: str
    impact_score: float


class PredictionResponse(BaseModel):

    approval_status: bool
    approval_probability: float
    explanation: List[ExplanationItem]
    feature_impacts: List[FeatureImpact]


class VisaApplicantUpdate(BaseModel):

    age: Optional[int]
    education_level: Optional[int]
    duration_of_stay: Optional[int]
    monthly_income_usd: Optional[float]
    bank_balance_usd: Optional[float]
    prev_countries_visited: Optional[int]
    prev_visa_rejections: Optional[int]
    has_return_ticket: Optional[int]
    has_criminal_record: Optional[int]

    nationality: Optional[str]
    marital_status: Optional[str]
    visa_type: Optional[str]
    destination_country: Optional[str]