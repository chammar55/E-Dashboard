import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); //it re-render app on every navbar click, useEffect will be called to check auth

  // after signup we cannot go back to signup page
  // it will apply this condition if it find the user in local storage
  // it will prevent from user to navigate inputting direct path then page will render and useeffect will take user back to signuo if its not
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    console.log(name, email, password);
    // Here are using fetch() instead of axios , we can use both. For axios we have to install it, while fwtch is inbuild
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    // store user in local storage so that browser can keep the user login,User dont have to login everytime
    localStorage.setItem("user", JSON.stringify(result));
    // if we signup send us back to home page
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={collectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
