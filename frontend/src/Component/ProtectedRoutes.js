import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AlertAction } from "../action/AlertAction";
import { ClearAlert } from "../Constant/AlertContant";
import Loader from "./Loader/loader";

export default function ProtectedRoutes({ Component, isAdmin, isOwner }) {
  const dispatch = useDispatch();
  const { loading, userdata } = useSelector((state) => {
    return state.meDetails;
  });

  useEffect(() => {
    if (userdata) {
      if (userdata.success == false) {
        setTimeout(() => {
          dispatch(AlertAction("Error", userdata.error, null));
        }, 500);
        setTimeout(() => {
          // ClearAlert
          dispatch({ type: ClearAlert });
        }, 3000);
      }
    }
  }, [dispatch, Component]);

  return (
    <>
      {/* loadings */}
      {loading == true ? (
        <Loader loading={"protectedloader"} />
      ) : (
        <>
          {userdata && userdata.IsAuthenticated !== undefined && (
            <>
              {userdata.IsAuthenticated == false ||
              (isAdmin == true &&
                userdata.user.role !== "admin" &&
                userdata.user.role !== "owner") ||
              (isOwner == true && userdata.user.role !== "owner") ? (
                <Navigate to="/login-singup" />
              ) : (
                <Component />
              )}
            </>
          )}

          {/* isOwner==true &&userdata.user.role!=="owner"? '/admin_owner/dashboard': */}
        </>
      )}
    </>
  );
}
