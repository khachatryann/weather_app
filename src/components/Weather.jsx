import { useState } from "react";
import cleanSky from "../images/clean.jpg";
import cloudSky from "../images/cloud.webp";
import rain from "../images/rain.jpg";

export const Weather = () => {

    const apiKey="49fa40898a6aebcad9c875eeb9f6b5d3";
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState('');

    const getWeather = (event) => {
        if(event.key == 'Enter') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setWeatherData(data)

                setCity('');
            })
        }
    }

    return(
        <div className="parent__container">
        <div className="container">
            <h2 className="title">Welcome to Weather app</h2>
          <input
            className="input__search"
            placeholder="Enter City..."
            value={city}
            onChange={(e) => {setCity(e.target.value)}} 
            onKeyPress={getWeather}
          />

        {typeof weatherData.main === 'undefined' ? (
            <div>
                <p className="info__text">Please Enter and get Weather...</p>
            </div>
        ) : (
            <div>
                {weatherData.weather[0].main === 'Clear' ? (
                    <div className="clear__container">
                       <img src={cleanSky} className="clear__img"/>
                       <div className="clear__data">
                          <p>{weatherData.sys.country}, {""} {weatherData.name}</p>
                          <p>{weatherData.weather[0].main}</p>
                          <p className="clear__temp">{Math.floor(weatherData.main.temp)} °F</p>
                       </div>
                    </div>
                ) : (<></>)}
                {weatherData.weather[0].main === 'Clouds' ? (
                    <div className="clouds__container">
                       <img src={cloudSky} className="clouds__img"/>
                       <div className="clouds__data">
                          <p>{weatherData.sys.country}, {""} {weatherData.name}</p>
                          <p>{weatherData.weather[0].main}</p>
                          <p className="clouds__temp">{Math.floor(weatherData.main.temp)} °F</p>
                       </div>
                    </div>
                ) : (<></>)}
                {weatherData.weather[0].main === 'Rain' ? (
                    <div className="rain__container">
                       <img src={rain} className="rain__img"/>
                       <div className="rain__data">
                          <p>{weatherData.sys.country}, {""} {weatherData.name}</p>
                          <p>{weatherData.weather[0].main}</p>
                          <p className="rain__temp">{Math.floor(weatherData.main.temp)} °F</p>
                       </div>
                    </div>
                ) : (<></>)}

            </div>  
        )}

        {weatherData.cod === '404' ? (
            <p className="not__found">{weatherData.message}</p>
        ) : (<></>)}
        </div>
        </div>
    );
}