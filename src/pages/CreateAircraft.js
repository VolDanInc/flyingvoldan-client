import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateAircraft(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [seats, setSeats] = useState("");
    const navigate = useNavigate();

    const API_URL = "http://localhost:5005";
    const handleSubmit = (e) => {                        
        e.preventDefault();
        

        const requestBody = { name, description, price, seats };
        const storedToken = localStorage.getItem('authToken');
axios.post(
    `${API_URL}/aircrafts`,
    requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
  .then((response) => {
    // Reset the state
    setName("");
    setDescription("");
    setPrice("");
    setSeats("");
    navigate ('/');
    // props.refreshAircrafts(); 
  })
  .catch((error) => console.log(error));

 
    };

  return (
    <div className='AddAircraft'>
        <h3>Add Aircraft</h3>
    
    <form onSubmit={handleSubmit}>
    <label>Name:</label>
    <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> <br/>
    
    <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br/>
    <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br/>
     <label>Seats:</label>
        <input
          type="number"
          name="price"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        /><br/>
        <button type="submit">Submit</button>
    </form>
      
    </div>
  )
}

export default CreateAircraft;
