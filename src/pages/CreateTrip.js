// src/pages/CreateTrip.js

import { useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
const API_URL = "http://localhost:5005";


function CreateTrip(props) {
    //const [aircraftId, setAircraftId] = useState("");
    const [startTrip, setStartTrip] = useState("");
    const [startTripNum, setStartTripNum] = useState(new Date().valueOf());
    const [review, setReview] = useState("");
    const [reviewStars, setReviewStars] = useState("5");

    const [duration, setDuration] = useState("30");
    const { aircraftId } = useParams();
    const redirect = useNavigate();
    const { user } = useContext(AuthContext);
    let userId = "";
    if (user) {
        userId = user._id;
    }


    const handleSubmit = (e) => {      //  <== UPDATE THE FUNCTION
        e.preventDefault();

        // We need the project id when creating the new task

        // Create an object representing the body of the POST request
        const requestBody = { aircraftId, userId, startTrip, startTripNum, review, reviewStars, duration };
    
        axios
            .post(`${API_URL}/trips`, requestBody)
            .then((response) => {
                // Reset the state to clear the inputs
                setStartTrip("");
                setStartTripNum(0);
                setReview("");
                setReviewStars("5");
                setDuration("30");
                redirect(`/trips/user/${userId}`);
                // Invoke the callback function coming through the props
                // from the ProjectDetailsPage, to refresh the project details
                //props.refreshProject();
            })
            .catch((error) => console.log(error));
    };


    return (
        <div className="AddTrip">
            <h3>Add New Trip</h3>

            <form onSubmit={handleSubmit}>
                <label>Start Trip:</label>
                <input
                    type="text"
                    name="startTrip"
                    value={startTrip}
                    onChange={(e) => setStartTrip(e.target.value)}
                />


                <label>Duration:</label>
                <select name="duration" onChange={(e) => setDuration(e.target.value)}>
                    <option value="30" >30</option>
                    <option value="60" >60</option>
                    <option value="90" >90</option>
                    <option value="120" >120</option>
                </select>

                <button type="submit">Add Trip</button>
            </form>
        </div>
    );
}

export default CreateTrip;