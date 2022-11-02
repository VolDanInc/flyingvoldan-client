// src/pages/EditProjectPage.js
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';

function AddTripComment(props) {
    const { tripId } = useParams();
    const [review, setReview] = useState("");
    const [reviewStars, setReviewStars] = useState("5");
    const redirect = useNavigate();

    useEffect(() => {                                  // <== ADD
        axios
            .get(`${process.env.REACT_APP_API_URL}/trips/${tripId}`)
            .then((response) => {
                /* 
                  We update the state with the project data coming from the response.
                  This way we set inputs to show the actual title and description of the project
                */
                const oneTrip = response.data;
                setReview(oneTrip.review);
                setReviewStars(oneTrip.reviewStars);
            })
            .catch((error) => console.log(error));

    }, [tripId]);

    const handleFormSubmit = (e) => {                     // <== ADD
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { review, reviewStars };

        // Make a PUT request to update the project
        axios
            .put(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, requestBody)
            .then((response) => {
                // Once the request is resolved successfully and the project
                // is updated we navigate back to the details page
                redirect(`/`)
            });
    };

    return (
        <div className="forms">
            
            <Form onSubmit={handleFormSubmit}
                style={{ width: '60vw', 
                backgroundColor: "#393838", 
                padding: "20px", 
                borderRadius: "10px", 
                marginTop: "10%" }}>
                <Form.Text className="text-light"><h3>Your review</h3></Form.Text>


                {/* <FloatingLabel controlId="floatingComment" label="Comment:" className="mb-3">
                    <Form.Control as="textarea" value={review} 
                        onChange={(e) => setReview(e.target.value)} style={{ height: "20vh"}}/>
                </FloatingLabel> */}

                <Accordion defaultActiveKey="0" className="mb-3" variant="outline-secondary">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><Form.Text>Comment:</Form.Text></Accordion.Header>
                        <Accordion.Body>
                            <Form.Control as="textarea" value={review}
                                onChange={(e) => setReview(e.target.value)} style={{ height: "20vh" }} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <FloatingLabel controlId="floatingRating" label="Trip evaluation:" className="mb-3">
                    <Form.Select onChange={(e) => setReviewStars(e.target.value)}>
                        <option value="5" >5</option>
                        <option value="4" >4</option>
                        <option value="3" >3</option>
                        <option value="2" >2</option>
                        <option value="1" >1</option>
                    </Form.Select>
                </FloatingLabel>


                <Button variant="outline-secondary" type="submit" >Save changes</Button>
            </Form>

        </div>
    );
}

export default AddTripComment;