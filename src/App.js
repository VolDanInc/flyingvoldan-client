// src/App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import TripsPage from "./pages/TripsPage";
import CommentsPage from "./pages/CommentsPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import DateTime from "./components/DateTime";
import DTPicker from "./components/DTPicker";
import CreateAircraft from './pages/CreateAircraft';
import EditAircraftPage from './pages/EditAircraftPage';
import CreateTrip from './pages/CreateTrip';
import EditTrip from './pages/EditTrip';
import TripDetails from './components/TripDetails';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <CreateAircraft/> */}
      {/* <DateTime />
      <DTPicker /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips/user/:userId" element={<TripsPage />} />
        <Route path="/trips/comments" element={<CommentsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/aircrafts/create" element={<CreateAircraft />} />
        <Route path='/aircrafts/edit/:aircraftId' element={<EditAircraftPage />} />
        <Route path="/trips/create/:aircraftId" element={<CreateTrip />} />
        <Route path="/trips/edit/:tripId" element={<EditTrip />} />
        <Route path="/trips/details/:tripId" element={<TripDetails />} />
        
      </Routes>
    </div>
  );
}

export default App;