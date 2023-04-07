import React, { useEffect, useState } from "react";
import "./login_Sinup.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  UserEmailVefify,
  OtpVerify,
  CreateUser,
  LoginuserAction,
  GetMeDetails,
} from "../../action/UserAction";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import Alert from "../Alert/Alert";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { UserClear } from "../../Constant/UserConstant";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";

export default function LoginAndSingup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => {
    return state.userdata;
  });

  const { loading: Loaders, userdata } = useSelector((state) => {
    return state.meDetails;
  });

  const [translate, setTranslate] = useState(false);
  const [containertranslate, SetContainerTranslate] = useState(false);
  const [containertranslate2, SetContainerTranslate2] = useState(false);
  const [passwordtype, setPasswordType] = useState("password");
  const [show, setShow] = useState(false);
  const [emailverify, setEmailverify] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [documentid, setDocumentid] = useState(null);
  const [otpvalue, setOtpValue] = useState("");
  const [verifyemailbyotp, setVerifyEmailByOtp] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    userimage: "",
  });
  const [showuserimage, setUserImage] = useState("");
  const [LoginDetails, setLoginDetails] = useState({ password: "", email: "" });
  const [showloginpasword, setLoginPassword] = useState(false);
  const [loginpasswordtext, setLoginPasswordText] = useState("password");

  useEffect(() => {
    if (userdata) {
      dispatch(GetMeDetails());
    }
  }, []);

  useEffect(() => {
    let errormessage = "";

    if (data) {
      if (data.success === false) {
        if (data.fielderrors) {
          data.fielderrors.forEach((item) => {
            errormessage += `< ${item.msg} > `;
          });
          setShowAlert(true);
          setUserImage("");

          setAlertDetails({
            AlertType: "Error",
            AlertMessage: `${errormessage}`,
          });
          dispatch({ type: UserClear });
          // dispatch({ type: UserClear })
        } else {
          if (data.goback == true) {
            SetContainerTranslate(false);
            SetContainerTranslate2(false);
            setUserDetails({
              name: "",
              email: "",
              contact: "",
              password: "",
              userimage: "",
            });
            setOtpValue("");
            setVerifyEmailByOtp("");
          }
          setShowAlert(true);
          setUserImage("");
          setAlertDetails({
            AlertType: "Error",
            AlertMessage: `${data.error}`,
          });
          dispatch({ type: UserClear });
          // setShowAlert(false)
        }
      }
      if (data.success === true) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: `${data.message}`,
        });

        if (data.id) {
          SetContainerTranslate(true);
          setDocumentid(data.id);
        }
        if (data.verifyEmail) {
          SetContainerTranslate2(true);
          setVerifyEmailByOtp(data.verifyEmail);
          setUserDetails({ ...userDetails, email: data.verifyEmail });
          setOtpValue("");
        }
        if (data.userCreated === true) {
          setUserDetails({
            name: "",
            email: "",
            contact: "",
            password: "",
            userimage: "",
          });
          dispatch(GetMeDetails());

          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        }

        if (data.login === true) {
          setLoginDetails({ password: "", email: "" });
          dispatch(GetMeDetails());
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        }

        dispatch({ type: UserClear });
      }
    }
  }, [dispatch, loading, data, showAlert, userDetails, navigate]);

  // Alert Use Effect
  //  Show and Close Alert
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

  const EmailVerifyFunction = (e) => {
    e.preventDefault();
    if (documentid) {
      dispatch(UserEmailVefify({ email: emailverify }, documentid));
      setShowAlert(false);
    } else {
      dispatch(UserEmailVefify({ email: emailverify }));
      setShowAlert(false);
    }
  };

  const OtpVerifyFunction = (e) => {
    e.preventDefault();
    // OtpVerify
    if (otpvalue.length < 6) {
      setShowAlert(true);
      setAlertDetails({
        AlertType: "Error",
        AlertMessage: "OTP is of 6 characters",
      });
    } else {
      dispatch(OtpVerify({ otp: otpvalue }));

      setShowAlert(false);
    }
  };

  const UserDocumentFunction = (e) => {
    e.preventDefault();
    setShowAlert(false);
    dispatch(CreateUser(userDetails));
  };

  const LoginUserFunction = (e) => {
    e.preventDefault();
    setShowAlert(false);
    dispatch(LoginuserAction(LoginDetails));
  };
  //   let loadings = true;
  return (
    // loading === true ? <Loader loading={'emailverifyloding'} />

    <>
      {/* userdata.IsAuthenticated == true */}
      {Loaders === true ? (
        <Loader loading={"protectedloader"} />
      ) : userdata && userdata.IsAuthenticated == true ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <Helmet title="MY Store --- Login-Singup" />

          <div className="main">
            <div className="first">
              {/* Login  And   Email Verfy container   */}

              <div
                className="loginAndSignupContainer"
                style={{
                  transform:
                    containertranslate === true
                      ? "translateX(-10%)"
                      : "translateX(100%)",
                  opacity: containertranslate === true ? 0 : 1,
                }}
              >
                {loading === true ? (
                  <Loader loading={"emailverifyloding"} />
                ) : (
                  <>
                    <div className="headingdiv">
                      <p
                        onClick={() => {
                          setTranslate(false);
                        }}
                      >
                        Login
                      </p>
                      <p
                        onClick={() => {
                          setTranslate(true);
                        }}
                      >
                        Register
                      </p>
                    </div>

                    <p
                      className="hrline"
                      style={{
                        transform:
                          translate === true
                            ? "translateX(100%)"
                            : "translateX(0%)",
                      }}
                    ></p>

                    <div className="secondmain">
                      <div className="formcontainer">
                        <form
                          className="loginuser"
                          style={{
                            transform:
                              translate === true
                                ? "translateX(100%)"
                                : "translateX(0%)",
                            opacity: translate === true ? 0 : 1,
                          }}
                          onSubmit={LoginUserFunction}
                        >
                          <div>
                            <label htmlFor="loginemail" className="icon">
                              <MailOutlineIcon className="emailicon" />
                            </label>
                            <input
                              type="email"
                              name=""
                              id="loginemail"
                              autoComplete="off"
                              placeholder="Email"
                              required
                              value={LoginDetails.email}
                              onChange={(e) => {
                                setLoginDetails({
                                  ...LoginDetails,
                                  email: e.target.value,
                                });

                                let AlertType = document.getElementById(
                                  "AlertType"
                                );

                                if (AlertType) {
                                  if (AlertType.innerText.includes("Error")) {
                                    setShowAlert(false);
                                  }
                                }
                              }}
                            />
                          </div>
                          <div>
                            <label htmlFor="loginpassword" className="icon">
                              {" "}
                              <LockOpenIcon className=" passwordicon" />
                            </label>

                            <input
                              type={loginpasswordtext}
                              placeholder="Password"
                              autoComplete="off"
                              id="loginpassword"
                              required
                              minLength={8}
                              value={LoginDetails.password}
                              onChange={(e) => {
                                setLoginDetails({
                                  ...LoginDetails,
                                  password: e.target.value,
                                });

                                let AlertType = document.getElementById(
                                  "AlertType"
                                );

                                if (AlertType) {
                                  if (AlertType.innerText.includes("Error")) {
                                    setShowAlert(false);
                                  }
                                }

                                // setShowAlert(false)
                              }}
                            />

                            <div
                              className="show-hidepassword"
                              onClick={() => {
                                if (showloginpasword === false) {
                                  setLoginPassword(true);
                                  setLoginPasswordText("text");
                                } else {
                                  setLoginPassword(false);
                                  setLoginPasswordText("password");
                                }
                              }}
                            >
                              {showloginpasword === true ? (
                                <VisibilityOutlinedIcon />
                              ) : (
                                <VisibilityOffOutlinedIcon />
                              )}
                            </div>
                          </div>
                          <div className="forgetemail-password">
                            <Link to="/forgetpassword"> Forgot Password </Link>
                            <Link to="/forgetemail"> Forgot Email </Link>
                          </div>

                          <button>Login</button>
                        </form>

                        <form
                          className="emailveryfy"
                          onSubmit={EmailVerifyFunction}
                          style={{
                            transform:
                              translate === true
                                ? "translateX(-100%)"
                                : "translateX(0%)",
                            opacity: translate === true ? 1 : 0,
                          }}
                        >
                          <div>
                            <label htmlFor="verifyemail" className="icon">
                              <MailOutlineIcon className="emailicon" />
                            </label>
                            <input
                              type="email"
                              placeholder="Email"
                              required
                              id="verifyemail"
                              value={emailverify}
                              onChange={(e) => {
                                setShowAlert(false);

                                setEmailverify(e.target.value);
                              }}
                            />
                          </div>
                          <button

                          // SetContainerTranslate(true)
                          >
                            Verify Email{" "}
                          </button>
                        </form>

                        {/* loading === true ? <Loader loading={'emailverifyloding'} />: */}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Otp Verify Container  */}

              <div
                className="otpverifycontainer"
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
                  <Loader loading={"otpverifyloading"} />
                ) : (
                  <form className="otpverify" onSubmit={OtpVerifyFunction}>
                    <div className="otptext">
                      <p
                        className="resendotp"
                        onClick={() => {
                          // UserEmailVefify({ email: emailverify })
                          SetContainerTranslate(false);
                          setTranslate(true);
                          setShowAlert(false);
                          setOtpValue("");
                        }}
                      >
                        Resend Otp
                      </p>
                      <p className="otptime">opt valid for 15 Minutes</p>
                    </div>
                    <div>
                      <label htmlFor="otpverify" className="icon">
                        <PinOutlinedIcon className="otpicon" />
                      </label>

                      <input
                        type="number"
                        placeholder="Enter Otp"
                        required
                        id="otpverify"
                        minLength={6}
                        maxLength={6}
                        value={otpvalue}
                        onChange={(e) => {
                          // if (otpvalue.length == 6) {
                          //     setOtpValue(otpvalue)
                          // }
                          if (e.target.value.length <= 6) {
                            setOtpValue(e.target.value);
                          }
                          setShowAlert(false);
                        }}
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        // e.preventDefault()
                        // SetContainerTranslate2(true)
                      }}
                    >
                      {" "}
                      Otp Verify{" "}
                    </button>
                  </form>
                )}
              </div>

              {/* Insert User Details Container  */}

              <div
                className="insertuserdetailsContainer"
                style={{
                  transform:
                    containertranslate2 === true
                      ? "translateX(-100%)"
                      : "translateX(50%)",
                  opacity: containertranslate2 === true ? 1 : 0,
                  margin: containertranslate2 === true ? "30px auto" : "auto",
                }}
              >
                {loading === true ? (
                  <Loader loading={"otpverifyloading"} />
                ) : (
                  <>
                    <h2> Insert Your Details</h2>
                    <form
                      className="insertdetailform"
                      onSubmit={UserDocumentFunction}
                      encType="multipart/form-data"
                    >
                      <div>
                        <label htmlFor="insertname" className="icon">
                          <FaceIcon />
                        </label>
                        <input
                          type="text"
                          id="insertname"
                          placeholder="Enter Your Name"
                          required
                          value={userDetails.name}
                          minLength={2}
                          maxLength={30}
                          onChange={(e) => {
                            setUserDetails({
                              ...userDetails,
                              name: e.target.value,
                            });
                            setShowAlert(false);
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="insertemail" className="icon">
                          <MailOutlineIcon />
                        </label>
                        <input
                          type="email"
                          id="insertemail"
                          readOnly
                          required
                          value={verifyemailbyotp}
                        />
                      </div>

                      <div>
                        <label htmlFor="insertcontact" className="icon">
                          <PhoneIphoneIcon />
                        </label>
                        <input
                          type="number"
                          id="insertcontact"
                          placeholder="Enter Your Contact"
                          minLength={10}
                          maxLength={10}
                          required
                          value={userDetails.contact}
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

                      <div>
                        <label htmlFor="insertpassword" className="icon">
                          <LockOpenIcon />
                        </label>
                        <input
                          type={passwordtype}
                          id="insertpassword"
                          placeholder="Enter Your Password"
                          required
                          value={userDetails.password}
                          minLength={8}
                          onChange={(e) => {
                            setUserDetails({
                              ...userDetails,
                              password: e.target.value,
                            });
                          }}
                        />
                        <div
                          className="show-hidepassword"
                          onClick={() => {
                            if (show === false) {
                              setShow(true);
                              setPasswordType("text");
                            } else {
                              setShow(false);
                              setPasswordType("password");
                            }
                            setShowAlert(false);
                          }}
                        >
                          {show === true ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="insertimage"
                          className="icon"
                          id="imageiconlabel"
                        >
                          {showuserimage ? (
                            <img src={showuserimage} alt="" />
                          ) : (
                            <AccountCircleIcon className="imageicon" />
                          )}
                        </label>
                        <input
                          type="file"
                          id="insertimage"
                          required
                          accept="image/*"
                          onChange={(e) => {
                            const reader = new FileReader();
                            if (e.target.files[0]) {
                              reader.readAsDataURL(e.target.files[0]);
                            } else {
                              setUserImage("");
                              setUserDetails({ ...userDetails, userimage: "" });
                            }
                            setShowAlert(false);

                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setUserImage(reader.result);
                                setUserDetails({
                                  ...userDetails,
                                  userimage: e.target.files[0],
                                });
                              }
                            };
                          }}
                        />
                      </div>

                      <button> Submit </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
