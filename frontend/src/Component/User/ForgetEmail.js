import "./ForgotEmail.css";
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
  FindUser,
  ForgotEmailOtpVerify,
  SendNewEmail,
} from "../../action/UserAction";
import { ForgotEmailClear } from "../../Constant/UserConstant";
import { useNavigate } from "react-router-dom";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";

export default function ForgetEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, data } = useSelector((state) => {
    return state.ForgotEmail;
  });

  const [show, setShow] = useState(false);
  const [showtimertext, setShowTimertext] = useState(false);
  const [passwordtype, setPasswordType] = useState("password");
  const [containertranslate, SetContainerTranslate] = useState(false);
  const [containertranslate2, SetContainerTranslate2] = useState(false);
  const [newemailverify, newsetEmailverify] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [otpvalue, setOtpValue] = useState("");
  const [userDetails, setUserDetails] = useState({ contact: "", password: "" });

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
          dispatch({ type: ForgotEmailClear });
        } else {
          setShowAlert(true);

          setAlertDetails({
            AlertType: "Error",
            AlertMessage: `${data.error}`,
          });
          if (data.goback == true) {
            SetContainerTranslate(false);

            setUserDetails({ contact: "", password: "" });
            setOtpValue("");
            newsetEmailverify("");
          }

          dispatch({ type: ForgotEmailClear });
        }
      }
      if (data.success === true) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: `${data.message}`,
        });

        if (data.finduser === true) {
          SetContainerTranslate(true);
          setShowTimertext(true);

          setUserDetails({ contact: "", password: "" });
        }

        if (data.newEmailOtpSend === true) {
          setShowTimertext(false);
          SetContainerTranslate2(true);
        }
        if (data.changeEmailId === true) {
          setOtpValue("");
          setTimeout(() => {
            navigate("/login-singup");
          }, 1000);
        }

        dispatch({ type: ForgotEmailClear });
      }
    }
  }, [dispatch, loading, data, showAlert, userDetails, navigate]);

  const FindUserFunction = (e) => {
    e.preventDefault();

    dispatch(FindUser(userDetails));

    setShowAlert(false);
  };
  const SendNewEmailFunction = (e) => {
    e.preventDefault();
    dispatch(SendNewEmail({ email: newemailverify }));
    setShowAlert(false);
  };

  const OtpVerifyFunction = (e) => {
    e.preventDefault();
    dispatch(ForgotEmailOtpVerify({ otp: otpvalue }));
    setShowAlert(false);
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
      <Helmet title="MY Store --- Forgot_Email" />

      <div className="forgotemailmain">
        <div className="forgotemailsecond">
          {/* Find User Container  */}

          <div
            className="finduserContainer" 
            style={{
              transform:
                containertranslate === true
                  ? "translateX(0%)"
                  : "translateX(100%)",
              opacity: containertranslate === true ? 0 : 1,
            }}
          >
            {/* <Loader loading={'finduserloading'} /> */}
            {loading === true ? (
              <Loader loading={"finduserloading"} />
            ) : (
              <>
                <h2 className="forgotemailheading">Forgot Email </h2>

                <form
                  action=""
                  className="finduser"
                  onSubmit={FindUserFunction}
                >
                  <div>
                    <label htmlFor="findusercontact">
                      {" "}
                      <PhoneIphoneIcon />{" "}
                    </label>
                    <input
                      type="number"
                      id="findusercontact"
                      placeholder="Enter Your Contact"
                      required
                      value={userDetails.contact}
                      minLength={10}
                      maxLength={10}
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          setUserDetails({
                            ...userDetails,
                            contact: e.target.value,
                          });
                        }
                        setShowAlert(false);
                      }}
                    />
                  </div>

                  {/* [userDetails, setUserDetails */}

                  <div>
                    <label htmlFor="finduserpassword">
                      {" "}
                      <LockOpenIcon />
                    </label>
                    <input
                      type={passwordtype}
                      id="finduserpassword"
                      placeholder="Enter Your Password"
                      value={userDetails.password}
                      required
                      minLength={8}
                      onChange={(e) => {
                        setShowAlert(false);
                        setUserDetails({
                          ...userDetails,
                          password: e.target.value,
                        });
                      }}
                    />

                    <div
                      className="finduser_show-hidepassword"
                      onClick={() => {
                        if (show === false) {
                          setShow(true);
                          setPasswordType("text");
                        } else {
                          setShow(false);
                          setPasswordType("password");
                        }
                      }}
                    >
                      {show === true ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      // e.preventDefault()
                      // SetContainerTranslate(true)
                    }}
                  >
                    Forgot Email
                  </button>
                </form>
              </>
            )}
          </div>

          <div
            className="forgotemailContainer"
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
              <Loader loading={"finduserloading"} />
            ) : (
              <>
                <form
                  action=""
                  className="forgotemail"
                  onSubmit={SendNewEmailFunction}
                >
                  {showtimertext == true && (
                    <p className="submitdetailagain">
                      you have 15 minutes to send otp to new email
                    </p>
                  )}

                  {/* 
                            <p className='submitdetailagain' onClick={() => {
                                SetContainerTranslate(false)
                            }}>Submit details Again</p> */}

                  <div>
                    <label htmlFor="forgotemail">
                      {" "}
                      <MailOutlineIcon />
                    </label>
                    <input
                      type="email"
                      id="forgotemail"
                      placeholder="Enter Your new Email"
                      required
                      value={newemailverify}
                      onChange={(e) => {
                        setShowAlert(false);
                        newsetEmailverify(e.target.value);
                      }}
                    />
                  </div>
                  <button>New Email</button>
                </form>
              </>
            )}
          </div>

          <div
            className="forgotemailotpverifyContainer"
            style={{
              transform:
                containertranslate2 === true
                  ? "translateX(-100%)"
                  : "translateX(50%)",
              opacity: containertranslate2 === true ? 1 : 0,
            }}
          >
            {loading === true ? (
              <Loader loading={"finduserloading"} />
            ) : (
              <form
                action=""
                className="forgotemailotpverify"
                onSubmit={OtpVerifyFunction}
              >
                <div className="forgotemailotptext">
                  <p
                    className="forgotemailresendotp"
                    onClick={() => {
                      SetContainerTranslate(true);
                      SetContainerTranslate2(false);
                      setOtpValue("");
                      setShowAlert(false);
                    }}
                  >
                    Resend Otp
                  </p>
                  <p className="forgotemailotptime">opt valid for 15 Minutes</p>
                </div>

                <div>
                  <label htmlFor="forgotemailotpverify">
                    <PinOutlinedIcon />{" "}
                  </label>
                  <input
                    type="number"
                    id="forgotemailotpverify"
                    placeholder="Enter Your Otp"
                    required
                    value={otpvalue}
                    minLength={6}
                    maxLength={6}
                    onChange={(e) => {
                      setShowAlert(false);
                      if (e.target.value.length <= 6) {
                        setOtpValue(e.target.value);
                      }
                    }}
                  />
                </div>
                <button> Otp Verify </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
