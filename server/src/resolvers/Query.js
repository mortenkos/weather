function citiesAndWeather(parent, args, context) {
  return context.prisma.city.findMany({
    include: {
        weather: {
            include: {
                wind: true
            }
        }
      },
  });
}

module.exports = {
  citiesAndWeather,
};
