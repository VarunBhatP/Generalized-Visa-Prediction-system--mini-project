import joblib
import pandas as pd

model = None   # global model holder


def load_model():
    global model
    model = joblib.load("ml/model.pkl")
    print("✅ ML model loaded")


def predict_visa(data: dict):
    if model is None:
        raise RuntimeError("Model not loaded")

    df = pd.DataFrame([data])

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return prediction, float(probability)

def engineer_features(data: dict) -> dict:
    
  
    
    data["financial_stability_score"] = (
        data["bank_balance_usd"] +
        data["monthly_income_usd"] * 6
    )

    data["travel_risk_score"] = (
        data["prev_visa_rejections"] * 2 +
        (0 if data["has_return_ticket"] else 3) +
        (5 if data["has_criminal_record"] else 0)
    )

    data["profile_strength_index"] = (
        data["prev_countries_visited"] +
        (2 if data["education_level"] in ["bachelors", "masters", "phd"] else 0)
    )

    return data