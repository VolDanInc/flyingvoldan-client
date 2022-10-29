import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
const API_URL = "http://localhost:5005";

function HomePage() {
    //const {aircraftId} = useParams();
    const [aircrafts, setAircrafts] = useState([]);
    const { user } = useContext(AuthContext);



    const fetchAircrafts = () => {
        axios.get(`${API_URL}/aircrafts`)
            .then((response) => {
                //console.log(response);
                const newAircrafts = response.data;
                setAircrafts(newAircrafts);

            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchAircrafts();
        //console.log('i fire once')
    }, []);
    return (
        <div className="HomePage">
            <h1>Choose aircraft</h1>
        {
            aircrafts.map((aircraft, index) => {
                return (
                    <div className="card" key={index}>
                        
                        <p>Aircraft: {aircraft.name}</p>
                        <p>Description: {aircraft.description}</p>
                        <p>Price: {aircraft.price}$</p>
                        <p>Seats: {aircraft.seats}</p>

                        <Link to={`/aircrafts/${aircraft._id}`}> Details</Link>
                        {user 
                        ? (user.isAdmin ? <Link to={`/aircrafts/edit/${aircraft._id}`}>Edit aircraft</Link> : 
                        <Link to={`/trips/create/${aircraft._id}`}>Book trip</Link>)
                        : <></>}
                    </div>
                );
            })
        }
        </div>
            
           
        
    )
}

export default HomePage
