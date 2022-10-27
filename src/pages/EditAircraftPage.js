import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function EditAircraftPage(props) {
    const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //const [seats, setSeats] = useState("");
  //const [price, setPrice] = useState("");

  const {aircraftId} = useParams();
  const navigate= useNavigate();

  useEffect(() => {                                 
    axios
      .get(`${API_URL}/api/projects/${aircraftId}`)
      .then((response) => {
       
        const oneAircraft = response.data;
        setName(oneAircraft.name);
        setDescription(oneAircraft.description);
      })
      .catch((error) => console.log(error));
    
  }, [aircraftId]);

  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    
    const requestBody = { name, description };
 
   //UPDATE:
    axios
      .put(`${API_URL}/api/aircrafts/${aircraftId}`, requestBody)
      .then((response) => {
        
        navigate(`/aircrafts/${aircraftId}`)
      });
  };




  const deleteAircraft = () => {                 
 //DELETE: 
    axios
      .delete(`${API_URL}/api/aircrafts/${projectId}`)
      .then(() => {
        navigate("/aircrafts");
      })
      .catch((err) => console.log(err));
  };  


  return (
    <div>
      
    </div>
  )
}

export default EditAircraftPage
