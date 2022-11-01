import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import { Link, useNavigate } from "react-router-dom";
//import { AuthContext } from '../context/auth.context';



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

    return (
        <div className="CommentsPage">
            {
                tripsArr.map((trip, index) => {
                    return (
                        // <div className="Comments" key={index}>
                        //     <h3>Created by: {trip.userId.name}</h3>
                        //     <p>Aircraft: {trip.aircraftId.name}</p>
                        //     <p>Comment: {trip.review}</p>
                        //     <p>Rating: {trip.reviewStars}</p>
                        //     <p>Created: {trip.updatedAt}</p>
                        //     <hr />
                        // </div>
                        <Card
                            bg='dark'
                            key='Dark'
                            text='white'
                            // style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Header>Created by: {trip.userId.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Aircraft: {trip.aircraftId.name}</Card.Title>
                                <Card.Text>
                                    Comment: {trip.review}
                                </Card.Text>
                                <Button variant="outline-secondary">Like</Button>
                                <Button variant="outline-secondary">Unlike</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <p>Rating: {trip.reviewStars}</p>
                                <p>Created: {trip.updatedAt}</p>
                            </Card.Footer>
                        </Card>

                    );
                })
            }
        </div>
    )
}

export default CommentsPage;