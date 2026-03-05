# Visa Approval Prediction API

A FastAPI-based backend service that predicts whether a visa application will be approved using a trained Machine Learning model.

The API accepts applicant details, runs a trained ML model (`model.pkl`), stores the request in a database, and returns the predicted approval status and probability.

---

# Project Architecture

```
Visa/
│
├── backend/
│   │
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   │
│   ├── routers/
│   │   └── prediction.py
│   │
│   ├── ml/
│   │   ├── inference.py
│   │   └── model.pkl
│   │
│   ├── requirements.txt
│   └── env/
│
├── ml/
│   ├── train_model.py
│   ├── model_diagnostics.py
│   └── dataset.csv
│
└── README.md
```

---

# Features

* FastAPI REST API
* SQLAlchemy ORM
* Pydantic request validation
* Machine Learning model inference
* Prediction storage in database
* PATCH endpoint to re-evaluate predictions
* Swagger API documentation

---

# Tech Stack

Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

Machine Learning

* Scikit-Learn
* Pandas
* Joblib

Database

* PostgreSQL / SQLite

---

# 1. Clone the Repository

```
git clone <your-repo-url>
cd Visa
```

---

# 2. Create Virtual Environment

Navigate to the backend folder.

```
cd backend
python -m venv env
```

Activate the environment.

### Windows

```
.\env\Scripts\activate
```

### Linux / Mac

```
source env/bin/activate
```

---

# 3. Install Dependencies

```
cd backend
pip freeze > requirements.txt
```

---

# 4. Configure Database

In `database.py`, configure your database connection.



Example (PostgreSQL):

```
postgresql://username:password@localhost:5432/visa_ai
```

---

# 5. Run Database Migrations (Table Creation)

Tables are created automatically using:

```python
Base.metadata.create_all(bind=engine)
```

This runs when the application starts.

---

# 6. Place the Trained Model

The trained model file must be located at:

```
backend/ml/model.pkl
```

This file is loaded during application startup.

Inside `inference.py`:

```python
model = joblib.load("ml/model.pkl")
```

---

# 7. Start the FastAPI Server

From the `backend` folder run:

```
uvicorn app:app --reload
```

Server will start at:

```
http://127.0.0.1:8000
```

---

# 8. Access API Documentation

Swagger UI:

```
http://127.0.0.1:8000/docs
```

ReDoc:

```
http://127.0.0.1:8000/redoc
```

---

# 9. Example API Request

POST `/predict`

```
{
  "age": 28,
  "education_level": 2,
  "duration_of_stay": 24,
  "monthly_income_usd": 3500,
  "bank_balance_usd": 12000,
  "prev_countries_visited": 3,
  "prev_visa_rejections": 0,
  "has_return_ticket": 1,
  "has_criminal_record": 0,
  "nationality": "Indian",
  "marital_status": "Single",
  "destination_country": "Canada",
  "visa_type": "Work"
}
```

Response:

```
{
  "approval_status": true,
  "approval_probability": 0.82
}
```

---

# 10. Available Endpoints

### Predict Visa Approval

POST `/predict`

Returns approval status and probability.

---

### Update Prediction

PATCH `/predict/{prediction_id}`

Updates fields and re-runs the ML prediction.

---

### Get All Predictions

GET `/predict`

Returns all stored predictions.

---

### Get Prediction by ID

GET `/predict/{id}`

Returns a specific prediction.

---

# Machine Learning Model

The model was trained using a dataset of visa applications with the following features:

* Age
* Education Level
* Duration of Stay
* Monthly Income
* Bank Balance
* Previous Countries Visited
* Previous Visa Rejections
* Return Ticket Status
* Criminal Record
* Nationality
* Marital Status
* Destination Country
* Visa Type

The target variable:

```
visa_approved
```

Model used:

```
RandomForestClassifier
```

The trained model is saved using:

```
joblib.dump(model, "model.pkl")
```

---

# Validation

All incoming requests are validated using Pydantic schemas to prevent invalid inputs and API crashes.

Example validations:

* Age must be between 0–120
* Income must be positive
* Visa types restricted to valid categories
* Nationality restricted to dataset values

---

# Future Improvements

* Docker containerization
* CI/CD pipeline
* Model monitoring
* Feature store integration
* Authentication for API

---

# Author

Varun Bhat
