import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { degToCompass } from "../utils";
import { GET_CITIES_AND_WEATHER, REMOVE_CITY_MUTATION } from "../apolloQueries";

export default function Content(props) {
  const [city, setCity] = useState("");

  const { loading, error, data } = useQuery(GET_CITIES_AND_WEATHER, {
    onCompleted: ({ citiesAndWeather }) => {
      if (!props.city && citiesAndWeather.length) {
        setCity(citiesAndWeather[0].name);
      }
      if (props.city) {
        setCity(props.city);
      }
    },
  });
  const [removeCity, { loading: removeLoading, error: removeError }] =
    useMutation(REMOVE_CITY_MUTATION, {
      variables: {
        city,
      },
      refetchQueries: [{ query: GET_CITIES_AND_WEATHER }],
    });

  const displayCity = (data, cityName) => {
    if (!data && !cityName && cityName === "") {
      return <h2>No city selected</h2>;
    }
    const city = data.citiesAndWeather.find((o) => o.name === cityName);
    if (!city) {
      return <h2>No Cities Added!</h2>;
    }
    return (
      <div
        className="item"
        style={{
          width: "400px",
          margin: "16px auto",
          paddingBottom: "16px",
          border: "1px solid gray",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
        <h2>City: {city.name}</h2>
        <p>
          Temp: {(parseFloat(city.weather.temp) - 273.15).toFixed(1)} &#8451;
        </p>
        <p>
          Wind: {city.weather.wind.speed} m/s{" "}
          {degToCompass(city.weather.wind.deg)}
        </p>
        <p>Humidity: {city.weather.humidity}%</p>
        <p>
          Time: {new Date(city.weather.time * 1000).toLocaleDateString("et-EE")}
        </p>
        <button onClick={removeHandler}>remove</button>
      </div>
    );
  };
  const displaySelect = (data, city) => {
    if (data.citiesAndWeather.length) {
      return (
        <>
          <label htmlFor="cities">Choose a city:</label>
          <select
            id="cities"
            name="cities"
            onChange={(e) => setCity(e.target.value)}
            defaultValue={city}
          >
            {data.citiesAndWeather.map((city, i) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </>
      );
    } else {
      return
    }
    
  };
  const removeHandler = () => {
    removeCity();
    if (data.citiesAndWeather.length) {
      setCity(data.citiesAndWeather[0].name);
    }
  };

  if (loading || removeLoading) return "Loading...";
  if (error || removeError)
    return `Error! ${error ? error.message : removeError.message}`;
  if (!data) return <p>Not found</p>;

  return (
    <div className="box">
      {displaySelect(data, city)}
      {displayCity(data, city)}
    </div>
  );
}
