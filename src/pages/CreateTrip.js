// src/pages/CreateTrip.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";


function CreateTrip(props) {
    //const [aircraftId, setAircraftId] = useState("");
    const [startTrip, setStartTrip] = useState("");
    const [duration, setDuration] = useState("");
    const { aircraftId } = useParams();
    const redirect = useNavigate();

    const handleSubmit = (e) => {      //  <== UPDATE THE FUNCTION
        e.preventDefault();

        // We need the project id when creating the new task

        // Create an object representing the body of the POST request
        const requestBody = { aircraftId, startTrip, duration };

        axios
            .post(`${API_URL}/trips`, requestBody)
            .then((response) => {
                // Reset the state to clear the inputs
                setStartTrip("");
                setDuration("");
                redirect("/trips");
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


                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default CreateTrip;