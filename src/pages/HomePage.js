import Navbar from '../components/NavBar';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Form, Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import video from "../styles/video.mp4"
import { Container } from 'react-bootstrap';


import Button from 'react-bootstrap/Button';
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
        <div id="App" >
            {/* <Navbar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <div id="page-wrap"> */}

<div className='ratio ratio-16x9'>

            <video  loop autoPlay muted allowFullScreen id="video">
            <source src={video} type="video/mp4" />
           </video>
           <div className='content'>
            <h1 id="headline" >THE SKY IS NOT THE LIMIT.</h1>
            <p id="2nd-headline">EXPERIENCE FLYING LIKE NEVER BEFORE.</p>
            <p></p>
            <Button type="button" class="btn btn-outline-warning">EXPLORE</Button>
           </div>
           </div>
          




            <h1>Choose aircraft</h1>



            {/* {
            aircrafts.map((aircraft, index) => {
                return (
                    <div className="card" key={index}>
                       
                        <p>Aircraft: {aircraft.name}</p>

                        <img 
                        width="700" 
                        height="400"
                        src={aircraft.img}  onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src="https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
                          }}/>
                
                        <p>Seats: {aircraft.seats}</p>

                        <Link to={`/aircrafts/${aircraft._id}`}> Details</Link> <> </>
                        {user 
                        ? (user.isAdmin ? <Link to={`/aircrafts/edit/${aircraft._id}`}>Edit</Link> : 
                        <Link to={`/trips/create/${aircraft._id}`}>Book trip</Link>)
                        : <></>}
                       
                    </div>
                );
            })
        }
      
        </div>
            
           
        // </div>    */}


            {
                aircrafts.map((aircraft, index) => {
                    return (
                        // <div className="card" key={index}>

                        //     <p>Aircraft: {aircraft.name}</p>

                        //     <img
                        //         width="700"
                        //         height="400"
                        //         src={aircraft.img} onError={({ currentTarget }) => {
                        //             currentTarget.onerror = null;
                        //             currentTarget.src = "https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
                        //         }} />

                        //     <p>Seats: {aircraft.seats}</p>

                        //     <Link to={`/aircrafts/${aircraft._id}`}> Details</Link> <> </>
                        //     {user
                        //         ? (user.isAdmin ? <Link to={`/aircrafts/edit/${aircraft._id}`}>Edit</Link> :
                        //             <Link to={`/trips/create/${aircraft._id}`}>Book trip</Link>)
                        //         : <></>}
                        // </div>
                        <Card
                            bg='dark'
                            key={index}
                            text='white'
                            style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Img variant="top" src={aircraft.img} onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "https://www.pngitem.com/pimgs/m/119-1197957_lear-jet-clip-arts-liar-jet-icon-png.png";
                            }} />
                            <Card.Body>
                                <Card.Title>Aircraft: {aircraft.name}</Card.Title>
                                <Card.Text>
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




    )
}

export default HomePage
