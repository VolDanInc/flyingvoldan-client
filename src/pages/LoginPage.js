// src/pages/LoginPage.js

import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import '../styles/LoginSignup.css';

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        //console.log('JWT token', response.data.authToken );

        storeToken(response.data.authToken);

        authenticateUser();
        navigate('/');                             // <== ADD      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="forms">
      <Form
        style={{ width: '60vw', 
        backgroundColor: "#393838", 
        padding: "20px", 
        color: "white", 
        borderRadius: "10px",
        marginTop: "10%"
      }}
        onSubmit={handleLoginSubmit}
      >
        <h2 id="login">Login</h2>
        <FloatingLabel 
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" value={email} onChange={handleEmail} />
        </FloatingLabel>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>

        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" >
          <Form.Control type="password" value={password} onChange={handlePassword} />
        </FloatingLabel>
        <div className="error-message">{errorMessage}</div>
        <Button  variant="outline-secondary" type="submit" >
          Login
        </Button>
        <li>Don't have an account yet?</li>
        <Link className="btn btn-outline-secondary" to={"/signup"} role="button"> Sign Up </Link>
      </Form>

    </div>
  )
}

export default LoginPage;