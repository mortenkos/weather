const fetch = require("node-fetch");

const makeApiCall = async (params, key) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${params.city || params}&appid=${key}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw Error(error);
  }
};

module.exports = {
  makeApiCall,
};
