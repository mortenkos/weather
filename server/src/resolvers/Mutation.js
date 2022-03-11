const { ApolloError } = require("apollo-server-errors");
const { makeApiCall } = require("../utils/api");
const { updateCityData } = require("../utils/scheduler");

require("dotenv").config();

const API_KEY = process.env.API_KEY;

async function addCity(parent, args, context, info) {
  const cityExists = await context.prisma.city.findUnique({
    where: { name: args.city },
  });
  if (cityExists) {
    throw new ApolloError(`An city "${args.city}" is already added!`);
  }
  const cities = await context.prisma.city.findMany({
    include: {
      weather: {
          include: {
              wind: true
          }
      }
    },
  });

  try {
    await updateCityData(cities, context.prisma)
    const data = await makeApiCall(args, API_KEY);
    const city = await context.prisma.city.create({
      data: {
        name: data.name,
        weather: {
          create: {
            temp: data.main.temp,
            humidity: data.main.humidity,
            time: data.dt,
            wind: {
              create: { speed: data.wind.speed, deg: data.wind.deg },
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
    return {
      city,
    };
  } catch (err) {
    console.log(err.message);
  }
}
async function removeCity(parent, args, context, info) {
  try {
    const deleteCity = await context.prisma.city.delete({
      where: {
        name: args.city,
      },
    });
    return deleteCity.name;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addCity,
  removeCity,
};
