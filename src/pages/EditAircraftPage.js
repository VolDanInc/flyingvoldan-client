
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';

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
      .get(`${process.env.REACT_APP_API_URL}/aircrafts/${aircraftId}`)
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
      .put(`${process.env.REACT_APP_API_URL}/aircrafts/${aircraftId}`, requestBody)
      .then((response) => {
        console.log(response)

        navigate(`/`)
      })
      .catch((err) => console.log(err));
  };




  const deleteAircraft = () => {
    //DELETE: 
    axios
      .delete(`${process.env.REACT_APP_API_URL}/aircrafts/${aircraftId}`)
      .then(() => {

        navigate("/");
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="forms">
      
      <Form onSubmit={handleFormSubmit}
        style={{
          width: '60vw',
          backgroundColor: "#393838",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "10%"
        }}>
        <Form.Text className="text-light"><h3>Edit the Aircraft:</h3></Form.Text>
        <Row className="mb-3">
        <Col>
          <FloatingLabel controlId="floatingName" label="Name:" className="mb-3">
            <Form.Control type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingSeats" label="Seats:" className="mb-3">
              <Form.Control type="number"
          name="seats"
          min="1"
          value={seats}
          onChange={(e) => setSeats(e.target.value)} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingPrice" label="Price:" className="mb-3">
            <Form.Control type="number"
          name="price"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
        <Col>
          <FloatingLabel controlId="floatingImg" label="Image link:" className="mb-3">
            <Form.Control type="text"
          name="img"
          value={img}
          onChange={(e) => setImg(e.target.value)} />
            </FloatingLabel>
          </Col>
          </Row>
          <Row>
          <Col>
            <FloatingLabel controlId="floatingDescription" label="Description:" className="mb-3">
            <Form.Control as="textarea"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} style={{height: "15vh"}}/>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="floatingTimetable" label="Morning slot:" className="mb-3">
              <Form.Select onChange={(e) => {
                const newTable = [...timetable];
                newTable.splice(0, 1, e.target.value);
                setTimetable(newTable)
              }}>
                <option value="08:00:00" >8:00 </option>
                <option value="09:00:00" >9:00 </option>
                <option value="10:00:00" >10:00 </option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingTimetable" label="Midday slot:" className="mb-3">
              <Form.Select onChange={(e) => {
                const newTable = [...timetable];
                newTable.splice(1, 1, e.target.value);
                setTimetable(newTable)
              }}>
                <option value="12:00:00" >12:00 </option>
                <option value="13:00:00" >13:00 </option>
                <option value="14:00:00" >14:00 </option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingTimetable" label="Evening slot:" className="mb-3">
              <Form.Select onChange={(e) => {
                const newTable = [...timetable];
                newTable.splice(2, 1, e.target.value);
                setTimetable(newTable)
              }}>
                <option value="16:00:00" >16:00 </option>
                <option value="17:00:00" >17:00 </option>
                <option value="18:00:00" >18:00 </option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Button variant="outline-secondary" type="submit">Submit</Button>
        <Button variant="outline-secondary" onClick={deleteAircraft}>Delete Aircraft</Button>
      </Form>
    </div>
  )
}

export default EditAircraftPage
