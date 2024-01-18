import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // stop user to eccess login page when he's already login, through direct putting path in url
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    // now we are login using token
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
    // For index-v1 because in this we just login using email and name
    // if (result.name) {
    //   localStorage.setItem("user", JSON.stringify(result));
    //   navigate("/");
    // } else {
    //   alert("Please enter correct details");
    // }
  };

  return (
    <div className="login">
      <input
        type="text"
        className="inputBox"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter Email"
      />

      <input
        type="password"
        className="inputBox"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
      />

      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
    </div>
  );
}

export default Login;
