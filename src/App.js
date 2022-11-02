
import { Routes, Route } from 'react-router-dom';

import './styles/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import TripsPage from "./pages/TripsPage";
import CommentsPage from "./pages/CommentsPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import HomeVideo from "./components/HomeVideo";

import CreateAircraft from './pages/CreateAircraft';
import EditAircraftPage from './pages/EditAircraftPage';
import CreateTrip from './pages/CreateTrip';
import EditTrip from './pages/EditTrip';
import AddTripComment from './components/AddTripComment';
import AircraftDetailsPage from './components/AircraftDetails';

function App() {
  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path="/" element={<><HomeVideo /><HomePage /></>} />
        <Route path="/trips/user/:userId" element={<TripsPage />} />
        <Route path="/trips/comments" element={<CommentsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/aircrafts/create" element={<CreateAircraft />} />
        <Route path='/aircrafts/edit/:aircraftId' element={<EditAircraftPage />} />
        <Route path='/aircrafts/:aircraftId' element={<AircraftDetailsPage />} />
        <Route path="/trips/create/:aircraftId" element={<CreateTrip />} />
        <Route path="/trips/edit/:tripId" element={<EditTrip />} />
        <Route path="/trips/details/:tripId" element={<AddTripComment />} />
        
      </Routes>
    </div>
  );
}

export default App;