import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';

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

      <Form onSubmit={handleSubmit}
        style={{
          width: '60vw',
          backgroundColor: "#393838",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "10%"
        }}>
        <Form.Text className="text-light"><h3>Add Aircraft</h3></Form.Text>
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
      </Form>
    </div>
  )
}

export default CreateAircraft;
