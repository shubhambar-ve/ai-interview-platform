import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import Landing from "./pages/landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import Interview from "./pages/interview";
import Result from "./pages/Result";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route
          path="/interview/:id/result"
          element={<Result />}
        />
      </Routes>
    </div>
  );
}

export default App;