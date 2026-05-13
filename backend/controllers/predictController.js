const { getPrediction } = require("../services/mlService");

const predictIncome = async (req, res) => {
  try {
    const result = await getPrediction(req.body);

    res.json({
      success: true,
      prediction: result.prediction,
      confidence: result.confidence,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Prediction failed",
    });
  }
};

module.exports = {
  predictIncome,
};
