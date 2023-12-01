import React from "react";
import WeatherComponent from "./components/WeatherComponent";

const App = () => {

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    background: 'url("https://www.wallpaperup.com/uploads/wallpapers/2015/11/17/838310/ef1a6b69d06edbc83f65c717e57d217b.jpg") center/cover no-repeat fixed',
  };


  const h1Style = {
    color: "#fff", 
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>My Weather App</h1>
      <WeatherComponent />
    </div>
  );
};

export default App;
