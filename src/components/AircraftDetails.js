// import React from 'react'
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// const API_URL = "http://localhost:5005";

// function AircraftDetailsPage(props) {
//     const [aircraft, setAircraft] = useState(null);
//     const {aircraftId} = useParams();


//     const getAircraft = () => {
//      //   const storedToken = localStorage.getItem ("authToken")
//         axios.get(`${API_URL}/api/aircrafts/${aircraftId}`)
//        // {headers: {Authorization: `Bearer ${storedToken}` }} )
//         .then((response) => {
//             const oneAircraft = response.data;
//             setAircraft(oneAircraft);
//           })
//           .catch((error) => console.log(error));
//     };
//     useEffect(()=> {               
//         getAircraft();
//       }, [] );

//   return (
//     <div className='AircraftDetails'>
//         {aircraft && (
//             <>
//             <img src='public/AircraftsImages/plane1.png'></img>
//             <h1>{aircraft.name}</h1>
//             <p>{aircraft.description}</p>
//             <p>{aircraft.price}</p>
//             <p>{aircraft.seats}</p>
//           </>
//         )}
      
//     </div>
//   )
// }

// export default AircraftDetailsPage
