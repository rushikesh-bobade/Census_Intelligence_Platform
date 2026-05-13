# Databricks notebook source
df = spark.table("workspace.default.census_data_standardized")

#total rows count
total_rows = df.count()
print("Total Rows:", total_rows)

#null profilling
from pyspark.sql.functions import col, count, when

null_report = df.select([
    count(when(col(c).isNull(), c)).alias(c)
    for c in df.columns
])

#display(null_report)

# blank string profilling
from pyspark.sql.functions import trim

blank_report = df.select([
    count(when(trim(col(c)) == "", c)).alias(c)
    for c in df.columns
])

#display(blank_report)

#duplicate rooe detetion
duplicate_rows = total_rows - df.dropDuplicates().count()

#print("Duplicate Rows:", duplicate_rows)

#age anomly detection
#df.select("age").distinct().display()
#df.filter(col("age").contains("ERROR")).display()

#df.select("workclass").distinct().display()
#df.select("income").distinct().display()

#numeric column validation
# numeric_cols = [
#     "age",
#     "education_num",
#     "capital_gain",
#     "capital_loss",
#     "hours_per_week"
# ]

# for c in numeric_cols:
#     print(f"Checking {c}")
#     df.select(c).distinct().display()

#timestamp
df.select("event_time").distinct().display()

# COMMAND ----------

