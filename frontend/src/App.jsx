import Navbar from "./components/navbar"

import Dashboard from "./pages/dashboard";
import Interview from "./pages/interview";
import Landing from "./pages/landing";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Result from "./pages/Result";


function App() {

  const title = "AI Interview Platform"
  const username = "Shubham"
  const role = "Student"

  return (

    <div>
      <Navbar 
      title={title} 
      username={username} 
      role={role}       
      

      />

      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/interview/:id/result" element={<Result/>} />
      </Routes>
      
    
    </div>
  )
}

export default App