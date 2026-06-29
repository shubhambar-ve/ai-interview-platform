import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const [loading, setLoading] = useState(false);

    async function handleSignup() {
      if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
      }

      setLoading(true);

      try {
        const response = await api.post(
          "/user",
          {
            name,
            email,
            password,
          }
        );

        console.log(response.data);
        alert("Signup successful!");
        navigate("/login");
      } catch (error) {
        console.error(error);

        if (error.response) {
          alert(error.response.data.detail);
        } else {
          alert("Unable to connect to server.");
        }
      } finally {
        setLoading(false);
      }
    }

    return (
    <div>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

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

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Creating Account..." : "Signup"}
      </button>
    </div>
  );
}

export default Signup;