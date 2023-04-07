import React, { useEffect, useState } from "react";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import "./Admin_Owner_UserDetails.css";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";
import { useDispatch, useSelector } from "react-redux";
import DashboardNav from "./DashboardNav";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  useParams,
  useNavigate,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Admin_Owner_GetAllUserAction,
  Admin_Owner_DelteUserProfileAction,
} from "../../action/UserAction";
import { Owner_Admin_All_User_Clear } from "../../Constant/UserConstant";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import LaunchIcon from "@mui/icons-material/Launch";
import { DeleteProfileClear } from "../../Constant/UserConstant";
import UpdateUser from "./UpdateUserRole";

export default function Admin_Owner_UserDetails() {
  const [searchParm, setSearchParms] = useSearchParams();

  const { data, loading } = useSelector((state) => {
    return state.getAllUser;
  });

  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [Alluser, setAllUser] = useState(null);
  const [myIndex, setMyIndex] = useState();

  useEffect(() => {
    dispatch(Admin_Owner_GetAllUserAction());
  }, [params.role]);

  useEffect(() => {
    if (data) {
      if (data.success === true) {
        let AlertType = document.getElementById("AlertType");
        if (AlertType) {
          if (AlertType.innerText.includes("Error")) {
            setShowAlert(false);
          }
        }

        setAllUser(
          data.user.filter((item) => { 
            return item.role === params.role;
          })
        );
      }
      if (data.success === false) {
        setShowAlert(true);
        setAlertDetails({ AlertType: "Error", AlertMessage: data.error });

        dispatch({ type: Owner_Admin_All_User_Clear });
      }
    }
  }, [data, params.role]);

  if (
    location.pathname === "/admin_owner/admin/admin" ||
    location.pathname === "/admin_owner/admin/user" ||
    location.pathname === "/admin_owner/owner/owner"
  ) {
  } else {
    navigate("/admin_owner/dashboard");
  }

  //  Delete User UseEffect

  const { loading: DeleteLoading, data: DeleteData } = useSelector((state) => {
    return state.deleteProfile;
  });

  useEffect(() => {
    if (DeleteData) {
      if (DeleteData.success === false) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Error",
          AlertMessage: `${DeleteData.error}`,
        });
        dispatch({ type: DeleteProfileClear });
      }
      if (DeleteData.success === true) {
        setShowAlert(true);

        setAlertDetails({
          AlertType: "Success",
          AlertMessage: `${DeleteData.message}`,
        });

        dispatch(Admin_Owner_GetAllUserAction());

        dispatch({ type: DeleteProfileClear });
      }
    }
  }, [DeleteData, DeleteLoading]);

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

  const { userdata } = useSelector((state) => {
    return state.meDetails;
  });
  let DeleteLoadings = true;

  return (
    <>
      <Helmet title={`MY Store --- get ${params.role}`} />

      <div className="getUserMain">
        <DashboardNav />

        {loading === true ? (
          <Loader loading="protectedloader" />
        ) : (
          <>
            {Alluser && Alluser.length > 0 && (
              <>
                <div className="getUserContent">
                  <div className="getUserHeadContainer">
                    <p className="FindUserheading">
                      {" "}
                      Find {params.role[0].toUpperCase()}
                      {params.role.slice(1)}{" "}
                    </p>
                    <div className="getUser_tabelHead getUser_tabelFlex">
                      <p className="getUser_Sno">SNo</p>
                      <p className="getUser_UserId">UserId</p>
                      <p className="getUser_EamilId">Email</p>
                      <p>Verify</p>

                      {/* } */}

                      <p>Action</p>
                    </div>
                  </div>

                  {Alluser &&
                    Alluser.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="getUser_tabelFlex getUser_tabelFlex2"
                        >
                          <p className="getUser_Sno">{index + 1}.</p>
                          <p className="getUser_UserId"> {item._id} </p>
                          <p className="getUser_EamilId">{item.email}</p>

                          <p>
                            {(item.emailVerify === false &&
                              item.AllfiledCreate == false && (
                                <CloseIcon style={{ color: "red" }} />
                              )) ||
                              (item.emailVerify == true &&
                                item.AllfiledCreate == false && (
                                  <PersonOffIcon style={{ color: "blue" }} />
                                )) ||
                              (item.emailVerify === true &&
                                item.AllfiledCreate == true && (
                                  <CheckIcon style={{ color: "green" }} />
                                ))}
                          </p>

                          <div className="actionChild">
                            {DeleteLoading === true && myIndex === index + 1 ? (
                              <Loader loading={"smaillLoading"} />
                            ) : (
                              <>
                                {item.emailVerify === true &&
                                  item.AllfiledCreate == true && (
                                    <>
                                      {params.role === "user" &&
                                        userdata &&
                                        userdata.user &&
                                        userdata.user.role === "owner" && (
                                          <Link
                                            to={`/admin_owner/updateuserrole`}
                                            state={{ item }}
                                            className="getUserIcon"
                                          >
                                            <EditIcon className="updateIcon" />
                                          </Link>
                                        )}

                                      {params.role === "admin" &&
                                        userdata &&
                                        userdata.user &&
                                        userdata.user.role === "owner" && (
                                          <Link
                                            to={`/admin_owner/updateuserrole`}
                                            state={{ item }}
                                            className="getUserIcon"
                                          >
                                            <EditIcon className="updateIcon" />
                                          </Link>
                                        )}
                                      <Link
                                        to={"/admin_owner/getUserDetails"}
                                        state={{ item }}
                                        className="getUserIcon"
                                      >
                                        <LaunchIcon className="LaunchIcon" />
                                      </Link>
                                    </>
                                  )}

                                {params.role === "user" && (
                                  <DeleteIcon
                                    className="deleteIcon getUserIcon"
                                    onClick={() => {
                                      dispatch(
                                        Admin_Owner_DelteUserProfileAction(
                                          item._id
                                        )
                                      );
                                      setMyIndex(index + 1);
                                      setShowAlert(false);
                                    }}
                                  />
                                )}

                                {params.role === "admin" &&
                                  userdata &&
                                  userdata.user &&
                                  userdata.user.role === "owner" && (
                                    <DeleteIcon
                                      className="deleteIcon getUserIcon"
                                      onClick={() => {
                                        dispatch(
                                          Admin_Owner_DelteUserProfileAction(
                                            item._id
                                          )
                                        );
                                        setMyIndex(index + 1);
                                        setShowAlert(false);
                                      }}
                                    />
                                  )}

                                {/* Delte Icon Show for  owner parms  */}
                                {params.role === "owner" &&
                                  userdata &&
                                  userdata.user &&
                                  userdata.user.role === "owner" && (
                                    <>
                                      {(item.emailVerify === false &&
                                        item.AllfiledCreate == false) ||
                                      (item.emailVerify == true &&
                                        item.AllfiledCreate == false) ? (
                                        <DeleteIcon
                                          className="deleteIcon getUserIcon"
                                          onClick={() => {
                                            dispatch(
                                              Admin_Owner_DelteUserProfileAction(
                                                item._id
                                              )
                                            );
                                            setMyIndex(index + 1);
                                            setShowAlert(false);
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}

                                {/* Delte Icon Show for admin parms  */}

                                {params.role === "admin" &&
                                  userdata &&
                                  userdata.user &&
                                  userdata.user.role === "admin" && (
                                    <>
                                      {(item.emailVerify === false &&
                                        item.AllfiledCreate == false) ||
                                      (item.emailVerify == true &&
                                        item.AllfiledCreate == false) ? (
                                        <DeleteIcon
                                          className="deleteIcon getUserIcon"
                                          onClick={() => {
                                            dispatch(
                                              Admin_Owner_DelteUserProfileAction(
                                                item._id
                                              )
                                            );
                                            setMyIndex(index + 1);
                                            setShowAlert(false);
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>{" "}
                {/* content End   */}
              </>
            )}

            {Alluser && Alluser.length <= 0 && (
              <div className="notShippingAddresh">
                <CancelIcon className="notShippingAddreshIcon" />
                <h2> {params.role} Container is Empty </h2>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
