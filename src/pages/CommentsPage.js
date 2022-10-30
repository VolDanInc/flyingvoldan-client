import { useState, useEffect } from "react";
import axios from "axios";
//import { Link, useNavigate } from "react-router-dom";
//import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

function CommentsPage() {

    const [tripsArr, setTripsArr] = useState([]);
    //const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    //const { user } = useContext(AuthContext);
    //let userId = "";
    //let userName = "";
    //if (user) {
    //    userId = user._id;
    //    userName = user.name;
    //}

    const getTrips = () => {

        axios.get(`${API_URL}/trips/comments`)
            .then((response) => {
                console.log(response.data);
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
        <div className="CommentsPage">
            {
                tripsArr.map((trip, index) => {
                    return (
                        <div className="Comments" key={index}>
                            <h3>Created by: {trip.userId.name}</h3>
                            <p>Aircraft: {trip.aircraftId.name}</p>
                            <p>Comment: {trip.review}</p>
                            <p>Rating: {trip.reviewStars}</p>
                            <p>Created: {trip.updatedAt}</p>
                            <hr />
                        </div>
                    );
                })
            }
        </div>
    )
}

export default CommentsPage;