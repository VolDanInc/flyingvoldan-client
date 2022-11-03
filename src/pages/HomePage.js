//import Navbar from '../components/NavBar';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
//import video from "../styles/video.mp4"
//import { Container } from 'react-bootstrap';
//import Bootstrap from 'react-bootstrap'
import HomeVideo from "../components/HomeVideo";
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import CreateAircraft from './CreateAircraft';
function HomePage() {
    //const {aircraftId} = useParams();
    const [aircrafts, setAircrafts] = useState([]);
    const { user } = useContext(AuthContext);
    const fetchAircrafts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/aircrafts`)
            .then((response) => {
                //console.log(response);
                const newAircrafts = response.data;
                setAircrafts(newAircrafts);

            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchAircrafts();
        //console.log('i fire once')
    }, []);
    return (
        <div className="home" >
         <HomeVideo />
        
             <h2 >Choose an aircraft</h2>
        <div className="cards">
            {
                aircrafts.map((aircraft, index) => {
                    return (
                        
                        <Card
                           bg='dark'
                    
                            key={index}
                            text='white'
                            style={{ width: '22rem'}}
                            className="mb-4"
                        >
                            <Card.Img className="cardImg" variant="top" src={aircraft.img} onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
                            }} />
                            <Card.Body>
                                <Card.Title id="cardTitle">{aircraft.name}</Card.Title>
                                <Card.Text id="seats">
                                    Seats: {aircraft.seats}
                                </Card.Text>
                                <Link className="btn btn-outline-secondary" to={`/aircrafts/${aircraft._id}`} role="button"> Details</Link>
                                {user
                                    ? (user.isAdmin ? <Link className="btn btn-outline-secondary" to={`/aircrafts/edit/${aircraft._id}`} role="button">Edit</Link> :
                                        <Link className="btn btn-outline-secondary" to={`/trips/create/${aircraft._id}`} role="button">Book trip</Link>)
                                    : <></>}
                            </Card.Body>
                       </Card> 
                      
  
                    );
                })
            }
            </div>
         </div>
    )
}

export default HomePage
