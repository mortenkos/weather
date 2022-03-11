const { makeApiCall } = require("./api");

require("dotenv").config();

const API_KEY = process.env.API_KEY;

async function updateCityData(cities, prisma) {
  try {
    for (const city of cities) {
      const data = await makeApiCall(city.name, API_KEY);
      await prisma.city.update({
        where: {
          name: city.name,
        },
        data: {
          weather: {
            update: {
              temp: data.main.temp,
              humidity: data.main.humidity,
              time: data.dt,
              wind: {
                update: { speed: data.wind.speed, deg: data.wind.deg },
              },
            },
          },
        },
        include: {
          weather: {
            include: {
              wind: true,
            },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  updateCityData,
};
