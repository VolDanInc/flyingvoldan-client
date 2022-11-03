import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import { Card } from "react-bootstrap";
import cover1 from "../styles/cover1.jpg"
import Button from 'react-bootstrap/Button';

function TripsPage() {

    const [tripsArr, setTripsArr] = useState([]);
    const [tripId, setTripId] = useState("");
    const [tripStatus, setTripStatus] = useState("");
    const [dateTime, setDateTime] = useState(new Date().valueOf());
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { isLoggedIn, user } = useContext(AuthContext);
    const redirect = useNavigate();
    let userId = "";
    if (user) {
        userId = user._id;
    }

    const getTrips = () => {

        axios.get(`${process.env.REACT_APP_API_URL}/trips/user/${userId}`)
            .then((response) => {
                //console.log(response.data);
                setTripsArr(response.data);
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);

            })
    };

    useEffect(() => {
        getTrips();
    }, [tripStatus]);

    const handleFormSubmit = (e, tripId, st) => {       
        e.preventDefault();
        // Create an object representing the body of the PUT request
        
        const requestBody = { tripStatus: st };

        // Make a PUT request to update the project
        axios
            .put(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, requestBody)
            .then((response) => {
                // Once the request is resolved successfully and the project
                // is updated we navigate back to the details page
                redirect(`/trips/user/${userId}`);
                //console.log("Approved....." + response);
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);

            })
    };

    let takeOff = "";
    let createTime = "";
    return (
        
        <div className="cards">
            <div className='ratio ratio-16x9'>
        <img  id="tripsImage" src={cover1} />
        </div>
            {
                tripsArr.map((trip, index) => {
                    //console.log(trip.aircraftId);
                    takeOff = trip.startTrip.slice(0, 16).split('T');
                    createTime = trip.createdAt.slice(0, 16).split('T');
                    return (isLoggedIn &&
                        <div className="TripsPage" key={index}>
                              <Card
                            bg='dark'
                            key={index}
                            text='white'
                            style={{ width: '22rem', height:"32rem" }}
                            className="mb-2" >
                                <Card.Body className="tripsCards">
                                    <h3>Booked by: {trip.userId.name}</h3>
                                    <p id="createdAt">Created at: {createTime[0]} at {createTime[1]}</p>
                                    <p>{trip.aircraftId.name}</p>
                                    <p>Duration: {trip.duration} minutes</p>
                                    <p>Passengers: {trip.peoplesNum}</p>
                                    <p>Cost: {trip.peoplesNum * trip.aircraftId.price * Number(trip.duration) / 60}$</p>
                                    <p id="takeOff">Take-off: {takeOff[0]} at {takeOff[1]}</p>
                                    
                                    {user && user.isAdmin
                                        ? trip.tripStatus === "Approved"
                                        ? dateTime < trip.startTripNum 
                                        ? <><p className="approved">Status: {trip.tripStatus}</p>
                                        <Button variant="outline-secondary" onClick={(e) => {
                                                setTripId(trip._id);
                                                setTripStatus("Canceled");
                                                handleFormSubmit(e, trip._id, "Canceled")
                                            }} >Cancel trip</Button></>
                                            :<p className="approved">Status: {trip.tripStatus}</p>
                                        : trip.tripStatus === "Canceled"
                                        ? <p className="approved">Status: {trip.tripStatus}</p>
                                        : <>
                                        <p className="approved">Status: {trip.tripStatus}</p>
                                        
                                        <Button variant="outline-secondary" onClick={(e) => {
                                            setTripId(trip._id);
                                            //console.log(tripId);
                                            setTripStatus("Approved");
                                            handleFormSubmit(e, trip._id, "Approved")
                                            }} >Approve trip</Button>
                                            <Button variant="outline-secondary" onClick={(e) => {
                                                setTripId(trip._id);
                                                setTripStatus("Canceled");
                                                handleFormSubmit(e, trip._id, "Canceled")
                                            }} >Cancel trip</Button>
                                            </>
                                        : trip.tripStatus === "Approved"
                                        ? dateTime < trip.startTripNum - 86400000
                                            ? <>
                                                <p className="approved">Status: Approved</p>
                                                <Link to={`/trips/edit/${trip._id}`}><Button variant="outline-secondary" > Edit</Button> </Link>
                                            </>
                                            : dateTime > trip.startTripNum - 86400000 && dateTime < trip.startTripNum
                                                ? <p className="waiting">Status: Waiting for taking off</p>
                                                : dateTime > trip.startTripNum && dateTime < trip.startTripNum + Number(trip.duration) * 6000
                                                    ? <p className="takeOff">Status: Took off</p>
                                                    : <>
                                                        <p className="landed">Status: Landed</p>
                                                        <Link to={`/trips/details/${trip._id}`}>
                                                        <Button variant="outline-secondary" > Leave comment</Button></Link>
                                                    </>
                                        : <p className="approved">Status: {trip.tripStatus}</p>            
                                    }
                                </Card.Body>
                            </Card>

                        </div>

                    );
                })
            }
        </div>
      
    )
}

export default TripsPage;