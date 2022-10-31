import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const API_URL = "http://localhost:5005";

function AircraftDetailsPage(props) {
    const [aircraft, setAircraft] = useState(null);
    const {aircraftId} = useParams();


    const getAircraft = () => {
     //   const storedToken = localStorage.getItem ("authToken")
        axios.get(`${API_URL}/aircrafts/${aircraftId}`)
       // {headers: {Authorization: `Bearer ${storedToken}` }} )
        .then((response) => {
            const oneAircraft = response.data;
            setAircraft(oneAircraft);
          })
          .catch((error) => console.log(error));
    };
    useEffect(()=> {               
        getAircraft();
      }, [] );

  return (
    <div className='AircraftDetails'>
        {aircraft && (
            <>
           <img 
           width="700" 
           height="400"
           src={aircraft.img} onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src="https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
          }}/>
            <h1>{aircraft.name}</h1>
            <p>{aircraft.description}</p>
            <p>Price: {aircraft.price}$ per person per hour.</p>
            <p>Seats: {aircraft.seats}</p>
            <p>Availability: {aircraft.timetable}</p>
            
          </>
        )}
      
    </div>
  )
}

export default AircraftDetailsPage
