import React,{ useState, useEffect } from "react";

export const Weather = () => {

    const apiKey="49fa40898a6aebcad9c875eeb9f6b5d3";
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [])


    return(
        <div className="parent-container">
            {loading ? (
                <div className="loader-container">
                    <div className="loader-spinner"><img src="/images/icons/loader.png" /></div>
                </div>
            ) : (
                <div className="container">
                <div className="weather-header">
                    <h1>Welcome to weather app</h1>
                    <input 
                        type="search" 
                        placeholder="Enter the city, country, etc.."
                        value={city}
                        onChange={(e) => {setCity(e.target.value)}}
                        onKeyPress={getWeather}
                    />
                </div>
                {typeof weatherData.main !== 'undefined' &&
                    <div className="weather-body">
                        <ul>
                            <li><span>Location:</span> {weatherData.name}, {weatherData.sys.country}</li>
                            <li><span>Temperature:</span> {weatherData.main.temp}°F</li>
                            <li><span>Feels Like:</span> {weatherData.main.feels_like}°F</li>
                            <li><span>Weather:</span> {weatherData.weather[0].main}, {weatherData.weather[0].description}</li>
                            <li><span>Humidity:</span> {weatherData.main.humidity}%</li>
                            <li><span>Wind Speed:</span> {weatherData.wind.speed} mph</li>
                           </ul>
                    </div> 
                }
                {weatherData.cod === '404' &&
                    <div className="not-found">
                        <p>No results found.<br />Try searching for a city, country or point of interest.</p>
                    </div> 
                }
                </div>
            )}
        </div>
    )
}

