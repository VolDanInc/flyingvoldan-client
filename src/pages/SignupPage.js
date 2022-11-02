// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, isAdmin: false };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  return (
    <div className="forms">
      <h1>Sign Up</h1>
      <Form
        style={{ width: '60vw', backgroundColor: "#393838", padding: "20px", color: "white", borderRadius: "10px" }}
        onSubmit={handleSignupSubmit}
      >
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" value={email} onChange={handleEmail} />
        </FloatingLabel>


        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control type="password" value={password} onChange={handlePassword} />
        </FloatingLabel>
        <Form.Text className="text-muted">
          We'll never share your email and password with anyone else.
        </Form.Text>
        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
          <Form.Control type="text" value={name} onChange={handleName} />
        </FloatingLabel>

        <div className="error-message">{errorMessage}</div>
        <Button variant="outline-secondary" type="submit" >
          Sign Up
        </Button>
        <li>Already have account?</li>
        <Link className="btn btn-outline-secondary" to={"/login"} role="button"> Login </Link>
      </Form>

    </div>
  )
}

export default SignupPage;