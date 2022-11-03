import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import { FormControl } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
//import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';



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

        axios.get(`${process.env.REACT_APP_API_URL}/trips/comments`)
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
    let updateDate = "";
    return (
        <div className="forms">
            {
                tripsArr.map((trip, index) => {
                    updateDate = trip.updatedAt.slice(0, 16).split('T');
                    return (
                        <Card
                            key={index}
                            text='white'
                            style={{
                                width: '60vw',
                                backgroundColor: "#393838",
                                
                                borderRadius: "10px",
                                
                            }}
                            className="mb-2"
                        >
                            <Card.Header>Created by: {trip.userId.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Aircraft: {trip.aircraftId.name}</Card.Title>
                                <Accordion defaultActiveKey="0" className="mb-3" variant="outline-secondary">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><Form.Text>Comment:</Form.Text></Accordion.Header>
                                        <Accordion.Body>
                                            {trip.review}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                {/* <Card.Text className="overflow-scroll" >
                                    Comment: {trip.review}
                                </Card.Text> */}


                                <Button variant="outline-secondary">Like</Button>
                                <Button variant="outline-secondary">Unlike</Button>

                                {/* <Card.Footer className="text-light"> */}
                                <Card.Header id="rating">Rating: {trip.reviewStars} </Card.Header>
                                <Card.Header>Created: {updateDate[0]} at {updateDate[1]}</Card.Header>
                                {/* </Card.Footer> */}
                            </Card.Body>
                        </Card>

                    );
                })
            }
        </div>
    )
}

export default CommentsPage;