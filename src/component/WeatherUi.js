import React,{useState} from 'react';
import Input from './Input';
import logo from '../logo.gif';
import Logo from '../logo2.gif';
import Spinner from './spinner';
import image from '../image.gif';
// import loot from '../logo3.gif';
import './weather.css';

function WeatherUi(props){
     
    const [mode,setmode] = useState('moon')
    const [textmode, settextmode] = useState('Light Mode')
    const [color ,setcolor] = useState('danger')
    const [logocolor, setlogocolor] = useState('snow')
    const [textcolor,settextcolor] = useState('light')
    const [animation,setanimation] = useState('null')


    const clickhere = ()=>{
        if(mode === 'moon'){
           props.setprogress(50)
            setmode('sun');
            document.body.classList.add('bg')
            document.body.classList.remove('bg-dark')
            settextmode('Dark Mode')
            setcolor('success');
            setlogocolor('yellow')
            settextcolor('secondary')
            setanimation('itz')
            props.setprogress(90)
        }
        
        else{
          props.setprogress(50)
            setmode('moon');
            document.body.classList.add('bg-dark')
            document.body.classList.remove('bg')
            settextmode('Light Mode')
            setcolor('danger')
            setlogocolor('snow')
            settextcolor('light')
            setanimation('null')
            props.setprogress(100)
        }
    }
        
     const feranitetocelceious = (kelvin)=>{
        return (kelvin-273.15);
     }

     const clicking = ()=>{
       props.setprogress(50)
       setTimeout(() => {
        props.setprogress(100)
       }, 2000);
     }
     const getdatetime = (timeshow) =>{
        const date = new Date(timeshow*1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
     }
     const suntime = (time)=>{
        const date = new Date(time*1000);
        return date.toLocaleTimeString();
     }
     
     console.log(getdatetime(props.weatherdata? props.weatherdata.dt :''))


    const iconUrl = props.weatherdata && props.weatherdata.weather && props.weatherdata.weather[0] ? `http://openweathermap.org/img/wn/${props.weatherdata.weather[0].icon}.png` :logo;
    const temp = props.weatherdata && props.weatherdata.main ? feranitetocelceious(props.weatherdata.main.temp).toFixed():"";
    const maxtemp = props.weatherdata && props.weatherdata.main ? feranitetocelceious(props.weatherdata.main.temp_max).toFixed():"";
    const mintemp = props.weatherdata && props.weatherdata.main? feranitetocelceious(props.weatherdata.main.temp_min).toFixed():"";
    const todayforecast = props.forecast && props.forecast.list ? props.forecast.list.slice(0,8):[];
    const humedity = props.weatherdata && props.weatherdata.main? props.weatherdata.main.humidity:"Oops!";
    const Sunrise = props.weatherdata && props.weatherdata.sys? suntime(props.weatherdata.sys.sunrise):"Oops!";
    const sunset = props.weatherdata && props.weatherdata.sys? suntime(props.weatherdata.sys.sunset):"Oops!";
    const wind = props.weatherdata && props.weatherdata.wind? props.weatherdata.wind.speed:"oops!";
    const rainchance = props.weatherdata && props.weatherdata.clouds? props.weatherdata.clouds.all:"Oops!";
     return(
        <>
        <div className="container-fluid ">
          
            <div className="row mt-4 mx-2 mb-4  gap-5">
                <div className='col-md-1 bg-secondary forecast opacity rounded media mx-2 '  style={{height:'670px'}}>
                    <div className='d-flex justify-content-center align-item-center  flex-column ' onClick={clicking}>
                   <img src={Logo} alt="loading..."  className=" d-flex w-75 justify-content-center align-item-center mx-3 " style={{}}/>
                     <div className='mt-5 d-flex justify-content-center align-item-center flex-column gap-1 flex-wrap' onClick={clicking}>
                     <i className={`fa-solid fa-cloud-moon-rain text-${textcolor} d-flex justify-content-center`}></i>
                     <h6 className={`text-${textcolor} d-flex justify-content-center`}>Weather</h6>
                     </div>
                     <div className='mt-5 d-flex justify-content-center align-item-center flex-column gap-1 flex-wrap' onClick={clicking}>
                     <i className={`fa-solid fa-filter text-${textcolor} d-flex justify-content-center`}></i>
                     <h6 className={`text-${textcolor} d-flex justify-content-center`}>Cities</h6>
                     </div>
                     <div className='mt-5 d-flex justify-content-center align-item-center flex-column gap-1 flex-wrap'>
                      
                     <div class="form-check form-switch d-flex align-items-center justify-content-center">
                             <input className={`form-check-input bg-${color}`} type="checkbox" role="switch" id="flexSwitchCheckChecked"  onClick={clickhere} />
                    </div>
                        
                     <h6 className={`text-${textcolor} d-flex justify-content-center`}>{textmode}</h6>
                     </div>
                    </div>
                </div>
                <div className={`col-md-7  forecast rounded text-${textcolor}`}>
                      <Input setCityName={props.setCityName} mode={mode} animation={animation} logocolor={logocolor} cityName={props.cityName} fetchWeatherdata={props.fetchWeatherdata}></Input>
                    <div className='d-flex justify-content-between mt-5 align-item-center mx-4 '>
                        <div>
                            <div>
                            <h1>{props.weatherdata? props.weatherdata.name:<Spinner/>}</h1>
                            <p >{props.weatherdata && props.weatherdata.weather ? props.weatherdata.weather[0].description:""}</p>
                            </div>
                            <div className='position-relative'>
                            <b style={{fontSize:'20px'}} className='position-absolute pt-3 px-3'>{temp}{props.weatherdata && props.weatherdata.main?<span><sup>o</sup>c</span>:""}</b>
                            <img src={props.weatherdata && props.weatherdata.main?image:''} style={{width:'70px'}} alt="loading..."/>
                            </div>
                        </div>
                        <div className='d-flex flex-column  '>
                            <img src={iconUrl} alt="loading..." className='' style={{width:'130px',height:'130px',Top:'-10px'}} />
                            <b>{getdatetime(props.weatherdata? props.weatherdata.dt :"")}</b>
                        </div>
                    </div>
                    <div className='d-flex flex-column mt-5 bg-secondary p-3 rounded forecast overflow-auto'>
                        <div>
                        <p>TODAY'S FORECAST</p>
                        </div>
                        <div className='d-flex flex-column justify-content-evenly flex-wrap gap-3  forecast overflow-auto' style={{height:'120px', width:'auto'}}>
                           {todayforecast.map((Element,index)=>(
                              <div className=' border-end d-flex flex-column gap-2 justify-content-center align-items-center px-4'>
                              <b>{new Date(Element.dt_txt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }</b>
                              <img
                             src={`http://openweathermap.org/img/wn/${Element.weather[0].icon}.png`}
                            alt="loading..."
                           style={{ width: '50px', height: '50px' }} />
                              <b>{feranitetocelceious(Element.main.temp).toFixed()}<sup>o</sup></b>
                             </div>
                           ))} 
                        </div>
                    </div>
                    <div className='bg-secondary mt-3  rounded forecast overflow-auto'>
                        <div className='p-3 '><b>Weather component</b></div>
                        <div className='d-flex justify-content-around  pb-5 pt-2 forecast overflow-auto' style={{height:'95px',width:'auto'}}>
                            <div className='d-flex flex-column gap-3 '>
                                <div className='px-3 d-flex justify-content-center align-item-center flex-column'>
                                    <div>
                                    <i className="fa-solid fa-temperature-three-quarters"></i>
                                    <b> Temprature</b>
                                    </div>
                                    <b style={{textAlign:'center',fontSize:'22px'}}>{temp} {props.weatherdata && props.weatherdata.main? <sup>o</sup> :"Oops ! "} </b>
                                </div>
                                <div className='px-3 d-flex justify-content-center align-item-center flex-column'> 
                                <div>
                                <i class="fa-solid fa-temperature-arrow-up"></i>
                                    <b className='px-2'>Humedity</b>
                                    </div>
                                    <b style={{textAlign:'center',fontSize:'22px'}}>{humedity}</b>
                                </div>
                                <div className='px-3 d-flex justify-content-center align-item-center flex-column'> 
                                <div>
                                <i class="fa-solid fa-sun"></i>
                                    <b className='px-2'>Sunrise</b>
                                    </div>
                                    <b style={{textAlign:'center',fontSize:'22px'}}>{Sunrise}</b>
                                </div>
                                <div className='px-3 d-flex justify-content-center align-item-center flex-column'> 
                                <div>
                                <i class="fa-solid fa-temperature-arrow-up"></i>
                                    <b className='px-2'>Max Temp</b>
                                    </div>
                                    <b style={{textAlign:'center',fontSize:'22px'}}>{maxtemp} {props.weatherdata && props.weatherdata.main? <sup>o</sup> :"Oops ! "}</b>
                                </div>
                            </div>
                            <div className='d-flex gap-3 flex-column'>
                            <div className='px-3 d-flex justify-content-center align-item-center flex-column'> 
                                <div>
                                     <i class="fa-solid fa-wind"></i>
                                    <b className='mx-2'>Wind</b>
                                    </div>
                                    <b style={{textAlign:'center',fontSize:'22px'}}>{wind} {props.weatherdata && props.weatherdata.wind? <span>m/h</span>:""}</b>
                                </div>
                            <div className='px-3 d-flex justify-content-center align-item-center flex-column'> 
                                <div>
                                <i class="fa-solid fa-cloud-rain"></i>
                                    <b className='mx-2'> Rain</b>
                                    </div>
                                    <b style={{textAlign:'center',fontSize:'22px'}}>{rainchance}{props.weatherdata && props.weatherdata.clouds ? <span>%</span>:""}</b>
                                </div>
                            <div className='px-3 d-flex justify-content-center align-item-center flex-column'> 
                                <div>
                                <i class="fa-solid fa-moon"></i>
                                    <b className='mx-2'>Sunset</b>
                                    </div>
                                    <b style={{textAlign:'center',fontSize:'22px'}}>{sunset}</b>
                                </div>
                            <div className='px-3 d-flex justify-content-center align-item-center flex-column'> 
                                <div>
                                <i class="fa-solid fa-temperature-arrow-down"></i>
                                    <b className='mx-2'>Min Temp</b>
                                    </div>
                                    <b style={{textAlign:'center',fontSize:'22px'}}>{mintemp}  {props.weatherdata && props.weatherdata.wind? <sup>o</sup>:""}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-md-3 bg-secondary  rounded  text-${textcolor} overflow-auto forecast pb-4 margin`} >
                    <div className={`m-4 d-flex justify-content-center align-items-center bg-secondary rounded day-forecast pt-2`}><h6>5-DAY's FORECAST</h6></div>
                    <div className='overflow-auto forecast' style={{height:'490px'}}>
                    {props.forecast?.list ? props.forecast.list.slice(0,1).map((element,index)=>(
                    <div style={{height:'200px',width:'auto'}} key={index} className='bg-secondary day-forecast my-3 rounded '>
                      <div className='text-center py-2'><h6>{getdatetime(element.dt)}</h6></div>
                      <div className='d-flex align-items-center justify-content-evenly gap-3 overflow-auto forecast px-2 py-1'>
                        {props.forecast?.list[0] ? props.forecast.list.slice(1,8).map((element,index)=>(
                      <div className=' d-flex align-items-center flex-column'>
                        <p>{new Date(element.dt_txt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                        <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} style={{width:'70px'}} alt="loading..."></img>
                        <p>{feranitetocelceious(element.main.temp).toFixed()}{props.weatherdata && props.weatherdata.main? <sup>o</sup> :" "}{props.weatherdata && props.weatherdata.main? <b>c</b> :" "}</p>
                      </div>
                      )):""}
                      </div>
                    </div>
                    )):""}
                    {props.forecast?.list ? props.forecast.list.slice(9,10).map((element,index)=>(
                    <div style={{height:'200px',width:'auto'}} key={index} className='bg-secondary day-forecast my-3 rounded '>
                      <div className='text-center py-2'><h6>{getdatetime(element.dt)}</h6></div>
                      <div className='d-flex align-items-center justify-content-evenly gap-3 overflow-auto forecast px-2 py-1'>
                        {props.forecast?.list[0] ? props.forecast.list.slice(9,16).map((element,index)=>(
                      <div className=' d-flex align-items-center flex-column'>
                        <p>{new Date(element.dt_txt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                        <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} style={{width:'70px'}} alt="loading..."></img>
                        <p>{feranitetocelceious(element.main.temp).toFixed()}{props.weatherdata && props.weatherdata.main? <sup>o</sup> :" "}{props.weatherdata && props.weatherdata.main? <b>c</b> :" "}</p>
                      </div>
                      )):""}
                      </div>
                    </div>
                    )):""}
                    {props.forecast?.list ? props.forecast.list.slice(17,18).map((element,index)=>(
                    <div style={{height:'200px',width:'auto'}} key={index} className='bg-secondary day-forecast my-3 rounded '>
                      <div className='text-center py-2'><h6>{getdatetime(element.dt)}</h6></div>
                      <div className='d-flex align-items-center justify-content-evenly gap-3 overflow-auto forecast px-2 py-1'>
                        {props.forecast?.list[0] ? props.forecast.list.slice(17,24).map((element,index)=>(
                      <div className=' d-flex align-items-center flex-column'>
                        <p>{new Date(element.dt_txt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                        <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} style={{width:'70px'}} alt="loading..."></img>
                        <p>{feranitetocelceious(element.main.temp).toFixed()}{props.weatherdata && props.weatherdata.main? <sup>o</sup> :" "}{props.weatherdata && props.weatherdata.main? <b>c</b> :" "}</p>
                      </div>
                      )):""}
                      </div>
                    </div>
                    )):""}
                    {props.forecast?.list ? props.forecast.list.slice(25,26).map((element,index)=>(
                    <div style={{height:'200px',width:'auto'}} key={index} className='bg-secondary day-forecast my-3 rounded '>
                      <div className='text-center py-2'><h6>{getdatetime(element.dt)}</h6></div>
                      <div className='d-flex align-items-center justify-content-evenly gap-3 overflow-auto forecast px-2 py-1'>
                        {props.forecast?.list[0] ? props.forecast.list.slice(25,32).map((element,index)=>(
                      <div className=' d-flex align-items-center flex-column'>
                        <p>{new Date(element.dt_txt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                        <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} style={{width:'70px'}} alt="loading..."></img>
                        <p>{feranitetocelceious(element.main.temp).toFixed()}{props.weatherdata && props.weatherdata.main? <sup>o</sup> :" "}{props.weatherdata && props.weatherdata.main? <b>c</b> :" "}</p>
                      </div>
                      )):""}
                      </div>
                    </div>
                    )):""}
                    {props.forecast?.list ? props.forecast.list.slice(33,34).map((element,index)=>(
                    <div style={{height:'200px',width:'auto'}} key={index} className='bg-secondary day-forecast my-3 rounded '>
                      <div className='text-center py-2'><h6>{getdatetime(element.dt)}</h6></div>
                      <div className='d-flex align-items-center justify-content-evenly gap-3 overflow-auto forecast px-2 py-1'>
                        {props.forecast?.list[0] ? props.forecast.list.slice(33,40).map((element,index)=>(
                      <div className=' d-flex align-items-center flex-column'>
                        <p>{new Date(element.dt_txt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }</p>
                        <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} style={{width:'70px'}} alt="loading..." ></img>
                        <p>{feranitetocelceious(element.main.temp).toFixed()}{props.weatherdata && props.weatherdata.main? <sup>o</sup> :" "}{props.weatherdata && props.weatherdata.main? <b>c</b> :" "}</p>
                      </div>
                      )):""}
                      </div>
                    </div>
                    )):""}
                    </div>
                </div>
            </div>
        </div>
        </>
     );
};
export default WeatherUi;