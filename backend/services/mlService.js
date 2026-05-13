const axios = require("axios");

const getPrediction = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/predict", data);

    return response.data;
  } catch (error) {
    console.log(error.message);

    throw error;
  }
};

module.exports = {
  getPrediction,
};
