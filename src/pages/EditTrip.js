// src/pages/EditProjectPage.js
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT
import { useState, useEffect } from "react";
import axios from "axios";


const API_URL = "http://localhost:5005";

function EditProjectPage(props) {
    const [startTrip, setStartTrip] = useState("");
    const [duration, setDuration] = useState("");
    const { tripId } = useParams();
    const redirect = useNavigate();

    useEffect(() => {                                  // <== ADD
        axios
            .get(`${API_URL}/trips/${tripId}`)
            .then((response) => {
                /* 
                  We update the state with the project data coming from the response.
                  This way we set inputs to show the actual title and description of the project
                */
                const oneTrip = response.data;
                setStartTrip(oneTrip.startTrip);
                setDuration(oneTrip.duration);
            })
            .catch((error) => console.log(error));

    }, [tripId]);

    const handleFormSubmit = (e) => {                     // <== ADD
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { startTrip, duration };

        // Make a PUT request to update the project
        axios
            .put(`${API_URL}/trips/${tripId}`, requestBody)
            .then((response) => {
                // Once the request is resolved successfully and the project
                // is updated we navigate back to the details page
                redirect(`/trips`)
            });
    };

    const deleteTrip = () => {                    //  <== ADD
        // Make a DELETE request to delete the project
        axios
          .delete(`${API_URL}/trips/${tripId}`)
          .then(() => {
            // Once the delete request is resolved successfully
            // navigate back to the list of projects.
            redirect(`/trips`)
          })
          .catch((err) => console.log(err));
      };  

      return (
        <div className="EditTrip">
            <h3>Edit Trip</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Start Trip:</label>
                <input
                    type="text"
                    name="startTrip"
                    value={startTrip}
                    onChange={(e) => setStartTrip(e.target.value)}
                />


                <label>Duration:</label>
                <select name="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
                    <option value="30" >30</option>
                    <option value="60" >60</option>
                    <option value="90" >90</option>
                    <option value="120" >120</option>
                </select>

                <button type="submit">Save changes</button>
                <button onClick={deleteTrip}>Delete Trip</button>
            </form>
        </div>
    );
}

export default EditProjectPage;