const express = require("express");

const router = express.Router();

router.get("/stats", (req, res) => {
  res.json({
    totalRecords: 32000,

    highIncome: 24,

    lowIncome: 76,

    ageGroups: {
      "18-25": 120,
      "26-35": 300,
      "36-45": 250,
      "46-60": 180,
    },
  });
});

module.exports = router;
