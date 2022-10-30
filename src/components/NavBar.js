// src/components/Navbar.js

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const {
    isLoggedIn,
    user,
    logOutUser
  } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to={`/trips/comments`}> <button>View comments</button> </Link>
      {user
        ? user._id && 
        <Link to={`/trips/user/${user._id}`}>
          <button>Trips history</button>
        </Link>
        : <></>
      }

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
          <span>Hello {user && user.name}!</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}

      {user
        ? user.isAdmin && (
          <>
            <Link to="/aircrafts/create"> <button>New aircraft</button> </Link>
            
          </>
        )
        : (<></>)}

    </nav>
  );
}

export default Navbar;