# Databricks notebook source
# DBTITLE 1,Event Time Processing (Fixed)
# LOAD CLEANED TABLE
df = spark.table("workspace.default.census_data_cleaned")

# IMPORT FUNCTIONS
from pyspark.sql.functions import (
    col,
    trim,
    from_unixtime,
    when,
    length,
    coalesce,
    expr,
    date_format,
    lit
)

# =========================================
# 1. CLEAN EVENT TIME
# =========================================
# Note: event_time string already has NULLs replaced with 'Unknown' from previous step
# We'll temporarily set 'Unknown' to NULL for parsing

df = df.withColumn(
    "event_time_temp",
    when(
        col("event_time") == "Unknown",
        None
    ).otherwise(trim(col("event_time")))
)

# =========================================
# 2. MULTI-FORMAT PARSING
# =========================================

# ISO / default Spark readable
iso_ts = expr(
    "try_to_timestamp(event_time_temp)"
)

# Epoch timestamps
epoch_ts = when(
    length(col("event_time_temp")) == 10,
    expr(
        "try_to_timestamp(from_unixtime(cast(event_time_temp as bigint)))"
    )
)

# Custom format
custom_ts = expr(
    "try_to_timestamp(event_time_temp, 'dd/MM/yyyy HH:mm')"
)

# Short date
short_date_ts = expr(
    "try_to_timestamp(event_time_temp, 'dd/MM/yy')"
)

# US style datetime
us_ts = expr(
    "try_to_timestamp(event_time_temp, 'MM-dd-yyyy HH:mm:ss')"
)

# =========================================
# 3. CREATE STANDARDIZED TIMESTAMP
# =========================================
df = df.withColumn(
    "event_time_std",
    coalesce(
        iso_ts,
        epoch_ts,
        custom_ts,
        short_date_ts,
        us_ts
    )
)

# Drop temp column
df = df.drop("event_time_temp")

# =========================================
# 4. KEEP event_time AS-IS (with 'Unknown')
# =========================================
# event_time remains as original string with 'Unknown' values preserved
# This ensures no NULL values in the string column

# =========================================
# 5. TRACK PARSE SUCCESS
# =========================================
parse_failures = df.filter(
    (col("event_time") != "Unknown") &
    col("event_time_std").isNull()
).count()

parse_success = df.filter(
    col("event_time_std").isNotNull()
).count()

total_valid = df.filter(
    col("event_time") != "Unknown"
).count()

print("="*60)
print("TIMESTAMP PARSING RESULTS")
print("="*60)
print(f"Total valid event_time values: {total_valid}")
print(f"Successfully parsed: {parse_success}")
print(f"Parse failures: {parse_failures}")
print(f"event_time column: keeps 'Unknown' for missing values")
print(f"event_time_std column: NULL where parsing failed")
print("="*60)

# =========================================
# 6. VALIDATION
# =========================================
display(
    df.select(
        "event_time",
        "event_time_std"
    ).limit(20)
)

# =========================================
# 7. SAVE (with schema overwrite)
# =========================================
df.write \
    .format("delta") \
    .mode("overwrite") \
    .option("overwriteSchema", "true") \
    .saveAsTable("workspace.default.census_data_event_processed")

print("✓ Table saved: workspace.default.census_data_event_processed")