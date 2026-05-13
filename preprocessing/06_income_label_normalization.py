# Databricks notebook source
# DBTITLE 1,Income Label Normalization (with NULL handling)
# LOAD EVENT PROCESSED TABLE
df = spark.table("workspace.default.census_data_event_processed")

# IMPORT FUNCTIONS
from pyspark.sql.functions import (
    col,
    trim,
    lower,
    regexp_replace,
    when
)

# =========================================
# 1. CLEAN RAW LABEL TEXT
# =========================================
# Examples:
# <=80K
# <=80k
# >80K.
#  >80k

df = df.withColumn(
    "income",
    trim(lower(col("income")))
)

# remove punctuation
df = df.withColumn(
    "income",
    regexp_replace(col("income"), "\\.", "")
)

# =========================================
# 2. NORMALIZE LABELS (with NULL handling)
# =========================================
df = df.withColumn(
    "income",
    when(
        col("income").isNull() | (col("income") == ""),
        "INVALID_LABEL"
    ).when(
        col("income").contains("<=80k"),
        "<=80k"
    ).when(
        col("income").contains(">80k"),
        ">80k"
    ).otherwise("INVALID_LABEL")
)

print("✓ Income labels normalized: NULL/empty → INVALID_LABEL")

# =========================================
# 3. LABEL DRIFT DETECTION
# =========================================
label_drift_count = df.filter(
    col("income") == "INVALID_LABEL"
).count()

print("Label Drift Count:", label_drift_count)

# =========================================
# 4. SAVE INVALID RECORDS FOR AUDIT
# =========================================
invalid_df = df.filter(
    col("income") == "INVALID_LABEL"
)

invalid_df.write \
    .format("delta") \
    .mode("overwrite") \
    .saveAsTable("workspace.default.invalid_income_records")

# =========================================
# 5. REMOVE INVALID LABELS
# ML-ready dataset should only contain:
# <=80k
# >80k
# =========================================
df = df.filter(
    col("income") != "INVALID_LABEL"
)

print(f"✓ Removed {label_drift_count} invalid income records")
print(f"✓ Final dataset contains only valid labels: <=80k and >80k")

# =========================================
# 6. VALIDATION
# =========================================
print("FINAL DISTINCT LABELS")
display(df.select("income").distinct())

print("INVALID LABEL RECORDS")
display(invalid_df)

# =========================================
# 7. SAVE CLEAN LABEL DATASET
# =========================================
df.write \
    .format("delta") \
    .mode("overwrite") \
    .saveAsTable("workspace.default.census_data_label_normalized")

print("✓ Table saved: workspace.default.census_data_label_normalized")