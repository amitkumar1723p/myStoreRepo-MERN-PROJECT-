import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ClearAlert } from "../../Constant/AlertContant";
import "./alert.css";
export default function Alert({ AlertType, AlertMessage, setShowAlert }) {
  const alertbox = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    alertbox.current.style.transform = `translateX(0)`;
    alertbox.current.style.opacity = 1;
  });

  const ErrorboxClose = (e) => {
    alertbox.current.style.transform = `translateX(${alertbox.current.offsetWidth}px)`;
    alertbox.current.style.opacity = 0;
  };
  if (AlertType === "Success") {
    setTimeout(() => {
      if (alertbox.current) {
        alertbox.current.style.transform = `translateX(${alertbox.current.offsetWidth}px)`;
        alertbox.current.style.opacity = 0;
        setTimeout(() => {
          dispatch({ type: ClearAlert });
          if (setShowAlert) {
            setShowAlert(false);
          }
        }, 1000);
      }
    }, 10000);
  }
  return (
    <span
      className="alert-container"
      ref={alertbox}
      style={{
        backgroundColor: AlertType == "Error" ? "red" : "greenyellow",
      }}
    >
      <div className="alert">
        <p
          id="AlertType"
          className="alearttype "
          style={{
            color: AlertType == "Error" ? "greenyellow" : "red",
          }}
        >
          {AlertType}
          <span>:-</span>
        </p>
        <p className="alertmessage">{AlertMessage} </p>
        <p
          className="errorboxclose"
          onClick={() => {
            ErrorboxClose();
            setTimeout(() => {
              dispatch({ type: ClearAlert });
              if (setShowAlert) {
                setShowAlert(false);
              }
            }, 1000);
          }}
        >
          X
        </p>
      </div>
    </span>
  );
}
