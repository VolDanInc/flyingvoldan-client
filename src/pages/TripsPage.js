import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

function TripsPage(props) {
    const [trips, setTrips] = useState([]);
    //const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    //
    //const navigate = useNavigate();
    //const { storeToken, authenticateUser } = useContext(AuthContext);
   //
    //const handleEmail = (e) => setEmail(e.target.value);
    //const handlePassword = (e) => setPassword(e.target.value);
   
    
    const getTrips = () => {
     
   
      axios.get(`${API_URL}/trips`)
        .then((response) => {
        setTrips(response.data);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        })
    };
    
    useEffect(() => {                   // <== ADD AN EFFECT
        getTrips();
    }, []);

    return (
      <div className="LoginPage">
        <h1>Your trips</h1>
   <p>trips.aircraftId</p>
   <p>trips.startTrip</p>
   <p>trips.duration</p>
        
        <Link to={"/"}> Home</Link>
      </div>
    )
  }
   
  export default TripsPage;