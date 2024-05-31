import { useState } from "react";

import RootLayout from "@/layouts/RootLayout";
import TextField from "@mui/material/TextField";
import Logo from "@/assets/Logo/cyberus-ver.png";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data) {
        return;
      }

      const res = await supabase
        .from("users")
        .select("id, email, role_id(*)")
        .eq("id", data?.user?.id);

      if (error) return;

      localStorage.setItem("phishing-token", JSON.stringify(data));
      localStorage.setItem("phishing-user-data", JSON.stringify(res?.data[0]));

      if (res?.data[0]?.role_id?.role_name === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/u/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
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
