import { useState } from "react";

import RootLayout from "@/layouts/RootLayout";
import TextField from "@mui/material/TextField";
import Logo from "@/assets/Logo/cyberus-ver.png";
import { useNavigate } from "react-router-dom";

//axios
import axios from 'axios'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5555/auth/login', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        
        withCredentials: true
        
      });
      console.log({ email, password });

      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      const user_email = response.data.email
      console.log(access_token);
      console.log(refresh_token);
      console.log(user_email);


      localStorage.setItem("access_token", `"${access_token}"`);
      localStorage.setItem("refresh_token", `"${refresh_token}"`);
      localStorage.setItem("user_email", `"${user_email}"`);


      // setServerResponse("");
      // setShow(false);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    };


  };

  return (
    <RootLayout>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-card">
          <img src={Logo} alt="App Logo" className="app-logo" />

          <div>
            <TextField
              className="login-textfield"
              label="Email"
              variant="outlined"
              size="small"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              className="login-textfield"
              label="Password"
              variant="outlined"
              size="small"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            SIGN IN
          </button>
        </div>
      </form>
    </RootLayout>
  );
}
