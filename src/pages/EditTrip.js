// src/pages/EditProjectPage.js
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";



function EditTrip(props) {
    const [startTrip, setStartTrip] = useState("");
    const [duration, setDuration] = useState("");
    const [peoplesNum, setPeoplesNum] = useState("1");
    const [aircraftId, setAircraftId] = useState("1");
    const { tripId } = useParams();
    const redirect = useNavigate();
    const { user } = useContext(AuthContext);
    let userId = "";
    if (user) {
        userId = user._id;
    }

    useEffect(() => {                                  // <== ADD
        axios
            .get(`${process.env.REACT_APP_API_URL}/trips/${tripId}`)
            .then((response) => {
                /* 
                  We update the state with the project data coming from the response.
                  This way we set inputs to show the actual title and description of the project
                */
                const oneTrip = response.data;
                setStartTrip(oneTrip.startTrip);
                setDuration(oneTrip.duration);
                setPeoplesNum(oneTrip.peoplesNum);
                setAircraftId(oneTrip.aircraftId);
            })
            .catch((error) => console.log(error));

    }, [tripId]);

    const handleFormSubmit = (e) => {                     // <== ADD
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { startTrip, duration, peoplesNum };

        // Make a PUT request to update the project
        axios
            .put(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, requestBody)
            .then((response) => {
                // Once the request is resolved successfully and the project
                // is updated we navigate back to the details page
                redirect(`/trips/user/${userId}`);
            });
    };

    const deleteTrip = () => {                    //  <== ADD
        // Make a DELETE request to delete the project
        axios
            .delete(`${process.env.REACT_APP_API_URL}/trips/${tripId}`)
            .then(() => {
                // Once the delete request is resolved successfully
                // navigate back to the list of projects.
                redirect(`/trips`)
            })
            .catch((err) => console.log(err));
    };
    let startAt = "";
    return (
        
        <div className="forms">
            {startAt = startTrip.slice(0, 16).split('T')}
            <h3>Edit Trip</h3>
            <p>You can not change start time here, please cansel this booking and create new!</p>
            <form onSubmit={handleFormSubmit}>
                <label>Start Trip: <span>{startAt[0]} at {startAt[1]}</span></label>
                <label>Duration:</label>
                <select name="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
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
                    max={aircraftId.seats}
                    value={peoplesNum}
                    onChange={(e) => setPeoplesNum(e.target.value)}
                />

                <button type="submit">Save changes</button>
                <button onClick={deleteTrip}>Delete Trip</button>
            </form>
        </div>
    );
}

export default EditTrip;