import pandas as pd
import joblib
import json
import os
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from xgboost import XGBClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

from preprocessing import get_preprocessing_pipeline
from feature_engineering import apply_feature_engineering
from evaluate import get_metrics

# 1. Load data
df = pd.read_csv('visa_applications.csv')
df.columns = [c.lower().strip() for c in df.columns]

# 2. Engineer Features & Clean Casing
df = apply_feature_engineering(df)

# 3. Diagnostic: Check for missing Target
if 'visa_approved' not in df.columns:
    print(f"CRITICAL ERROR: 'visa_approved' not found. Columns are: {list(df.columns)}")
    exit()

X = df.drop('visa_approved', axis=1)
y = df['visa_approved']

# 4. Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Initialize Pipeline
preprocessor = get_preprocessing_pipeline(X_train.columns)

models = {
    "LogisticRegression": LogisticRegression(max_iter=1000),
    "RandomForest": RandomForestClassifier(n_estimators=100, random_state=42),
    "XGBoost": XGBClassifier(eval_metric='logloss', random_state=42)
}

best_model_pipe = None
best_f1 = 0
all_results = {}

print("--- Starting Benchmarking ---")
for name, model in models.items():
    try:
        pipe = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', model)])
        pipe.fit(X_train, y_train)
        
        metrics = get_metrics(pipe, X_test, y_test)
        all_results[name] = metrics
        print(f"SUCCESS: {name} (Acc: {metrics['accuracy']:.2f})")
        
        if metrics['f1'] > best_f1:
            best_f1 = metrics['f1']
            best_model_pipe = pipe
    except Exception as e:
        print(f"FAILED: {name}. Error: {e}")

# 6. Save Outputs
if best_model_pipe:
    os.makedirs('ml/models/v1/', exist_ok=True)
    joblib.dump(best_model_pipe, 'ml/models/v1/model.pkl')
    with open('ml/models/v1/metrics.json', 'w') as f:
        json.dump(all_results, f, indent=4)
    print("\nTraining Finished. Best model saved to ml/models/v1/model.pkl")
else:
    print("\nNo models were trained successfully. Please check the data errors above.")