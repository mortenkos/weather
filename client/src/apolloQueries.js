import { gql } from "@apollo/client";

export const GET_CITIES_AND_WEATHER = gql`
  query CitiesAndWeather {
    citiesAndWeather {
      id
      name
      weather {
        temp
        wind {
          speed
          deg
        }
        humidity
        time
      }
    }
  }
`;
export const ADD_CITY_MUTATION = gql`
  mutation AddCity($city: String!) {
    addCity(city: $city) {
      city {
        name
      }
    }
  }
`;
export const REMOVE_CITY_MUTATION = gql`
  mutation RemoveCity($city: String!) {
    removeCity(city: $city)
  }
`;
