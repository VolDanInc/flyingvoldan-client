//import { getActiveElement } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
//import CreateAircraft from './CreateAircraft';
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
           
            {/* <CreateAircraft refreshAircrafts = {fetchAircrafts} /> */}
        
        {
            aircrafts.map((aircraft, index) => {
                return (
                    <div className="card" key={index}>
                        
                        <p>Aircraft: {aircraft.name}</p>
                        <img src={aircraft.img} alt="No picture"/>
                        <p>Description: {aircraft.description}</p>
                        <p>Price: {aircraft.price}$ per person per hour.</p>
                        <p>Seats: {aircraft.seats}</p>

                        <Link to={`/aircrafts/${aircraft._id}`}> Details</Link> <> </>
                        {user 
                        ? (user.isAdmin ? <Link to={`/aircrafts/edit/${aircraft._id}`}>Edit</Link> : 
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
