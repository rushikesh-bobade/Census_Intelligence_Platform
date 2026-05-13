import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

from sklearn.preprocessing import (
    OneHotEncoder,
    StandardScaler
)

from sklearn.impute import SimpleImputer

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score
)

# =========================
# LOAD DATASET
# =========================

df = pd.read_csv("data/cleaned_census.csv")

print("\nDATASET SHAPE:")
print(df.shape)

print("\nCOLUMNS:")
print(df.columns)

# =========================
# REMOVE NULLS
# =========================

df = df.dropna()

# =========================
# FEATURES & TARGET
# =========================

feature_columns = [
    "age",
    "education_level",
    "occupation",
    "hours_per_week",
    "workclass",
    "marital_status",
    "sex",
]

X = df[feature_columns]

y = df["income"]

# =========================
# CATEGORICAL & NUMERIC
# =========================

categorical_features = [
    "education_level",
    "occupation",
    "workclass",
    "marital_status",
    "sex",
]

numeric_features = [
    "age",
    "hours_per_week",
]

# =========================
# PREPROCESSING
# =========================

numeric_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ]
)

categorical_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="most_frequent")
        ),

        (
            "onehot",
            OneHotEncoder(
                handle_unknown="ignore"
            )
        ),
    ]
)

preprocessor = ColumnTransformer(
    transformers=[
        (
            "num",
            numeric_transformer,
            numeric_features
        ),

        (
            "cat",
            categorical_transformer,
            categorical_features
        ),
    ]
)

# =========================
# MODEL PIPELINE
# =========================

model_pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),

        (
            "classifier",
            RandomForestClassifier(
                n_estimators=200,
                max_depth=20,
                random_state=42
            )
        ),
    ]
)

# =========================
# TRAIN TEST SPLIT
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# =========================
# TRAIN MODEL
# =========================

print("\nTRAINING MODEL...\n")

model_pipeline.fit(X_train, y_train)

# =========================
# PREDICTIONS
# =========================

predictions = model_pipeline.predict(X_test)

probabilities = model_pipeline.predict_proba(X_test)[:, 1]

# =========================
# EVALUATION
# =========================

accuracy = accuracy_score(y_test, predictions)

roc_auc = roc_auc_score(
    y_test,
    probabilities
)

print("\nMODEL PERFORMANCE")
print("=" * 40)

print(f"Accuracy : {accuracy:.4f}")

print(f"ROC-AUC  : {roc_auc:.4f}")

print("\nCLASSIFICATION REPORT:")
print(classification_report(
    y_test,
    predictions
))

print("\nCONFUSION MATRIX:")
print(confusion_matrix(
    y_test,
    predictions
))

# =========================
# SAVE MODEL
# =========================

joblib.dump(
    model_pipeline,
    "model/income_model.pkl"
)

print("\nMODEL SAVED SUCCESSFULLY")