import { useState } from "react";
import "./App.css";
import AddCity from "./components/AddCity";
import Content from "./components/Content";

function App() {
  const [city, setCity] = useState('')

  return (
    <div className="App">
        <AddCity onCityChange={setCity}/>
        <Content city={city} />
    </div>
  );
}

export default App;
