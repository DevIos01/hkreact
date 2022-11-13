import { useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated") ?? false
  );
  const [userItems, setUserItems] = useState(null);

  const auth = localStorage.getItem("Auth");

  if (!userItems) {
    fetch("https://misguided.enterprises/hkgi" + "/getstead", {
      headers: { Authorization: "Basic " + auth }
    })
      .then((x) => x.json())
      .then((x) => {
        console.log(x);
        setUserItems(x);
      });
  }

  return (
    <>
      {!authenticated ? (
        <Navigate to="/" />
      ) : (
        <div>
          <p>Welcome to your Dashboard</p>
          <button onClick={(ev) => setauthenticated(false)}>Logout</button>

          <div>
            {userItems ? (
              Object.keys(userItems.inv).map((item, index) => (
                <div key={index}>
                  <p>
                    {item} Amount: {userItems.inv[item]}
                  </p>
                </div>
              ))
            ) : (
              <p>No Items found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
