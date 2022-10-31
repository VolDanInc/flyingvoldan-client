
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function EditAircraftPage(props) {

  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [isBusy, setIsBusy] = useState([]);

  const { aircraftId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/aircrafts/${aircraftId}`)
      .then((response) => {

        const oneAircraft = response.data;
        setName(oneAircraft.name);
        setImg(oneAircraft.img);
        setDescription(oneAircraft.description);
        setPrice(oneAircraft.price);
        setSeats(oneAircraft.seats);
        setTimetable(oneAircraft.timetable);
        setIsBusy(oneAircraft.isBusy);
      })
      .catch((error) => console.log(error));

  }, [aircraftId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, img, description, price, seats, timetable, isBusy };

    //UPDATE:
    axios
      .put(`${API_URL}/aircrafts/${aircraftId}`, requestBody)
      .then((response) => {
        console.log(response)

        navigate(`/`)
      })
      .catch((err) => console.log(err));
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
          <option value="8:00:00" >8:00</option>
          <option value="9:00:00" >9:00</option>
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

        <button type="submit">Update Aircraft </button><br />

      </form>

      <button onClick={deleteAircraft}>Delete Aircraft</button>


    </div>
  )
}

export default EditAircraftPage
