import React from 'react'

export default function Input(props) {
  return (
    <div>
      <div className='d-flex align-items-center '>
                        <input type='search' placeholder='Search for cities' value={props.cityName} onChange={(e)=> props.setCityName(e.target.value)} onInput={props.fetchWeatherdata} autoFocus className='border-0 p-2 px-3 text-light forecast bg-secondary w-100 mt-2 rounded-pill'/>
                          <i className={`fa-solid fa-${props.mode} px-5 mt-2 ${props.animation}`} style={{fontSize:'30px',color:`${props.logocolor}`,width:'40px'}}></i>
                    </div>
    </div>
  )
}
