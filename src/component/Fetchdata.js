import React,{useState,useEffect} from 'react';
import WeatherUi from './WeatherUi';
import LoadingBar from 'react-top-loading-bar';

function Fetchdata(){
    
     const [cityName, setCityName] = useState('jind');
     const [loading,setLoader] = useState(false);
     const [weatherdata,setweatherdata] = useState(null);
     const [forecast,setforecast] = useState(null);
     const [daysforecast, setdaysforecast] = useState(null);
     const [progress,setprogress] = useState(0);

     const apikey = "9c771950e1e7681b3dc224e18a08e2cb";

     const fetchWeatherdata = ()=>{
        setLoader(true);
        setweatherdata(null);
        setprogress(20)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`)
        .then(response => response.json())
        .then(data=> {
            setprogress(50)
            console.log('weather data:'+JSON.stringify(data));
            setweatherdata(data);
            setLoader(false);
            setprogress(100)
        });

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}`)
        .then(response => response.json())
        .then(data=>  {
            setforecast(data);
            console.log(data)
        });

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}&cnt=40`)
        .then(response => response.json())
        .then(data => {
            console.log("7 days data"+JSON.stringify(data));
            setdaysforecast(data);
        })
     }

     useEffect(()=>{
        fetchWeatherdata();
     },[cityName]);

    
    return(
        <>
        <LoadingBar color=' linear-gradient(90deg,#ac54bf 0%, #6076da 80%)' progress={progress} height={'1.5px'} />
        <WeatherUi cityName={cityName} setCityName={setCityName} setprogress={setprogress}  fetchWeatherdata={fetchWeatherdata} weatherdata={weatherdata} setLoader={setLoader} loading={loading} forecast={forecast} daysforecast={daysforecast}/>
        </>
    );
};
export default Fetchdata;