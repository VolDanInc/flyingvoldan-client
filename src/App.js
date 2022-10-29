// src/App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from "./pages/SignupPage";  // <== IMPORT
import LoginPage from "./pages/LoginPage";  // <== IMPORT
import TripsPage from "./pages/TripsPage";  // <== IMPORT
import HomePage from "./pages/HomePage";  // <== IMPORT
import NavBar from "./components/NavBar";
import DateTime from "./components/DateTime";
import DTPicker from "./components/DTPicker";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <DateTime />
      <DTPicker /> */}
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;