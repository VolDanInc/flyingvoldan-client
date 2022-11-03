import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function TripsPage() {

    const [tripsArr, setTripsArr] = useState([]);
    const [tripId, setTripId] = useState("");
    const [tripStatus, setTripStatus] = useState("");
    const [dateTime, setDateTime] = useState(new Date().valueOf());
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { isLoggedIn, user } = useContext(AuthContext);
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
    }, []);

    const handleFormSubmit = (e, tripId) => {       
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { tripStatus };

        // Make a PUT request to update the project
        axios
            .put(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, requestBody)
            .then((response) => {
                // Once the request is resolved successfully and the project
                // is updated we navigate back to the details page
                //redirect(`/`)
                console.log("Approved....." + response);
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
                                style={{ width: '28rem' }}
                                className="mb-2" >
                                <Card.Body className="tripsCards">
                                    <h3>Created by: {trip.userId.name}</h3>
                                    <p>Created: {createTime[0]} at {createTime[1]}</p>
                                    {/* <Card.Img className="cardImg" variant="top" src={aircraft.img}onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
                            }} /> */}
                                    <p>{trip.aircraftId.name}</p>
                                    <p>Duration: {trip.duration} minutes</p>
                                    <p>Passengers: {trip.peoplesNum}</p>
                                    <p>Cost: {trip.peoplesNum * trip.aircraftId.price * Number(trip.duration) / 60}$</p>
                                    <p>Take off: {takeOff[0]} at {takeOff[1]}</p>

                                    {user && user.isAdmin
                                        ? <><Button variant="outline-secondary" onClick={(e) => {
                                            setTripId(trip._id);
                                            console.log(tripId);
                                            setTripStatus("Approved", tripId);
                                            handleFormSubmit(e, tripId)
                                            }} >Approve trip</Button>
                                            <Button variant="outline-secondary" onClick={(e) => {
                                                setTripId(trip._id);
                                                setTripStatus("Canceled");
                                                handleFormSubmit(e)
                                            }} >Cancel trip</Button></>
                                        : dateTime < trip.startTripNum - 86400000
                                            ? <>
                                                <p className="approved">Status: Approved</p>
                                                <Link to={`/trips/edit/${trip._id}`}> Edit</Link>
                                            </>
                                            : dateTime > trip.startTripNum - 86400000 && dateTime < trip.startTripNum
                                                ? <p className="waiting">Status: Waiting for taking off</p>
                                                : dateTime > trip.startTripNum && dateTime < trip.startTripNum + Number(trip.duration) * 6000
                                                    ? <p className="takeOff">Status: Took off</p>
                                                    : <>
                                                        <p className="landed">Status: Landed</p>
                                                        <Link to={`/trips/details/${trip._id}`}> Leave comment</Link>
                                                    </>
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