import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../Loader/loader";
import Helmet from "../Helmet";
import "./profile.css";

import { AlertAction } from "../../action/AlertAction";
import { ClearAlert } from "../../Constant/AlertContant";
import { DeleteProfileClear } from "../../Constant/UserConstant";
import { DeleteProfileAction, MeDetailsClear } from "../../action/UserAction";

export default function UserProfile() {
  const { userdata } = useSelector((state) => {
    return state.meDetails;
  });

  const { loading, data } = useSelector((state) => {
    return state.deleteProfile;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showdelete, setShowDelete] = useState(true);
  const deleteAlert = useRef(null);

  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.success === false) {
        setShowAlert(true);
        setAlertDetails({ AlertType: "Error", AlertMessage: `${data.error}` });

        dispatch({ type: DeleteProfileClear });
      }
      if (data.success === true) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: `${data.message}`,
        });

        dispatch({ type: DeleteProfileClear });
        dispatch({ type: DeleteProfileClear });
        setTimeout(() => {
          navigate("/login-singup");
        }, 1000);
      }
    }
  }, [dispatch, loading, data, showAlert, navigate]);

  useEffect(() => {
    if (showAlert === true) {
      dispatch(
        AlertAction(
          alertdetails.AlertType,
          alertdetails.AlertMessage,
          setShowAlert
        )
      );
    }
    if (showAlert === false) {
      dispatch({ type: ClearAlert });
    }
  }, [alertdetails, showAlert, setShowAlert]);

  const DeleteProfileFunction = () => {
    dispatch(DeleteProfileAction());
    setShowAlert(false);
  };

  if (showdelete == false) {
    document.addEventListener("click", (e) => {
      if (deleteAlert.current !== null) {
        let hideelement = deleteAlert.current.contains(e.target);

        let alertContainer = document.querySelector(".alert-container");

        if (alertContainer) {
          hideelement = alertContainer.contains(e.target);
        }

        if (hideelement === false) {
          if (showdelete == false) {
            setShowDelete(true);
          }
        }
      }
    });
  }

  return (
    <>
      <Helmet title="MY Store --- User Profile" />

      {!userdata && <Loader loading={"protectedloader"} />}

      {loading == true ? (
        <Loader loading={"protectedloader"} />
      ) : (
        userdata &&
        userdata.success === true && (
          <>
            <h1 className="profileheading">
              {" "}
              {userdata.user.role[0].toUpperCase()}
              {userdata.user.role.slice(1)} Profile
            </h1>
            <div className="profilecontainer">
              <div className="image_buttonContainer">
                <div className="imagebox">
                  <img src={userdata.user.userimage.url} alt="User image" />
                </div>
                <div className="buttonbox" ref={deleteAlert}>
                  {showdelete === true && (
                    <button
                      onClick={() => {
                        navigate("/profileEdit");
                      }}
                    >
                      {" "}
                      Edit Profile{" "}
                    </button>
                  )}

                  {showdelete === true && (
                    <button
                      onClick={() => {
                        setTimeout(() => {
                          setShowDelete(false);
                          setShowAlert(false);
                        }, 0);
                      }}
                    >
                      {" "}
                      Delete Profile{" "}
                    </button>
                  )}

                  {showdelete === false && (
                    <div className="deleteProfilealert">
                      <p>Are You Sure Delete This Profile</p>
                      <div>
                        <button onClick={DeleteProfileFunction}>Delete </button>
                        <button
                          onClick={() => {
                            setShowDelete(true);
                            setShowAlert(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="medetails">
                <div>
                  <p>Full Name</p>
                  <p>{userdata.user.name}</p>
                </div>
                <div>
                  <p> Contact </p>
                  <p>{userdata.user.contact}</p>
                </div>
                <div>
                  <p>Email</p>
                  <p>{userdata.user.email}</p>
                </div>
                <div>
                  <p>Join</p>
                  <p>
                    {`${new Date(
                      userdata.user.createdAt
                    ).toDateString()} - ${new Date(
                      userdata.user.createdAt
                    ).toLocaleTimeString()}`}{" "}
                  </p>
                </div>
                {userdata.user.lastUpdate && (
                  <div>
                    <p>Last Update </p>
                    <p>{`${new Date(
                      userdata.user.lastUpdate
                    ).toDateString()} - ${new Date(
                      userdata.user.lastUpdate
                    ).toLocaleTimeString()}`}</p>
                  </div>
                )}

                <div className="medetails_button_box">
                  <button
                    onClick={() => {
                      navigate("/me/orders ");
                    }}
                  >
                    My Orders{" "}
                  </button>
                  <button
                    onClick={() => {
                      navigate("/changepassword");
                    }}
                  >
                    {" "}
                    Change Password{" "}
                  </button>

                  <button
                    onClick={() => {
                      navigate("/changeEmail");
                    }}
                  >
                    Change Email{" "}
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}
