import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
   

  async function handleLogin() {
    const response = await api.post(
        "/login",
        {
            email,
            password
        }
    );

    console.log("Login successful");
    console.log(response.data);
    localStorage.setItem(
        "token",
        response.data.access_token
    );
    
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));

    const meResponse = await api.get(
    "/me",
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
);

console.log(meResponse.data);
navigate("/dashboard");

}

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}



export default Login;