import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://misguided.enterprises/hkgi" + "/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: username, pass: password })
    })
      .then(async (res) => {
        if (res.ok) {
          try {
            var json = await res.json();

            return new Promise((resolve, reject) => resolve(json));
          } catch (exception) {
            return new Promise((resolve, reject) => resolve({ ok: true }));
          }
        }
      })
      .then((res) => {
        console.log(res);
        if (res.ok === true) {
          navigate("/");
        }
        if (res.ok === false) {
          alert(res.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={() => navigate("/")}>
              Sign In
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

export default SignUp;
