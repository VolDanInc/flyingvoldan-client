
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function EditAircraftPage(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [seats, setSeats] = useState("");
  

  const {aircraftId} = useParams();
  const navigate= useNavigate();

  useEffect(() => {                                 
    axios
      .get(`${API_URL}/aircrafts/${aircraftId}`)
      .then((response) => {
       
        const oneAircraft = response.data;
        setName(oneAircraft.name);
        setDescription(oneAircraft.description);
        setPrice(oneAircraft.price);
        setSeats(oneAircraft.seats);
      })
      .catch((error) => console.log(error));
    
  }, [aircraftId]);

  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    
    const requestBody = { name, description, price, seats};
 
   //UPDATE:
    axios
      .put(`${API_URL}/aircrafts/${aircraftId}`, requestBody)
      .then((response) => {
        console.log(response)
        
        navigate(`/`)
      });
  };




  const deleteAircraft = () => {                 
 //DELETE: 
    axios
      .delete(`${API_URL}/aircrafts/${aircraftId}`)
      .then(() => {
     
        navigate("/");
      })
      .catch((err) => console.log(err));
  };  


  return (
    <div className="EditAircraftPage">
       <h3>Edit the Aircraft:</h3>
    
    <form onSubmit={handleFormSubmit}>
    <label>Name:</label>
    <input
          type="text"
          name="name"
         // defaultValue={name}
          value={name}
         
          onChange={(e) => setName(e.target.value)}
        /> <br/>
    
    <label>Description:</label>
        <textarea
      
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
        <button type="submit">Update Aircraft </button><br/>
        
    </form>

    <button onClick={deleteAircraft}>Delete Aircraft</button>
      
      
    </div>
  )
}

export default EditAircraftPage
