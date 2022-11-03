import React from 'react'
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';


function AircraftDetailsPage(props) {
  const [aircraft, setAircraft] = useState(null);
  const { aircraftId } = useParams();
  const { user } = useContext(AuthContext);

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
  useEffect(() => {
    getAircraft();
  }, []);

  return (
    <div className='centerCard'>
      {aircraft && (
     
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
                currentTarget.src = "https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
              }} />
            <Card.Body >
              <Card.Title id="cardTitle">{aircraft.name}</Card.Title>
              <Card.Text id="aircraftDesc">{aircraft.description}</Card.Text>
              <div className='aircraftSpace'>
              <Card.Text id="aircraftPrice"> Price: {aircraft.price}$ per person per hour.</Card.Text>
              <Card.Text id="aircraftSeats">  Seats: {aircraft.seats}</Card.Text>
              <Card.Text id="aircraftAv">Availability: 
            <span className='timeTable'>{aircraft.timetable[0]}</span> 
            <span className='timeTable'>{aircraft.timetable[1]}</span>
            <span className='timeTable'>{aircraft.timetable[2]}</span>
            
          </Card.Text>
          </div>
          {user
            ? (user.isAdmin ? <Link className="btn btn-outline-secondary" to={`/aircrafts/edit/${aircraft._id}`} role="button">Edit</Link> :
              <Link className="btn btn-outline-secondary" to={`/trips/create/${aircraft._id}`} role="button">Book now</Link>)
            : <></>}
            </Card.Body>
          </Card>
       
      )}

    </div>
  )
}

export default AircraftDetailsPage
