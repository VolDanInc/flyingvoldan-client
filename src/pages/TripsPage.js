import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';                  

const API_URL = "http://localhost:5005";

function TripsPage() {

    const [tripsArr, setTripsArr] = useState([]);
    //const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { isLoggedIn } = useContext(AuthContext);


    const getTrips = () => {


        axios.get(`${API_URL}/trips`)
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
                return (isLoggedIn && 
                    <div className="TripsPage" key={index}>
                        <h1>Your trips</h1>
                        <p>Aircraft: {trip.aircraftId}</p>
                        <p>Take off at: {trip.startTrip}</p>
                        <p>Duration: {trip.duration}</p>
                        <p>Created: {trip.createdAt}</p>

                        <Link to={`/trips/edit/${trip._id}`}> Edit</Link>
                    </div>
                );
            })
        }
        </div>
    )
}

export default TripsPage;