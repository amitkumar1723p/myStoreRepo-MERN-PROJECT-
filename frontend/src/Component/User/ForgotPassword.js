import "./ForgotPassword.css";
import React, { useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import Alert from "../Alert/Alert";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import {
  ForgetPasswordSendEmailAction,
  ForgotPasswordOtpVerifyAction,
  NewPassword,
} from "../../action/UserAction";
import { ForgotPasswordClear } from "../../Constant/UserConstant";
import { useNavigate } from "react-router-dom";
import { AlertAction } from "../../action/AlertAction";
import { ClearAlert } from "../../Constant/AlertContant";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, data } = useSelector((state) => {
    return state.ForgotPassword;
  });

  const [newpasswordshow, setNewPasswordShow] = useState(false);
  const [confrimpasswordshow, setConfrimPasswordShow] = useState(false);

  const [newpasswordtype, setNewPasswordType] = useState("password");
  const [confrimpasswordtype, setConfrimPasswordType] = useState("password");
  const [containertranslate, SetContainerTranslate] = useState(false);
  const [containertranslate2, SetContainerTranslate2] = useState(false);
  const [emailvalue, setEmailvalue] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [otpvalue, setOtpValue] = useState("");
  const [UserPassword, setUserPassword] = useState({
    password: "",
    confrimpassword: "",
  });

  useEffect(() => {
    let errormessage = "";

    if (data) {
      if (data.success === false) {
        if (data.fielderrors) {
          data.fielderrors.forEach((item) => {
            errormessage += `< ${item.msg} > `;
          });
          setShowAlert(true);

          setAlertDetails({
            AlertType: "Error",
            AlertMessage: `${errormessage}`,
          });
          dispatch({ type: ForgotPasswordClear });
        } else {
          setShowAlert(true);

          setAlertDetails({
            AlertType: "Error",
            AlertMessage: `${data.error}`,
          });

          if (data.goback == true) {
            SetContainerTranslate2(false);
            SetContainerTranslate(false);
            setOtpValue("");
            setUserPassword({ password: "", confrimpassword: "" });
            setEmailvalue("");
          }
          dispatch({ type: ForgotPasswordClear });
        }
      }
      if (data.success === true) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: `${data.message}`,
        });

        if (data.forgotpasswordotpsend == true) {
          SetContainerTranslate(true);
        }
        if (data.forgotpasswordotpisvalid == true) {
          SetContainerTranslate2(true);
          setOtpValue("");
        }
        if (data.changePassword === true) {
          setUserPassword({ password: "", confrimpassword: "" });
          setTimeout(() => {
            navigate("/login-singup");
          }, 1000);
        }

        dispatch({ type: ForgotPasswordClear });
      }
    }
  }, [dispatch, loading, data, showAlert]);

  const ForgotPasswordSendEmail = (e) => {
    e.preventDefault();

    setShowAlert(false);
    dispatch(ForgetPasswordSendEmailAction({ email: emailvalue }));
  };
  const ForgotPasswordOtpVerifyFunction = (e) => {
    e.preventDefault();
    setShowAlert(false);

    dispatch(ForgotPasswordOtpVerifyAction({ otp: otpvalue }));
  };

  const ChangePasswordFunction = (e) => {
    e.preventDefault();

    if (UserPassword.password === "" || UserPassword.confrimpassword === "") {
      setShowAlert(true);
      setAlertDetails({
        AlertType: "Error",
        AlertMessage: "This Field is Required",
      });
    } else {
      if (UserPassword.password !== UserPassword.confrimpassword) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Error",
          AlertMessage: "Password And Confrim Password not Match",
        });
      } else {
        dispatch(NewPassword({ password: UserPassword.password }));
      }
    }
  };

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
      <Helmet title="MY Store --- Forgot_Password" />

      <div className="ForgotpasswordMain">
        <div className="ForgotPassword_SecondMain">
          <div
            className="forgotPasswodSendEmail"
            style={{
              transform:
                containertranslate === true
                  ? "translateX(0%)"
                  : "translateX(100%)",
              opacity: containertranslate === true ? 0 : 1,
            }}
          >
            {loading === true ? (
              <Loader loading={"forgotpasswordloading"} />
            ) : (
              <form
                className="forgotpasswordform"
                onSubmit={ForgotPasswordSendEmail}
              >
                <h2 className="forgot_password_heading"> Forgot Password </h2>
                <div>
                  <label htmlFor="fogotpasswordEmail">
                    {" "}
                    <MailOutlineIcon />{" "}
                  </label>
                  <input
                    type="email"
                    name=""
                    id="fogotpasswordEmail"
                    required
                    placeholder="Enter Your Email"
                    value={emailvalue}
                    onChange={(e) => {
                      setEmailvalue(e.target.value);
                      setShowAlert(false);
                    }}
                  />
                </div>
                <button> Verify Mail</button>
              </form>
            )}
          </div>

          <div
            className="forgotPasswordotpverifyContainer"
            style={{
              transform:
                containertranslate2 === true
                  ? "translateX(-150%)"
                  : containertranslate === true
                  ? "translateX(0%)"
                  : "translateX(145%)",
              opacity:
                containertranslate2 === true
                  ? 0
                  : containertranslate === true
                  ? 1
                  : 0,
            }}
          >
            {loading === true ? (
              <Loader loading={"forgotpasswordloading"} />
            ) : (
              <form
                action=""
                className="forgotpasswordoptverifyform"
                onSubmit={ForgotPasswordOtpVerifyFunction}
              >
                <div className="forgotpasswordotptext">
                  <p
                    className="forgotpasswordresendotp"
                    onClick={() => {
                      SetContainerTranslate(false);
                      setShowAlert(false);
                      setOtpValue("");
                    }}
                  >
                    Resend Otp
                  </p>
                  <p className="forgotpasswordotptime">
                    opt valid for 15 Minutes
                  </p>
                </div>

                <div>
                  <label htmlFor="forgotpasswordotpverify">
                    <PinOutlinedIcon />{" "}
                  </label>
                  <input
                    type="number"
                    id="forgotpasswordotpverify"
                    placeholder="Enter Your Otp"
                    required
                    value={otpvalue}
                    minLength={6}
                    maxLength={6}
                    onChange={(e) => {
                      if (e.target.value.length <= 6) {
                        setOtpValue(e.target.value);
                      }
                      setShowAlert(false);
                    }}
                  />
                </div>
                <button
                  onClick={(e) => {
                    // SetContainerTranslate2(true)
                  }}
                >
                  {" "}
                  Otp Verify{" "}
                </button>
              </form>
            )}
          </div>

          <div
            className="NewPassworContainer"
            style={{
              transform:
                containertranslate2 === true
                  ? "translateX(-100%)"
                  : "translateX(50%)",
              opacity: containertranslate2 === true ? 1 : 0,
            }}
          >
            {loading === true ? (
              <Loader loading={"forgotpasswordloading"} />
            ) : (
              <form
                action=""
                className="NewPasswordform"
                onSubmit={ChangePasswordFunction}
              >
                <p className="sendotpagain">
                  {" "}
                  you have 15 minutes to change password{" "}
                </p>
                <div>
                  <label htmlFor="Newpassword">
                    {" "}
                    <LockOpenIcon />{" "}
                  </label>
                  <input
                    type={newpasswordtype}
                    id="Newpassword"
                    placeholder="Enter Your New Password"
                    value={UserPassword.password}
                    onChange={(e) => {
                      setShowAlert(false);
                      setUserPassword({
                        ...UserPassword,
                        password: e.target.value,
                      });
                    }}
                    minLength={8}
                    required
                  />

                  <div
                    className="newPassword_show-hidepassword"
                    onClick={() => {
                      if (newpasswordshow === false) {
                        setNewPasswordShow(true);
                        setNewPasswordType("text");
                      } else {
                        setNewPasswordShow(false);
                        setNewPasswordType("password");
                      }
                    }}
                  >
                    {newpasswordshow === true ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="ConfrimPassword">
                    {" "}
                    <LockOpenIcon />{" "}
                  </label>
                  <input
                    type={confrimpasswordtype}
                    id="ConfrimPassword"
                    placeholder="Enter Your Confrim Password"
                    value={UserPassword.confrimpassword}
                    onChange={(e) => {
                      setShowAlert(false);

                      setUserPassword({
                        ...UserPassword,
                        confrimpassword: e.target.value,
                      });
                    }}
                    minLength={8}
                    required
                  />

                  <div
                    className="confrimPassword_show-hidepassword"
                    onClick={() => {
                      if (confrimpasswordshow === false) {
                        setConfrimPasswordShow(true);
                        setConfrimPasswordType("text");
                      } else {
                        setConfrimPasswordShow(false);
                        setConfrimPasswordType("password");
                      }
                    }}
                  >
                    {confrimpasswordshow === true ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </div>
                </div>

                <button> Forgot Password </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
