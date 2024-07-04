import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    

    const search = async(city) =>{
        if(city === ""){
            alert("Enter City name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            //const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity :data.main.humidity,
                windSpeed : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location : data.name,
                icon :`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                description:data.weather[0].description
            })
        }catch(error){
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }
    useEffect(()=>{
        search("Kanpur");
    },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input  ref ={inputRef} type="text" name="" id="" placeholder='search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>
        {weatherData?<><img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <p className='description'>{weatherData.description}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div></>:<></>}
    </div>
  )
}

export default Weather
