// src/pages/CreateTrip.js
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import DateTimePicker from 'react-datetime-picker';



function CreateTrip(props) {
    //const [aircraftId, setAircraftId] = useState("");
    const [startTrip, setStartTrip] = useState(new Date());
    const [startTripNum, setStartTripNum] = useState(new Date().valueOf());
    const [review, setReview] = useState("");
    const [reviewStars, setReviewStars] = useState("5");
    const [peoplesNum, setPeoplesNum] = useState("1");
    const [duration, setDuration] = useState("30");
    const [timetable, setTimetable] = useState([]);
    const [isBusy, setIsBusy] = useState([]);
    const [message, setMessage] = useState("");
    const [seats, setSeats] = useState("");
    const [tripScore, setTripScore] = useState(0);
    const [tripStatus, setTripStatus] = useState("Wait for approve");

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
            .get(`${process.env.REACT_APP_API_URL}/aircrafts/${aircraftId}`)
            .then((response) => {

                const oneAircraft = response.data;
                setTimetable(oneAircraft.timetable);
                setIsBusy(oneAircraft.isBusy);
                setSeats(oneAircraft.seats);
            })
            .catch((error) => console.log(error));

    }, [aircraftId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        //console.log(timetable);
        //console.log(startTrip.toLocaleTimeString());
        //let busy = isBusy.includes(startTrip.valueOf());
        let startTime = timetable.includes(startTrip.toLocaleTimeString());


        if (startTrip && startTime && !message) {
            //setIsBusy([...isBusy, startTripNum]);
            //console.log(startTripNum);

            const requestBody = { 
                aircraftId, 
                userId, 
                startTrip, 
                startTripNum, 
                review, 
                reviewStars, 
                duration, 
                peoplesNum, 
                tripScore, 
                tripStatus };

            axios
                .post(`${process.env.REACT_APP_API_URL}/trips`, requestBody)
                .then((response) => {
                    // Reset the state to clear the inputs

                    setStartTrip("");
                    setStartTripNum(0);
                    setReview("");
                    setReviewStars("5");
                    setDuration("30");
                    setPeoplesNum("1");
                    setSeats(1);

                })
                .catch((error) => console.log(error));

            const busyAircraft = { isBusy };
            axios
                .put(`${process.env.REACT_APP_API_URL}/aircrafts/${aircraftId}`, busyAircraft)
                .then((response) => {
                    //console.log(response)
                    redirect(`/trips/user/${userId}`);
                })
                .catch((err) => console.log(err));
        } else if (!message) {
            setMessage("Please set the departure time according to the schedule.");
            console.log("Message timetable.....");

        } else {
            console.log("Message busy.....");
        }
    };

    return (
        <div className="forms">

            <Form onSubmit={handleSubmit}
                style={{
                    width: '60vw',
                    backgroundColor: "#393838",
                    padding: "20px",
                    borderRadius: "10px",
                    marginTop: "10%"
                }}>
                <Form.Text className="text-light"><h3>Add New Trip</h3></Form.Text>
                <Form.Text className="text-light"><h3>{message}</h3></Form.Text>
                <Form.Text className="text-light">Daily departure time of this aircraft:</Form.Text>
                <Row className="mb-3">
                    <Col>
                        <Card>{timetable[0]}</Card>
                    </Col>
                    <Col>
                        <Card>{timetable[1]}</Card>
                    </Col>
                    <Col>
                        <Card>{timetable[2]}</Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Form.Text>Start Trip:</Form.Text>
                            <DateTimePicker onChange={setStartTrip} value={startTrip} />
                        </Card>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingDateTime" label="Duration:" className="mb-3">
                            <Form.Select onChange={(e) => setDuration(e.target.value)}>
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
                                value={peoplesNum}
                                min="1"
                                max={seats}
                                onChange={(e) => setPeoplesNum(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Button variant="outline-secondary" type="submit" onClick={() => {
                    setMessage("");
                    setStartTripNum(startTrip.valueOf());
                    setTripStatus("WAIT FOR APPROVE");
                    if (!isBusy.includes(startTrip.valueOf())) {
                        setIsBusy([...isBusy, startTrip.valueOf()]);
                    } else {
                        setMessage("We are sorry.. air craft is busy at this time, please choose another taking off time.");
                    }
                }}>Add Trip</Button>
            </Form>

        </div>
    );
}

export default CreateTrip;