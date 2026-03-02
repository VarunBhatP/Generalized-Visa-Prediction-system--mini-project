import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder

def get_preprocessing_pipeline(df_columns):
    # Standard column groups
    numeric_cols = [
        'age', 'duration_of_stay', 'monthly_income_usd', 'bank_balance_usd', 
        'prev_countries_visited', 'prev_visa_rejections',
        'financial_stability_score', 'travel_risk_score', 'profile_strength_index'
    ]
    nominal_cols = ['nationality', 'marital_status', 'destination_country', 'visa_type']
    binary_cols = ['has_return_ticket', 'has_criminal_record']
    
    # Define categories exactly as they will appear after .title() cleaning
    edu_categories = ['High School', 'Bachelors', 'Masters', 'PhD']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), [c for c in numeric_cols if c in df_columns]),
            ('ord', OrdinalEncoder(categories=[edu_categories], handle_unknown='use_encoded_value', unknown_value=-1), ['education_level']),
            ('nom', OneHotEncoder(handle_unknown='ignore', sparse_output=False), [c for c in nominal_cols if c in df_columns]),
            ('bin', 'passthrough', [c for c in binary_cols if c in df_columns])
        ],
        remainder='drop'
    )
    
    return preprocessor