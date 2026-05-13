from fastapi import FastAPI
from pydantic import BaseModel

import pandas as pd
import joblib

# CREATE FASTAPI APP
app = FastAPI()

# LOAD TRAINED MODEL
model = joblib.load("model/income_model.pkl")

# LOAD ENCODERS
encoders = joblib.load("model/encoders.pkl")

target_encoder = joblib.load("model/target_encoder.pkl")

# INPUT SCHEMA
class PredictionInput(BaseModel):

    age: int
    education: str
    occupation: str
    hoursPerWeek: int

# HOME ROUTE
@app.get("/")
def home():

    return {
        "message": "ML API Running"
    }

# PREDICTION ROUTE
@app.post("/predict")
def predict(data: PredictionInput):

    input_data = {
        "age": [data.age],
        "education_level": [data.education],
        "occupation": [data.occupation],
        "hours_per_week": [data.hoursPerWeek]
    }

    df = pd.DataFrame(input_data)

    # ENCODE CATEGORICAL VALUES
    for column in ["education_level", "occupation"]:

        if column in encoders:

            encoder = encoders[column]

            df[column] = encoder.transform(df[column])

    # PREDICTION
    prediction = model.predict(df)

    # DECODE RESULT
    final_prediction = target_encoder.inverse_transform(prediction)

    return {
        "prediction": final_prediction[0]
    }