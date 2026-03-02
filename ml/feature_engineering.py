import pandas as pd

def apply_feature_engineering(df):
    df = df.copy()
    
    # 1. CLEAN DATA CONTENT: Fix casing and spaces for the Encoder
    if 'education_level' in df.columns:
        df['education_level'] = df['education_level'].astype(str).str.strip().str.title()
        # Edge case: 'Phd' usually comes from title() but we want 'PhD'
        df['education_level'] = df['education_level'].replace({'Phd': 'PhD'})

    # 2. Financial Stability Score
    df['financial_stability_score'] = (df['monthly_income_usd'] * 0.4) + (df['bank_balance_usd'] * 0.6)
    
    # 3. Travel Risk Score
    df['travel_risk_score'] = df['prev_visa_rejections'] / (df['prev_countries_visited'] + 1)
    
    # 4. Profile Strength Index
    edu_map = {'High School': 1, 'Bachelors': 2, 'Masters': 3, 'PhD': 4}
    temp_edu = df['education_level'].map(edu_map).fillna(1)
    df['profile_strength_index'] = temp_edu * (df['monthly_income_usd'] / 1000)
    
    return df