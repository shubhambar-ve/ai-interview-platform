//     AI Interview Platform

// Practice technical interviews with AI

// [Go to Dashboard]
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
        <h1>Welcome to the AI Interview Platform</h1>
        <p>Practice technical interviews with AI</p>
        
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <br />
        <br />
        <Link to="/login">
          <button>Login</button>
        </Link>
    </div>
  );
}

export default Landing;