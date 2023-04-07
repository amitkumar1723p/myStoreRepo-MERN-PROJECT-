import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Admin_OwnerSingleUserDetails.css";
export default function Admin_OwnerSingleUserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state) {
      if (location.state.item) {
        setUser(location.state.item);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  }, [location]);

  return (
    <>
      {user && (
        <>
          <>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="goBack"
            >
              Go Back
            </button>

            <h1 className="profileheading SingleUserProfileheading ">
              {user.role[0].toUpperCase()}
              {user.role.slice(1)} Profile
            </h1>
            <div className="SingleUserProfileContainer">
              <div className="SingleUserimagebox">
                <img src={user.userimage.url} alt="User image" />
              </div>

              <div className="SingleUserDetails ">
                <div>
                  <p>User Id</p>
                  <p style={{ color: "red" }}>{user._id}</p>
                </div>
                <div>
                  <p>role</p>
                  <p style={{ color: "green" }}>{user.role}</p>
                </div>
                <div>
                  <p>Full Name</p>
                  <p>{user.name}</p>
                </div>
                <div>
                  <p> Contact </p>
                  <p>{user.contact}</p>
                </div>
                <div>
                  <p>Email</p>
                  <p>{user.email}</p>
                </div>

                <div>
                  <p>Join</p>
                  <p>
                    {`${new Date(user.createdAt).toDateString()} - ${new Date(
                      user.createdAt
                    ).toLocaleTimeString()}`}{" "}
                  </p>
                </div>
                {user.lastUpdate && (
                  <div>
                    <p>Last Update </p>
                    <p>{`${new Date(
                      user.lastUpdate
                    ).toDateString()} - ${new Date(
                      user.lastUpdate
                    ).toLocaleTimeString()}`}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
