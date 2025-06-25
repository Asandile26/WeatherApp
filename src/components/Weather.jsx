import "../components/Weather.css";
import search_Icon from "../assets/search.png";
import clear_Icon from "../assets/clear.png";
import cloud_Icon from "../assets/cloud.png";
import drizzle_Icon from "../assets/drizzle.png";
import rain_Icon from "../assets/rain.png";
import snow_Icon from "../assets/snow.png";
import wind_Icon from "../assets/wind.png";
import humidity_Icon from "../assets/humidity.png";
import { useEffect, useRef, useState } from "react";

function Weather() {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_Icon,
    "01n": clear_Icon,
    "02d": cloud_Icon,
    "02n": cloud_Icon,
    "03d": cloud_Icon,
    "03n": cloud_Icon,
    "04d": drizzle_Icon,
    "04n": drizzle_Icon,
    "09d": rain_Icon,
    "09n": rain_Icon,
    "10d": rain_Icon,
    "10n": rain_Icon,
    "13d": snow_Icon,
    "13n": snow_Icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_Icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };
  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_Icon}
          alt="Glass search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_Icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_Icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
