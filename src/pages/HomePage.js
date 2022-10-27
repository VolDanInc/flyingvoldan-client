import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const API_URL = "http://localhost:5005";

function HomePage() {
    //const {aircraftId} = useParams();
        const [aircrafts, setAircrafts] = useState([]);

       


        const fetchAircrafts = () =>{
            axios.get (`${API_URL}/aircrafts`)
            .then((response)=> {
                console.log(response);
                setAircrafts(response.data)
                console.log(response.data)
            })
            .catch((err)=> {
                console.log(err)
            })
        }
        useEffect(() => {
            fetchAircrafts();
            console.log('i fire once')
          }, []);
  return (
    <div>
      <h1>Home Page</h1>
<div className='container'>
    {/* {aircrafts?.map((aircraft)=>( */}
<div className='card' >
    <h2>{aircrafts.name}</h2>
    {/* <img src= {aircraft.image} alt= ""/> */}
    </div>
  
</div>
    </div>
  )
}

export default HomePage
