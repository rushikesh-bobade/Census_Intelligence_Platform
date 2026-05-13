const express = require("express");

const router = express.Router();

const { predictIncome } = require("../controllers/predictController");

router.post("/predict", predictIncome);

module.exports = router;
