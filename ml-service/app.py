from fastapi import FastAPI
from pydantic import BaseModel

import pandas as pd
import joblib

# =========================
# FASTAPI APP
# =========================

app = FastAPI()

# =========================
# LOAD TRAINED PIPELINE
# =========================

model = joblib.load(
    "model/income_model.pkl"
)

# =========================
# INPUT SCHEMA
# =========================

class PredictionInput(BaseModel):

    age: int

    education: str

    occupation: str

    hoursPerWeek: int

    workclass: str

    maritalStatus: str

    sex: str

# =========================
# HOME ROUTE
# =========================

@app.get("/")
def home():

    return {
        "message": "Advanced ML API Running"
    }

# =========================
# PREDICTION ROUTE
# =========================

@app.post("/predict")
def predict(data: PredictionInput):

    input_data = pd.DataFrame([{

        "age": data.age,

        "education_level": data.education,

        "occupation": data.occupation,

        "hours_per_week": data.hoursPerWeek,

        "workclass": data.workclass,

        "marital_status": data.maritalStatus,

        "sex": data.sex,
    }])

    # PREDICT
    prediction = model.predict(
        input_data
    )[0]

    # PROBABILITY
    probability = model.predict_proba(
        input_data
    )[0]

    confidence = round(
        max(probability) * 100,
        2
    )

    return {
        "prediction": prediction,
        "confidence": confidence
    }