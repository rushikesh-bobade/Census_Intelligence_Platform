import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

import joblib

# LOAD DATASET
df = pd.read_csv("data/cleaned_census.csv")
print(df.columns)
print(df.head())

# REMOVE NULLS
df = df.dropna()

# FEATURES & TARGET
X = df[[
    "age",
    "education_level",
    "occupation",
    "hours_per_week"
]]
y = df["income"]

# ENCODE CATEGORICAL COLUMNS
label_encoders = {}

for column in X.select_dtypes(include="object").columns:

    le = LabelEncoder()

    X[column] = le.fit_transform(X[column])

    label_encoders[column] = le

# ENCODE TARGET
target_encoder = LabelEncoder()

y = target_encoder.fit_transform(y)

# TRAIN TEST SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# TRAIN MODEL
model = LogisticRegression(max_iter=1000)

model.fit(X_train, y_train)

# PREDICTIONS
predictions = model.predict(X_test)

# ACCURACY
accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", accuracy)

# SAVE MODEL
joblib.dump(model, "model/income_model.pkl")

# SAVE ENCODERS
joblib.dump(label_encoders, "model/encoders.pkl")

joblib.dump(target_encoder, "model/target_encoder.pkl")

print("Model Saved Successfully")