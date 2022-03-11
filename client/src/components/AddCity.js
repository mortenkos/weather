import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CITY_MUTATION, GET_CITIES_AND_WEATHER } from "../apolloQueries";
import { capitalize } from "../utils";

const AddCity = ({ onCityChange }) => {
  const [city, setCity] = useState("");
  const [addCity, { loading: addLoading, error: addError }] = useMutation(
    ADD_CITY_MUTATION,
    {
      variables: {
        city,
      },
      refetchQueries: [{ query: GET_CITIES_AND_WEATHER }],
    }
  );

  if (addLoading) return "Submitting...";
  if (addError) return `Submission error! ${addError.message}`;

  const cityChangeHandler = () => {
    const capitalizedUserInput = capitalize(city);
    setCity(capitalizedUserInput);
    addCity();
    onCityChange(capitalizedUserInput);
    setCity("")
  };

  return (
    <div style={{padding: "16px"}}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        type="text"
        placeholder="Add new city"
      />
      <button onClick={cityChangeHandler}>add city</button>
    </div>
  );
};
export default AddCity;
