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
import CreateAircraft from './pages/CreateAircraft';
import EditAircraftPage from './pages/EditAircraftPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <CreateAircraft/> */}
      {/* <DateTime />
      <DTPicker /> */}
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/aircrafts/create" element= {<CreateAircraft />}/>
        <Route path='/aircrafts/edit/:aircraftId' element={<EditAircraftPage />} /> 
     
      </Routes>
    </div>
  );
}

export default App;