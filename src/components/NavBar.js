// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { slide as Menu } from "react-burger-menu";
import { Button } from "react-bootstrap";
// import RadiumLink from 
function Navbar(props) {


  const {
    isLoggedIn,
    user,
    logOutUser
  } = useContext(AuthContext);


  return (
    <div className="navbar">
      <Menu {...props} left isOpen={false} >


        {/* <nav className="nav" id = "nav"> */}
        <Link to="/" className="menu-item" > Home </Link>
        <Link to={`/trips/comments`} className="menu-item">View comments </Link>
        {user
          ? user._id &&
          <Link to={`/trips/user/${user._id}`} className="menu-item"> Trips history</Link>
          : <></>
        }

        {isLoggedIn && (

          <Link onClick={logOutUser} id="logout-btn" className="menu-item">Logout</Link>



        )}

        {!isLoggedIn && (

          <Link to="/signup" className="menu-item">Sign Up </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login" className="menu-item"> Login </Link>
        )}


        {user
          ? user.isAdmin && (

            <Link to="/aircrafts/create" className="menu-item"> New aircraft </Link>


          )
          : (<></>)}

        {/* </nav> */}
      </Menu>
    </div>



  );
}




export default Navbar;