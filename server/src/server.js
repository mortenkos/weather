const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const { updateCityData } = require("./utils/scheduler");

const schedule = require('node-schedule');

const fs = require("fs");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT;

const prisma = new PrismaClient();
// *** this is NO GO ZONE ***
// TODO Need for better solution
schedule.scheduleJob('up-job', '*/15 * * * *', async function(){
  const cities = await prisma.city.findMany({
    include: {
      weather: {
          include: {
              wind: true
          }
      }
    },
  });
  if (cities.length) {
    await updateCityData(cities, prisma)
  }

});
// *** END ***
const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  cors: true,
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
    };
  },
});
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server is running in url: ${url}`);
});
