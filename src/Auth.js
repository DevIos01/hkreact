import React, { useState } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import SignIn from "./Signin";
import SignUp from "./Signup";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://misguided.enterprises/hkgi" + "/testauth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(username + ":" + password).toString(
          "base64"
        )}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setauthenticated(true);
        localStorage.setItem("authenticated", true);
        let auth = Buffer.from(username + ":" + password).toString("base64");
        localStorage.setItem("Auth", auth);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    <SignIn
      handleSubmit={handleSubmit}
      changeAuthMode={changeAuthMode}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />;
  } else if (authMode === "signup") {
    <SignUp changeAuthMode={changeAuthMode} />;
  }
}
