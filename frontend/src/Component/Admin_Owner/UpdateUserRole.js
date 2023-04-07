import React, { useState, useEffect } from "react";
import DashboardNav from "./DashboardNav";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./UpdateUserRole.css";
import { Admin_Owner_GetAllUserAction } from "../../action/UserAction";

import Loader from "../Loader/loader";
import "./Admin_Owner_UserDetails.css";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";

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

import { Admin_Owner_UpdateUserRole } from "../../action/UserAction";
import { Owner_Admin_All_User_Clear } from "../../Constant/UserConstant";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import LaunchIcon from "@mui/icons-material/Launch";
import { Owner_Admin_updateRole_Clear } from "../../Constant/UserConstant";

export default function UpdateUserRole() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setrole] = useState("");
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [showAlert, setShowAlert] = useState(null);

  const [user, setuser] = useState(null);

  useEffect(() => {
    if (location.state) {
      if (location.state.item) {
        setrole(location.state.item.role);
        setuser(location.state.item);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  }, [location]);

  const { loading, data } = useSelector((state) => {
    return state.EditProfile;
  });

  useEffect(() => {
    if (data) {
      if (data.success === false) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Error",
          AlertMessage: `${data.error}`,
        });

        dispatch({ type: Owner_Admin_updateRole_Clear });
      }
      if (data.success === true) {
        setShowAlert(true);
        dispatch(Admin_Owner_GetAllUserAction());
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: `${data.message}`,
        });

        if (role == "user") {
          setTimeout(() => {
            navigate("/admin_owner/admin/user");
          }, 10);
        }
        if (role === "admin") {
          setTimeout(() => {
            navigate("/admin_owner/admin/admin");
          }, 10);
        }
        if (role === "owner") {
          setTimeout(() => {
            navigate("/admin_owner/owner/owner");
          }, 10);
        }
      }

      dispatch({ type: Owner_Admin_updateRole_Clear });
    }
  }, [loading, data, showAlert, navigate]);

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

  return (
    <>
      {user && (
        <div className="UpdateRoleMain">
          <DashboardNav />
          <div className="UpdateRoleContent">
            <div className="UpdateRoleContainer">
              {loading === true ? (
                <Loader loading={"protectedloader"} />
              ) : (
                <>
                  <h2>Update Role</h2>
                  <form
                    className="UpdateRoleform"
                    onSubmit={(e) => {
                      setShowAlert(false);
                      e.preventDefault();

                      dispatch(Admin_Owner_UpdateUserRole({ role }, user._id));
                    }}
                  >
                    <div>
                      <label htmlFor="UpdateRoleName">
                        {" "}
                        <PersonIcon />{" "}
                      </label>
                      <input
                        type="text"
                        readOnly
                        id="UpdateRoleName"
                        value={user.name}
                      />
                    </div>
                    <div>
                      <label htmlFor="UpdateRoleEmail">
                        {" "}
                        <EmailIcon />{" "}
                      </label>
                      <input
                        type="email"
                        readOnly
                        id="UpdateRoleEmail"
                        value={user.email}
                      />
                    </div>
                    <div>
                      <label htmlFor="UpdateRole_Role">
                        {" "}
                        <CheckCircleIcon />{" "}
                      </label>
                      {/* <input type="text"  id="UpdateRoleName" /> */}
                      <select
                        id="UpdateRole_Role"
                        value={role}
                        required
                        onChange={(e) => {
                          setShowAlert(false);
                          setrole(e.target.value);
                        }}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="owner">Owner</option>
                      </select>
                    </div>

                    <button> Update Role </button>
                  </form>
                </>
              )}
            </div>
          </div>{" "}
          {/*End  Content */}
        </div>
      )}
    </>
  );
}
