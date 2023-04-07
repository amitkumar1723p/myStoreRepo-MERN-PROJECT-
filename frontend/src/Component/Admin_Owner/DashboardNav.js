import React, { useRef } from "react";
import "./DashboardNav.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
// get All Product
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
// create Product
import AddIcon from "@mui/icons-material/Add";
// order Icon
import GradingIcon from "@mui/icons-material/Grading";
// User Icon
import GroupIcon from "@mui/icons-material/Group";

//  Review Icon
import RateReviewIcon from "@mui/icons-material/RateReview";
// admin Icon
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector } from "react-redux";
// import
import { useNavigate, Link } from "react-router-dom";

export default function DashboardNav() {
  const hamburger = useRef();
  const asideElement = useRef();
  const { userdata } = useSelector((state) => {
    return state.meDetails;
  });
  const navigate = useNavigate();

  return (
    <div className="dashboardasideContainer">
      <div
        className="hamburger"
        ref={hamburger}
        onClick={(e) => {
          if (hamburger) {
            hamburger.current.classList.toggle("hamburger2");

            hamburger.current.firstElementChild.classList.toggle(
              "hamburgerFirstP"
            );

            hamburger.current.lastElementChild.classList.toggle("displaynone");

            asideElement.current.classList.toggle("asidemove");
          }
        }}
      >
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="dashboardaside asidemove" ref={asideElement}>
        <p
          onClick={() => {
            navigate("/admin_owner/dashboard");
          }}
        >
          {" "}
          <DashboardIcon className="dashboardIcon" /> <span>Dashboard</span>{" "}
        </p>
        <div className="DasboardProdcuts">
          <div>
            <ArticleIcon className="dashboardIcon" /> <span> Products</span>
          </div>
          <p
            onClick={() => {
              navigate("/admin_owner/allproduct");
            }}
            className="productChild"
          >
            {" "}
            <PlaylistAddIcon className="dashboardChildIcon" />
            <span>All</span>{" "}
          </p>
          <p
            onClick={() => {
              navigate("/admin_owner/createProduct");
            }}
            className="productChild"
          >
            {" "}
            <AddIcon className="dashboardChildIcon" /> <span>Create</span>{" "}
          </p>
        </div>

        <p
          onClick={() => {
            navigate("/admin_owner/allorders");
          }}
        >
          <GradingIcon className="dashboardIcon" />
          <span>Orders</span>{" "}
        </p>

        <div className="dashboardUser">
          <div>
            {" "}
            <GroupIcon className="dashboardIcon" />
            <span>Users</span>
          </div>
          <p
            className="userChild"
            onClick={() => {
              navigate("/admin_owner/admin/user");
            }}
          >
            {" "}
            <AccessibilityIcon className="dashboardChildIcon" />{" "}
            <span>User</span>
          </p>

          <p
            className="userChild"
            onClick={() => {
              navigate("/admin_owner/admin/admin");
            }}
          >
            <PersonIcon className="dashboardChildIcon" /> Admin
          </p>

          <p
            className="userChild"
            onClick={() => {
              navigate("/admin_owner/owner/owner");
            }}
          >
            {" "}
            <PersonAddIcon className="dashboardChildIcon" /> Owner
          </p>
        </div>
        {/* <p>    <RateReviewIcon  className="dashboardIcon" />   <span>Reviews</span> </p> */}
        <p
          onClick={() => {
            navigate("/profile");
          }}
        >
          {" "}
          <ExitToAppIcon className="dashboardIcon" /> <span>Exist</span>{" "}
        </p>
      </div>
    </div>
  );
}
