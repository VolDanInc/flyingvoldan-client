import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth.context';



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
        <div className="TripsPage">
            {
                tripsArr.map((trip, index) => {
                    //console.log(trip.aircraftId);
                    takeOff = trip.startTrip.slice(0, 16).split('T');
                    createTime = trip.createdAt.slice(0, 16).split('T');
                    return (isLoggedIn &&
                        <div className="TripsPage" key={index}>
                            <h3>Created by: {trip.userId.name}</h3>
                            <p>Aircraft: {trip.aircraftId.name}</p>
                            <p>Take off: {takeOff[0]} at {takeOff[1]}</p>
                            <p>Duration: {trip.duration}</p>
                            <p>Passengers: {trip.peoplesNum}</p>
                            <p>Cost: {trip.peoplesNum * trip.aircraftId.price * Number(trip.duration) / 60}$</p>
                            <p>Created: {createTime[0]} at {createTime[1]}</p>

                            {user && user.isAdmin
                                ? <hr />
                                : dateTime < trip.startTripNum - 8640000
                                    ? <Link to={`/trips/edit/${trip._id}`}> Edit</Link>
                                    : <Link to={`/trips/details/${trip._id}`}> Leave comment</Link>
                            }
                        </div>
                    );
                })
            }
        </div>
    )
}

export default TripsPage;