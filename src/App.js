import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const App = () => {

  const [name, setName] = useState();
  const [dateA, setDateA] = useState();
  const [main, setMain] = useState();
  const [lonlat, setLonlate] = useState();
  const [sys, setSys] = useState();
  const [weather, setWeather] = useState();
  const [input, setInput] = useState('');
  const [city, setCity] = useState('dhaka')

  const handleChange = (e) => {
    e.preventDefault()
    const value = input.toLowerCase()
    setCity(value)
  }

  const API_ID = "c652855d1505043070783cb4f23f5917"

  useEffect(() => {

      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}`).then(response => setName(response.data.name))

      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}`).then(response => setDateA(response.data.dt))

      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}`).then(response => setMain(response.data.main))

      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}`).then(response => setLonlate(response.data.coord))

      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}`).then(response => setSys(response.data.sys))

      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}`).then(response => setWeather(response.data.weather[0]))

  }, [city])

  const sunrise = new Date(sys?.sunrise * 1000)
  const sunset = new Date(sys?.sunset * 1000)
  const dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const formatA = sunrise.getHours() > 12 ? sunrise.getHours() - 12 : sunrise.getHours()
  const formatB = sunset.getHours() > 12 ? sunset.getHours() - 12 : sunset.getHours()
  const today = new Date(dateA * 1000);

  return (
    <div className="mainContainer">
      <div className="appContainer">
        <form onSubmit={handleChange}>
          <input type="search" placeholder='City Name' onChange={(e) => setInput(e.target.value)}/>
          <button><i className="fa-solid fa-magnifying-glass"></i></button>  
        </form>
        <div>

            <div className='temp'>
              <div className='round'>
                <span>{weather?.main}</span>
                <h1>{parseFloat((main?.temp - 273.15).toFixed(2))}°C</h1>
              </div>
            </div>

            <div className='cityName'>
              <h3>{name} - {sys?.country}</h3>
              <p>{dayArray[today.getDay()] + " - " + today.getDate() + " " + monthArray[today.getMonth()] + ", " + today.getFullYear()}</p>
            </div>

            <div className='sunrise'>
                <p>
                  <span>Sunrise</span> 
                  <span>
                    {dayArray[sunrise.getDay()]
                     + " " + formatA + ":" + 
                     sunrise.getMinutes()}
                     {sunrise.getHours() > 12 ? "PM" : "AM"}
                  </span>
                </p>
                <p className='sunset'>
                  <span>Sunset</span>
                  <span>
                    {dayArray[sunset.getDay()] 
                    + " " + formatB + ":" + 
                    sunset.getMinutes()}
                    {sunset.getHours() > 12 ? "PM" : "AM"}
                  </span>
                </p>
            </div>

            <div className='lonlat'>
              <p>Lon {lonlat?.lon}</p>
              <p>Lat {lonlat?.lat}</p>
            </div>

            <div className='tempDesc'><p>Feels Like</p>
                <p>{parseFloat((main?.feels_like - 273.15).toFixed(2))}
                °</p>
            </div>

            <div className='tempDesc'>
                <p>Min {parseFloat((main?.temp_min - 273.15).toFixed(2))}°</p>
                <p>Max {parseFloat((main?.temp_max - 273.15).toFixed(2))}°</p>
            </div>

            <div className='tempDesc'>
                <p>Pressure - {main?.pressure}</p>
                <p>Humidity - {main?.humidity}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
