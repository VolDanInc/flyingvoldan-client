import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import { Card } from "react-bootstrap";


function TripsPage() {

    const [tripsArr, setTripsArr] = useState([]);
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
    let takeOff = "";
    let createTime = "";
    return (
        <div className="home">
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
                                <Card.Body>
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
                                ? <hr />
                                : dateTime < trip.startTripNum - 86400000
                                    ? <>
                                    <p>Status: Approved</p>
                                    <Link to={`/trips/edit/${trip._id}`}> Edit</Link>
                                    </>
                                    : dateTime > trip.startTripNum - 86400000 && dateTime < trip.startTripNum
                                        ? <p>Status: Wait for taking off</p>
                                        : dateTime > trip.startTripNum && dateTime < trip.startTripNum + Number(trip.duration) * 6000
                                            ? <p>Status: Took off</p>
                                            : <>
                                                <p>Status: Landed</p>
                                                <Link to={`/trips/details/${trip._id}`}> Leave comment</Link>
                                            </>
                            }
                            </Card.Body>
                            </Card>
                            <hr />
                        </div>
                        
                    );
                })
            }
        </div>
    )
}

export default TripsPage;