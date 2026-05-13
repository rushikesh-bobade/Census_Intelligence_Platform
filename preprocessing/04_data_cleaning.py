# Databricks notebook source
# DBTITLE 1,Data Cleaning with NULL Handling
# LOAD STANDARDIZED TABLE
df = spark.table("workspace.default.census_data_standardized")

# IMPORT FUNCTIONS
from pyspark.sql.functions import (
    col,
    regexp_replace,
    when,
    lower,
    trim,
    expr,
    upper,
    coalesce,
    lit
)

# =========================================
# 1. AGE CLEANING
# =========================================
df = df.withColumn(
    "age",
    regexp_replace(trim(col("age")), "[^0-9]", "")
)

df = df.withColumn(
    "age",
    expr("try_cast(age as int)")
)

# =========================================
# 2. NUMERIC COLUMN CLEANING
# =========================================
numeric_cols = [
    "education_num",
    "capital_gain",
    "capital_loss",
    "hours_per_week"
]

for c in numeric_cols:

    # trim
    df = df.withColumn(c, trim(col(c)))

    # remove formatting symbols
    df = df.withColumn(c, regexp_replace(col(c), ",", ""))
    df = df.withColumn(c, regexp_replace(col(c), "\\$", ""))
    df = df.withColumn(c, regexp_replace(col(c), "%", ""))

    # convert k suffix to numeric string
    df = df.withColumn(
        c,
        when(
            lower(col(c)).endswith("k"),
            regexp_replace(lower(col(c)), "k", "")
        ).otherwise(col(c))
    )

    # cast safely with multiplication if k existed
    df = df.withColumn(
        c,
        when(
            lower(trim(col(c))).contains("k"),
            expr(f"try_cast(regexp_replace(lower(trim({c})), 'k', '') as double) * 1000")
        ).otherwise(
            expr(f"try_cast({c} as double)")
        )
    )

# =========================================
# 3. WORKCLASS NULL HANDLING
# =========================================
df = df.withColumn(
    "workclass",
    when(
        col("workclass").isNull() |
        (trim(col("workclass")) == "") |
        (upper(trim(col("workclass"))).startswith("ERROR")),
        "Unknown"
    ).otherwise(trim(col("workclass")))
)

# =========================================
# 4. TRIM CATEGORICAL COLUMNS
# =========================================
categorical_cols = [
    "education_level",
    "marital_status",
    "occupation",
    "relationship",
    "race",
    "sex",
    "native_country",
    "income",
    "source_system",
    "random_flag"
]

for c in categorical_cols:
    df = df.withColumn(c, trim(col(c)))

# =========================================
# 5. NORMALIZE SOURCE SYSTEM
# =========================================
df = df.withColumn(
    "source_system",
    lower(col("source_system"))
)

# =========================================
# 6. COMPREHENSIVE NULL HANDLING
# =========================================
print("Applying NULL handling...")

# String columns: Replace NULL with 'Unknown'
string_cols_for_null_handling = [
    "education_level",
    "marital_status",
    "occupation",
    "relationship",
    "race",
    "sex",
    "native_country",
    "event_time",
    "random_flag"
]

for c in string_cols_for_null_handling:
    df = df.withColumn(
        c,
        coalesce(col(c), lit("Unknown"))
    )

print(f"✓ Replaced NULLs with 'Unknown' in {len(string_cols_for_null_handling)} string columns")
print(f"✓ Numeric columns (age, education_num, capital_gain, capital_loss, hours_per_week) keep NULL as-is")

# =========================================
# 7. REMOVE DUPLICATES
# =========================================
before_count = df.count()

df = df.dropDuplicates()

after_count = df.count()

print("Duplicates removed:", before_count - after_count)

# =========================================
# 8. VERIFY
# =========================================
df.printSchema()

display(df.select("age").distinct())
display(df.select("capital_gain").distinct())
display(df.select("workclass").distinct())

# =========================================
# 9. SAVE
# =========================================
df.write \
    .format("delta") \
    .mode("overwrite") \
    .saveAsTable("workspace.default.census_data_cleaned")