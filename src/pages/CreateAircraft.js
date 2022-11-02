import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateAircraft(props) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [timetable, setTimetable] = useState(["08:00:00", "12:00:00", "16:00:00"]);
  const [isBusy, setIsBusy] = useState([]);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();


    const requestBody = { name, img, description, price, seats, timetable, isBusy };
    const storedToken = localStorage.getItem('authToken');
    axios.post(
      `${process.env.REACT_APP_API_URL}/aircrafts`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
        // Reset the state
        setName("");
        setImg("");
        setDescription("");
        setPrice("");
        setSeats("");
        setTimetable(["08:00:00", "12:00:00", "16:00:00"]);
        setIsBusy([]);
        navigate('/');
        // props.refreshAircrafts(); 
      })
      .catch((error) => console.log(error));


  };

  return (
    <div className='forms'>
      <h3>Add Aircraft</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> <br />

        <label>Image link:</label>
        <input
          type="text"
          name="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        /> <br />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br />
        <label>Seats:</label>
        <input
          type="number"
          name="price"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        /><br />

        <label>Timetable:</label>
        <select name="timetable" onChange={(e) => {
          const newTable = [...timetable];
          newTable.splice(0,1,e.target.value); 
          setTimetable(newTable)
          }}>
          <option value="08:00:00" >8:00</option>
          <option value="09:00:00" >9:00</option>
          <option value="10:00:00" >10:00</option>
        </select>
        <select name="timetable" onChange={(e) => {
          const newTable = [...timetable];
          newTable.splice(1,1,e.target.value); 
          setTimetable(newTable)
          }}>
          <option value="12:00:00" >12:00</option>
          <option value="13:00:00" >13:00</option>
          <option value="14:00:00" >14:00</option>
        </select>
        <select name="timetable" onChange={(e) => {
          const newTable = [...timetable];
          newTable.splice(2,1,e.target.value); 
          setTimetable(newTable)
          }}>
          <option value="16:00:00" >16:00</option>
          <option value="17:00:00" >17:00</option>
          <option value="18:00:00" >18:00</option>
        </select>

        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default CreateAircraft;
