from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    age = Column(Integer, nullable=False)
    nationality = Column(String, nullable=False)
    marital_status = Column(String, nullable=False)
    education_level = Column(String, nullable=False)
    destination_country = Column(String, nullable=False)
    visa_type = Column(String, nullable=False)
    duration_of_stay = Column(Integer, nullable=False)
    monthly_income_usd = Column(Integer, nullable=False)
    bank_balance_usd = Column(Integer, nullable=False)
    prev_countries_visited = Column(Integer, nullable=False)
    prev_visa_rejections = Column(Integer, nullable=False)
    has_return_ticket = Column(Boolean, nullable=False)
    has_criminal_record = Column(Boolean, nullable=False)
    approval_status = Column(Boolean, nullable=False)

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )