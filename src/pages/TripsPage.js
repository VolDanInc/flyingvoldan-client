import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

function TripsPage() {

    const [tripsArr, setTrips] = useState([]);
    //const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    //
    //const navigate = useNavigate();
    //const { storeToken, authenticateUser } = useContext(AuthContext);
    //
    //const handleEmail = (e) => setEmail(e.target.value);
    //const handlePassword = (e) => setPassword(e.target.value);


    const getTrips = () => {


        axios.get(`${API_URL}/trips`)
            .then((response) => {
                console.log(response.data);
                setTrips(response.data);
                console.log(tripsArr);
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
        <div className="LoginPage">
            <h1>Your trips</h1>
            <p>Aircraft: {tripsArr[0].aircraftId}</p>
            <p>Take off at: {tripsArr.startTrip}</p>
            <p>Duration: {tripsArr.duration}</p>

            <Link to={"/"}> Home</Link>
        </div>
    )
}

export default TripsPage;