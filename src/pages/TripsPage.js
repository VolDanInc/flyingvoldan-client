import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

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

        axios.get(`${API_URL}/trips/user/${userId}`)
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

    return (
        <div className="TripsPage">
            {
                tripsArr.map((trip, index) => {
                    //console.log(trip.aircraftId);
                    return (isLoggedIn &&
                        <div className="TripsPage" key={index}>
                            <h3>Created by: {trip.userId.name}</h3>
                            <p>Aircraft: {trip.aircraftId.name}</p>
                            <p>Take off at: {trip.startTrip}</p>
                            <p>Duration: {trip.duration}</p>
                            <p>Passengers: {trip.peoplesNum}</p>
                            <p>Cost: {trip.peoplesNum * trip.aircraftId.price * Number(trip.duration) / 60}$</p>
                            <p>Created: {trip.createdAt}</p>

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