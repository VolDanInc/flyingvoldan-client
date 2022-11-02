// src/pages/EditProjectPage.js
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

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
    startAt = startTrip.slice(0, 16).split('T')
    return (

        <div className="forms">

            <Form onSubmit={handleFormSubmit}
                style={{
                    width: '60vw',
                    backgroundColor: "#393838",
                    padding: "20px",
                    borderRadius: "10px",
                    marginTop: "10%"
                }}>
                <Form.Text className="text-light"><h3>Edit Trip</h3></Form.Text>
                <Form.Text className="text-light">You can not change start time here, please cancel this booking and create new!</Form.Text>

                <Row>
                    <Col>
                        <Card className="mb-3">
                            <Form.Text>Start Trip:</Form.Text>
                            <span>{startAt[0]} at {startAt[1]}</span>
                        </Card>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingDuration" label="Duration:" className="mb-3">
                            <Form.Select value={duration} onChange={(e) => setDuration(e.target.value)}>
                                <option value="30" >30</option>
                                <option value="60" >60</option>
                                <option value="90" >90</option>
                                <option value="120" >120</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingDatePeople" label="Peoples number:" className="mb-3">
                            <Form.Control type="number"
                                min="1"
                                max={aircraftId.seats}
                                value={peoplesNum}
                                onChange={(e) => setPeoplesNum(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Button variant="outline-secondary" type="submit">Save changes</Button>
            </Form>


        </div>
    );
}

export default EditTrip;