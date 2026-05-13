# Databricks notebook source
source_table = "workspace.default.census_data_raw"

df = spark.table(source_table)

# standardize column names
from pyspark.sql.functions import col

standardized_columns = []

for c in df.columns:
    clean_name = c.strip().lower().replace("-", "_")
    standardized_columns.append(clean_name)

df_standardized = df.toDF(*standardized_columns)

#print(df_standardized.columns)

#Deterministic schema ordering
ordered_columns = [
    "age",
    "workclass",
    "education_level",
    "education_num",
    "marital_status",
    "occupation",
    "relationship",
    "race",
    "sex",
    "capital_gain",
    "capital_loss",
    "hours_per_week",
    "native_country",
    "income",
    "event_time",
    "random_flag",
    "source_system"
]

df_standardized = df_standardized.select(*ordered_columns)

df_standardized.printSchema()
#display(df_standardized)

df_standardized.write \
    .format("delta") \
    .mode("overwrite") \
    .saveAsTable("workspace.default.census_data_standardized")

