import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';


function AircraftDetailsPage(props) {
    const [aircraft, setAircraft] = useState(null);
    const {aircraftId} = useParams();


    const getAircraft = () => {
     //   const storedToken = localStorage.getItem ("authToken")
        axios.get(`${process.env.REACT_APP_API_URL}/aircrafts/${aircraftId}`)
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
    <div className='centerCard'>
        {aircraft && (
            <>
            <Card
             bg='dark'
            //  key={index}
             text='white'
             style={{ width: '48rem' }}
             className="mb-2"> 
           <Card.Img
           className='cardImgDetails' variant='top'
           width="1000" 
           height="400"
           src={aircraft.img} onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src="https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
          }}/>
          <Card.Body>
          <Card.Title id="cardTitle">{aircraft.name}</Card.Title>
          <Card.Text id="cardDescription">{aircraft.description}</Card.Text>
          <Card.Text> Price: {aircraft.price}$ per person per hour.</Card.Text>
          <Card.Text>  Seats: {aircraft.seats}</Card.Text>
          <Card.Text>  Availability: {aircraft.timetable}</Card.Text>
            </Card.Body>
            </Card>
          </>
        )}
      
    </div>
  )
}

export default AircraftDetailsPage
