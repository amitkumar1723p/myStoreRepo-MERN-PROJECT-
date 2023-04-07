import React, { useState, useEffect, useRef } from "react";
import loginicon from "../../src/images/loginicon.png";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, Link, Navigate, useLocation } from "react-router-dom";

import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import { useSelector, useDispatch } from "react-redux";
import "./iconpage.css";
import { AlertAction } from "./../action/AlertAction";
import { LogoutUserAction } from "./../action/UserAction";

import { UserLogoutClear, MeDetailsClear } from "./../Constant/UserConstant";

export default function Icons() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => {
    return state.meDetails;
  });
  const IconContainer = useRef(null);
  const { userlogoutdata } = useSelector((state) => {
    return state.LogoutUser;
  });

  const { cartItems } = useSelector((state) => {
    return state.Cart;
  });

  const [iconshow, setIconShow] = useState(false);

  const [imgeUrl, setImgaUrl] = useState(loginicon);
  const [iconArr, setIconArr] = useState([]);
  const [Isicon, setIsIcon] = useState(true);

  if (iconshow == true) {
    document.addEventListener("click", (e) => {
      if (IconContainer.current) {
        let hideelement = IconContainer.current.contains(e.target);
        let alertContainer = document.querySelector(".alert-container");

        if (alertContainer) {
          hideelement = alertContainer.contains(e.target);
        }

        if (hideelement === false) {
          setIconShow(false);
        }
      }
    });
  }

  let Iconfunction = (iconName, navigatepath) => {
    if (iconName == "Logout") {
      dispatch(LogoutUserAction());
      setIconArr([
        {
          Icon: LoginIcon,
          IconName: "Login",
          Iconfunction,
          navigatepath: "/login-singup",
        },
      ]);

      setImgaUrl(loginicon);
      dispatch({ type: MeDetailsClear });
    } else {
      navigate(navigatepath);
    }
  };

  useEffect(() => {
    if (userlogoutdata) {
      if (userlogoutdata.success === true) {
        dispatch(AlertAction("Success", userlogoutdata.message, null));
        dispatch({ type: UserLogoutClear });

        navigate("/login-singup");
      }

      if (userlogoutdata.success === false) {
        dispatch(AlertAction("Error", userlogoutdata.error, null));
        dispatch({ type: UserLogoutClear });
      }
    }
  }, [dispatch, userlogoutdata]);

  useEffect(() => {
    if (userdata) {
      if (userdata.IsAuthenticated === true) {
        if (userdata.user.role == "admin" || userdata.user.role == "owner") {
          setIconArr([
            {
              Icon: LogoutIcon,
              IconName: "Logout",
              Iconfunction,
              navigatepath: null,
            },
            {
              Icon: PersonIcon,
              IconName: "Profile",
              Iconfunction,
              navigatepath: "/profile",
            },
            {
              Icon: DashboardIcon,
              IconName: "Dashboard",
              Iconfunction,
              navigatepath: "/admin_owner/dashboard",
            },
            {
              Icon: ShoppingCartIcon,
              IconName: "CartItem",
              Iconfunction,
              navigatepath: "/cartItem",
            },
            {
              Icon: ListAltRoundedIcon,
              IconName: "MyOrders",
              Iconfunction,
              navigatepath: "/me/orders",
            },
          ]);
        }

        if (userdata.user.role === "user") {
          setIconArr([
            {
              Icon: LogoutIcon,
              IconName: "Logout",
              Iconfunction,
              navigatepath: null,
            },
            {
              Icon: PersonIcon,
              IconName: "Profile",
              Iconfunction,
              navigatepath: "/profile",
            },
            {
              Icon: ShoppingCartIcon,
              IconName: "CartItem",
              Iconfunction,
              navigatepath: "/cartItem",
            },
            {
              Icon: ListAltRoundedIcon,
              IconName: "Orders",
              Iconfunction,
              navigatepath: "/me/orders",
            },
          ]);
        }

        setImgaUrl(userdata.user.userimage.url);
      }
      if (userdata.IsAuthenticated === false) {
        setIconArr([
          {
            Icon: LoginIcon,
            IconName: "Login",
            Iconfunction,
            navigatepath: "/login-singup",
          },
        ]);

        setImgaUrl(loginicon);
      }
    }
  }, [imgeUrl, userdata]);

  return (
    <>
      <div
        ref={IconContainer}
        className="iconContainer"
        onMouseOver={() => {
          setIconShow(true);

          //  document.body.style.backgroundColor="#00000052"
        }}
        onMouseOut={() => {
          setIconShow(false);
          // document.body.style.background="white"
        }}
      >
        <object data={imgeUrl} className="objectimg">
          <img src={loginicon} alt="" />
        </object>

        {iconArr.map(({ Icon, IconName, navigatepath }, index) => {
          return (
            <div className="iconandname" key={index}>
              {iconshow == true && location.pathname !== navigatepath && (
                <>
                  <div
                    className="iconbox"
                    onMouseEnter={(e) => {
                      let nextElement =
                        e.target.parentElement.nextElementSibling;
                      if (nextElement) {
                        nextElement.style.display = "block";
                      }

                      //   Grap the Privious Element
                    }}
                    onMouseLeave={(e) => {
                      let nextElement =
                        e.target.parentElement.nextElementSibling;

                      if (nextElement) {
                        nextElement.style.display = "none";
                      }
                    }}
                    onClick={(e) => {
                      Iconfunction(IconName, navigatepath);
                    }}
                  >
                    <Icon className="originalicon" />
                  </div>

                  <div className="iconName" style={{ display: "none" }}>
                    {IconName}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
