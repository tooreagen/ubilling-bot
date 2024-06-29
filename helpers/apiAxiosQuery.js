//TODO: Функція запиту до API

const axios = require("axios");

const apiAxiosQuery = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { apiAxiosQuery };
