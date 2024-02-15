import React,{ useState } from "react";

export const Weather = () => {

    const apiKey="49fa40898a6aebcad9c875eeb9f6b5d3";
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState('');

    const getWeather = (event) => {
        if(event.key == 'Enter') {
            try {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    setWeatherData(data)
                    setCity('');
                })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    }


    return(
        <div className="parent-container">
            <div className="container">
                <div className="header">
                    <h1>Welcome to weather app</h1>
                    <input 
                        type="search" 
                        placeholder="Enter the city, country, etc.."
                        value={city}
                        onChange={(e) => {setCity(e.target.value)}}
                        onKeyPress={getWeather}
                    />
                </div>
                    {/* {typeof weatherData.main !== 'undefined' &&
                        <div className="body">
                            <p>Location: {weatherData.name}</p>
                            <p>Temperature: {weatherData.main.temp}°F</p>
                            <p>Feels Like: {weatherData.main.feels_like}°F</p>
                            <p>Weather: {weatherData.weather[0].main}, {weatherData.weather[0].description}</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Wind Speed: {weatherData.wind.speed} mph</p>
                        </div> } */}
            

                    {/* {weatherData.cod === '404' && <p>No results found.<br />Try searching for a city, country or point of interest.</p>} */}
                </div>
            </div>
    );
}