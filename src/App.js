// src/App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from "./pages/SignupPage";  // <== IMPORT
import LoginPage from "./pages/LoginPage";  // <== IMPORT
import TripsPage from "./pages/TripsPage";  // <== IMPORT
import Navbar from "./components/NavBar"; 

function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>      
     {/*   <Route path="/" element={ <HomePage /> } />
        
        <Route path="/projects/:projectId" element={ <ProjectDetailsPage /> } />
        <Route path="/projects/edit/:projectId" element={ <EditProjectPage /> } />*/}
        <Route path="/trips" element={ <TripsPage /> } />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>
    </div>
  );
}
 
export default App;