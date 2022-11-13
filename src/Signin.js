import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const Signin = (props) => {
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

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="e.g DevIos"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" value="Submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
