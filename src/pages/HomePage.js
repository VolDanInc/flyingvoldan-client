//import { getActiveElement } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
                        // <div className="card" key={index}>

                        //     <p>Aircraft: {aircraft.name}</p>

                        //     <img
                        //         width="700"
                        //         height="400"
                        //         src={aircraft.img} onError={({ currentTarget }) => {
                        //             currentTarget.onerror = null;
                        //             currentTarget.src = "https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
                        //         }} />

                        //     <p>Seats: {aircraft.seats}</p>

                        //     <Link to={`/aircrafts/${aircraft._id}`}> Details</Link> <> </>
                        //     {user
                        //         ? (user.isAdmin ? <Link to={`/aircrafts/edit/${aircraft._id}`}>Edit</Link> :
                        //             <Link to={`/trips/create/${aircraft._id}`}>Book trip</Link>)
                        //         : <></>}
                        // </div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={aircraft.img} onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
                            }} />
                            <Card.Body>
                                <Card.Title>Aircraft: {aircraft.name}</Card.Title>
                                <Card.Text>
                                    Seats: {aircraft.seats}
                                </Card.Text>
                                <Link class="btn btn-outline-secondary" to={`/aircrafts/${aircraft._id}`} role="button"> Details</Link>
                                {user
                                    ? (user.isAdmin ? <Link class="btn outline-secondary" to={`/aircrafts/edit/${aircraft._id}`} role="button">Edit</Link> :
                                    <Link class="btn btn-outline-secondary" to={`/trips/create/${aircraft._id}`} role="button">Book trip</Link>)
                                    : <></>}
                            </Card.Body>
                        </Card>

                    );
                })
            }
        </div>



    )
}

export default HomePage
