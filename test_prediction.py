import joblib
import pandas as pd
from ml.feature_engineering import apply_feature_engineering

# 1. Load model
model = joblib.load('ml/models/v1/model.pkl')

# 2. Test Data - Let's make this person an absolute "Ideal" candidate
new_applicant_data = {
    'age': [40],
    'education_level': ['PhD'], 
    'monthly_income_usd': [25000],  # Massive Income
    'bank_balance_usd': [100000],   # Massive Savings
    'duration_of_stay': [7],
    'prev_countries_visited': [20],
    'prev_visa_rejections': [0],
    'nationality': ['India'],
    'marital_status': ['Married'],
    'destination_country': ['USA'],
    'visa_type': ['Tourist'],
    'has_return_ticket': [1],
    'has_criminal_record': [0]
}

new_df = pd.DataFrame(new_applicant_data)
new_df = apply_feature_engineering(new_df)

# --- DIAGNOSTIC PRINT ---
print("Columns being sent to model:", new_df.columns.tolist())
print("Financial Stability Score:", new_df['financial_stability_score'].values[0])
# ------------------------

try:
    # Use the best model from the pipeline
    probability = model.predict_proba(new_df)[0][1]
    prediction = model.predict(new_df)[0]

    print("-" * 30)
    print(f"RAW PROBABILITY: {probability}") # See the hidden decimals
    if prediction == 1:
        print(f"RESULT: VISA APPROVED ✅")
    else:
        print(f"RESULT: VISA REJECTED ❌")
    print(f"Confidence Score: {probability:.2%}")
    print("-" * 30)
except Exception as e:
    print(f"Error: {e}")