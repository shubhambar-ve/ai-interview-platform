import { Link } from "react-router-dom";

function Navbar({ title, username, role }) {

  return (
    <nav className="navbar">
      <h1>{title}</h1>
      <div className="user-info"> 
      </div>
    </nav>
  )
}

export default Navbar  