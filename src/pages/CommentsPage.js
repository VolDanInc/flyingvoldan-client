import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FormControl } from "react-bootstrap";
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
let updateDate = "";
    return (
        <div className="centerCard">
            {
                tripsArr.map((trip, index) => {
                    updateDate = trip.updatedAt.slice(0, 16).split('T');
                    return (
                        <Card
                            bg='dark'
                            key={index}
                            text='white'
                            style={{ width: '48rem'}}
                            className="mb-2"
                        >
                            <Card.Header>Created by: {trip.userId.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Aircraft: {trip.aircraftId.name}</Card.Title>
                             
                                <Card.Text className="overflow-scroll" >
                                    Comment: {trip.review}
                                </Card.Text>
                              
                               
                                <Button variant="outline-secondary">Like</Button>
                                <Button variant="outline-secondary">Unlike</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                            <Card.Text id="rating">Rating: {trip.reviewStars} </Card.Text>
                            <Card.Text>Created: {updateDate[0]} at {updateDate[1]}</Card.Text>
                            </Card.Footer>
                        </Card>

                    );
                })
            }
        </div>
    )
}

export default CommentsPage;