import joblib
import pandas as pd
from ml.feature_engineering import apply_feature_engineering
import os
model = None

def load_model():
    global model

    BASE_DIR = os.path.dirname(__file__)
    MODEL_PATH = os.path.join(BASE_DIR, "models", "v2", "modelV2.pkl")

    model = joblib.load(MODEL_PATH)

    print("✅ Model loaded successfully")

# MODEL_COLUMNS = [
#     'age','education_level','duration_of_stay','monthly_income_usd',
#     'bank_balance_usd','prev_countries_visited','prev_visa_rejections',
#     'has_return_ticket','has_criminal_record',

#     'nationality_Australian','nationality_British','nationality_Canadian',
#     'nationality_Chinese','nationality_German','nationality_Indian',
#     'nationality_Nigerian',

#     'marital_status_Married','marital_status_Single',

#     'destination_country_Canada','destination_country_France',
#     'destination_country_Germany','destination_country_UK',
#     'destination_country_USA',

#     'visa_type_Tourist','visa_type_Work'
# ]

MODEL_COLUMNS = [
'age',
'education_level',
'duration_of_stay',
'monthly_income_usd',
'bank_balance_usd',
'prev_countries_visited',
'prev_visa_rejections',
'has_return_ticket',
'has_criminal_record',

'financial_ratio',
'travel_history_score',
'risk_flag',

'nationality_American',
'nationality_Australian',
'nationality_British',
'nationality_Canadian',
'nationality_Chinese',
'nationality_German',
'nationality_Indian',
'nationality_Nigerian',

'marital_status_Divorced',
'marital_status_Married',
'marital_status_Single',

'destination_country_Australia',
'destination_country_Canada',
'destination_country_France',
'destination_country_Germany',
'destination_country_UK',
'destination_country_USA',

'visa_type_Student',
'visa_type_Tourist',
'visa_type_Work'
]


def convert_to_model_format(data: dict):
    row = dict.fromkeys(MODEL_COLUMNS, 0)

    for key in [
        'age','education_level','duration_of_stay','monthly_income_usd',
        'bank_balance_usd','prev_countries_visited','prev_visa_rejections',
        'has_return_ticket','has_criminal_record'
    ]:
        row[key] = data[key]

    # engineered features
    row['financial_ratio'] = data['bank_balance_usd'] / data['monthly_income_usd']
    row['travel_history_score'] = data['prev_countries_visited'] - data['prev_visa_rejections']
    row['risk_flag'] = data['has_criminal_record'] + data['prev_visa_rejections']

    # one hot encoding
    row[f"nationality_{data['nationality']}"] = 1
    row[f"marital_status_{data['marital_status']}"] = 1
    row[f"destination_country_{data['destination_country']}"] = 1
    row[f"visa_type_{data['visa_type']}"] = 1

    return pd.DataFrame([row])

def predict_visa(data: dict):
    df = convert_to_model_format(data)

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return prediction, probability