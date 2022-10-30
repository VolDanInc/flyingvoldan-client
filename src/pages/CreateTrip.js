// src/pages/CreateTrip.js

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import DateTimePicker from 'react-datetime-picker';
const API_URL = "http://localhost:5005";


function CreateTrip(props) {
    //const [aircraftId, setAircraftId] = useState("");
    const [startTrip, setStartTrip] = useState(new Date());
    const [startTripNum, setStartTripNum] = useState(new Date().valueOf());
    const [review, setReview] = useState("");
    const [reviewStars, setReviewStars] = useState("5");
    const [peoplesNum, setPeoplesNum] = useState("1");
    const [duration, setDuration] = useState("30");
    const [timetable, setTimetable] = useState([]);
    const [message, setMessage] = useState("");

    const { aircraftId } = useParams();
    //const [value, onChange] = useState(new Date());
    const redirect = useNavigate();
    const { user } = useContext(AuthContext);
    let userId = "";
    if (user) {
        userId = user._id;
    }

    useEffect(() => {
        axios
            .get(`${API_URL}/aircrafts/${aircraftId}`)
            .then((response) => {

                const oneAircraft = response.data;
                setTimetable(oneAircraft.timetable);
            })
            .catch((error) => console.log(error));

    }, [aircraftId]);

    const handleSubmit = (e) => {     
        e.preventDefault();
        //console.log(timetable);
        //console.log(startTrip.toLocaleTimeString());
        if (startTrip && timetable.includes(startTrip.toLocaleTimeString())) {
        
        const requestBody = { aircraftId, userId, startTrip, startTripNum, review, reviewStars, duration, peoplesNum };

        axios
            .post(`${API_URL}/trips`, requestBody)
            .then((response) => {
                // Reset the state to clear the inputs
                setStartTrip("");
                setStartTripNum(0);
                setReview("");
                setReviewStars("5");
                setDuration("30");
                setPeoplesNum("1");
                redirect(`/trips/user/${userId}`);
                
            })
            .catch((error) => console.log(error));
            } else {
            return setMessage("Please set the departure time according to the schedule.");
            }
    };


    return (
        <div className="AddTrip">
            <h3>Add New Trip</h3>
            <h3>{message}</h3>

            <p>Daily departure time of this aircraft:</p>
            <p><span>{timetable[0]}</span>||<span>{timetable[1]}</span>||<span>{timetable[2]}</span></p>
            <form onSubmit={handleSubmit}>
                <label>Start Trip:</label>
               
                <DateTimePicker onChange={setStartTrip} value={startTrip} />

                <label>Duration:</label>
                <select name="duration" onChange={(e) => setDuration(e.target.value)}>
                    <option value="30" >30</option>
                    <option value="60" >60</option>
                    <option value="90" >90</option>
                    <option value="120" >120</option>
                </select>

                <label>Peoples number:</label>
                <input
                    type="number"
                    name="peoplesNum"
                    min="1"
                    max="10"
                    value={peoplesNum}
                    onChange={(e) => setPeoplesNum(e.target.value)}
                />

                <button type="submit" onClick={() => { 
                    setStartTripNum(startTrip.valueOf()); 
                    //console.log(startTrip.toLocaleTimeString());
                    }}>Add Trip</button>
            </form>
        </div>
    );
}

export default CreateTrip;