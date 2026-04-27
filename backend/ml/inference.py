import joblib
import pandas as pd
import os
import shap

model = None
explainer = None


def load_model():
    global model, explainer

    BASE_DIR = os.path.dirname(__file__)
    MODEL_PATH = os.path.join(BASE_DIR, "models", "v2", "modelV2.pkl")

    model = joblib.load(MODEL_PATH)
    explainer = shap.Explainer(model)

    print("✅ Model and SHAP explainer loaded successfully")


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


FEATURE_DESCRIPTIONS = {
    "financial_ratio": "financial stability",
    "travel_history_score": "travel history strength",
    "risk_flag": "overall risk indicators",
    "prev_visa_rejections": "previous visa rejections",
    "bank_balance_usd": "bank balance",
    "education_level": "education level",
    "age": "age",
    "monthly_income_usd": "monthly income",
    "duration_of_stay": "duration of stay",
    "prev_countries_visited": "countries previously visited",
    "has_return_ticket": "return ticket availability",
    "has_criminal_record": "criminal record"
}


FEATURE_DIRECTION = {

    "financial_ratio": "positive",
    "travel_history_score": "positive",
    "bank_balance_usd": "positive",
    "monthly_income_usd": "positive",
    "prev_countries_visited": "positive",

    "prev_visa_rejections": "negative",
    "risk_flag": "negative",
    "has_criminal_record": "negative"
}

MIN_IMPACT = 0.001
TOP_K = 3
MAX_FEATURES = 8


def clean_feature_name(feature):

    if feature.startswith("destination_country_"):
        return f"destination country: {feature.split('_')[-1]}"

    if feature.startswith("nationality_"):
        return f"nationality: {feature.split('_')[-1]}"

    if feature.startswith("visa_type_"):
        return f"visa type: {feature.split('_')[-1]}"

    if feature.startswith("marital_status_"):
        return f"marital status: {feature.split('_')[-1]}"

    return FEATURE_DESCRIPTIONS.get(feature, feature)


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


def build_sentence(feature_key, feature_name, shap_value):

    direction = FEATURE_DIRECTION.get(feature_key, "neutral")

    if shap_value > 0:
        model_effect = "increase"
    else:
        model_effect = "decrease"

    if direction == "positive":

        if model_effect == "increase":
            return f"A strong {feature_name} improved the approval probability."
        else:
            return f"The applicant's {feature_name} slightly reduced approval chances."

    elif direction == "negative":

        if model_effect == "increase":
            return f"Low risk in {feature_name} supported the approval decision."
        else:
            return f"High risk in {feature_name} lowered the approval probability."

    else:

        if shap_value > 0:
            return f"{feature_name} positively influenced the model decision."
        else:
            return f"{feature_name} slightly reduced the approval probability."


#complete ml inference pipeline
def predict_visa(data: dict):

    df = convert_to_model_format(data)

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    shap_values = explainer(df)
    shap_vals = shap_values.values[0, :, 1]
    
    base_value = shap_values.base_values[0][1]

    print(base_value)
    
    feature_contributions = {}

    for feature, value in zip(df.columns, shap_vals):
        feature_contributions[feature] = float(value)

    sorted_contributions = sorted(
        feature_contributions.items(),
        key=lambda x: abs(x[1]),
        reverse=True
    )

    explanations = []

    for feature, value in sorted_contributions[:TOP_K]:

        readable = clean_feature_name(feature)

        sentence = build_sentence(feature, readable, value)

        explanations.append({
            "feature": readable,
            "impact": sentence,
            "score": round(value, 4)
        })

    feature_impact_table = []

    for feature, value in sorted_contributions[:MAX_FEATURES]:

        if abs(value) < MIN_IMPACT:
            continue

        readable = clean_feature_name(feature)

        feature_impact_table.append({
            "feature": readable,
            "impact_score": round(value, 5)
        })

    return {
        "prediction": int(prediction),
        "probability": float(probability),
        "explanation": explanations,
        "feature_impacts": feature_impact_table
    }