import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React from "react";
import axios from "axios";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import "./App.css";
import "./utility.css";
import Homepage from "./Component/Home/Homepage";
import AllProducts from "./Component/AllProducts/AllProducts";
import SingleProductDetails from "./Component/AllProducts/SingleProductDetails";
import LoginAndSingup from "./Component/User/LoginAndSingup";
import ForgetEmail from "./Component/User/ForgetEmail";
import ForgotPassword from "./Component/User/ForgotPassword";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMeDetails } from "./action/UserAction";
import Alert from "./Component/Alert/Alert";
import UserProfile from "./Component/User/UserProfile";
import { GetAllProductsName } from "./action/ProductAction";
import ProtectedRoutes from "./Component/ProtectedRoutes.js";
import ChangePassword from "./Component/User/ChangePassword";
import Icons from "./Component/Icons";
import changeEmail from "./Component/User/changeEmail";
import EditProfile from "./Component/User/EditProfile";
import Cart from "./Component/Cart/Cart";
import Shipping from "./Component/Cart/Shipping";
import ConfrimOrder from "./Component/Cart/ConfrimOrder";
import Payments from "./Component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserOrders from "./Component/Orders/UserOrders";
import UserSingleOrderDetails from "./Component/Orders/UserSingleOrderDetails";
import Dashboard from "./Component/Admin_Owner/dashboard";
import CreateProduct from "./Component/Admin_Owner/CreateProduct";
import Admin_Owner_AllProducts from "./Component/Admin_Owner/Admin_Owner_AllProducts";
import Admin_Owner_UserDetails from "./Component/Admin_Owner/Admin_Owner_UserDetails";
import UpdateUserṚole from "./Component/Admin_Owner/UpdateUserRole";
import Admin_OwnerSingleUserDetails from "./Component/Admin_Owner/Admin_OwnerSingleUserDetails";
import Admin_Owner_getAllUserOrder from "./Component/Admin_Owner/Admin_Owner_getAllUserOrder";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userdata, IsAuthenticated } = useSelector((state) => {
    return state.meDetails;
  });
  const [headerHeight, setheaderHeight] = useState(0);
  const [footerHeight, setfooterHeight] = useState(0);
  const { showAlert } = useSelector((state) => {
    return state.Alert;
  });

  //  const [headerHeight,setheaderHeight]
  useEffect(() => {
    dispatch(GetMeDetails());
    dispatch(GetAllProductsName());
  }, []);

  useEffect(() => {
    setInterval(() => {
      let header = document.querySelector("header");
      let footer = document.querySelector("footer");
      if (header) {
        setheaderHeight(header.offsetHeight);
      }
      if (footer) {
        setfooterHeight(footer.offsetHeight);
      }
    }, 0);
  });

  return (
    <>
      <Navbar />

      {showAlert && (
        <Alert
          AlertType={showAlert.AlertType}
          AlertMessage={showAlert.AlertMessage}
          setShowAlert={showAlert.show}
        />
      )}
      {location.pathname.includes("admin_owner") == false && <Icons />}

      <div
        className="maindiv"
        style={{
          minHeight: `calc(${100}vh - ${headerHeight}px - ${footerHeight}px)`,
        }}
      >
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/Products" element={<AllProducts />} />
          <Route
            exact
            path="/productDetails/:productId"
            element={<SingleProductDetails />}
          />
          <Route exact path="/forgetemail" element={<ForgetEmail />} />
          <Route exact path="/login-singup" element={<LoginAndSingup />} />
          <Route exact path="/forgetpassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/profile"
            element={<ProtectedRoutes Component={UserProfile} />}
          />
          <Route
            exact
            path="/changepassword"
            element={<ProtectedRoutes Component={ChangePassword} />}
          />
          <Route
            exact
            path="/changeEmail"
            element={<ProtectedRoutes Component={changeEmail} />}
          />
          <Route
            exact
            path="/profileEdit"
            element={<ProtectedRoutes Component={EditProfile} />}
          />
          <Route
            exact
            path="/cartItem"
            element={<ProtectedRoutes Component={Cart} />}
          />
          <Route
            exact
            path="/shipping"
            element={<ProtectedRoutes Component={Shipping} />}
          />
          <Route
            exact
            path="/confrim/order"
            element={<ProtectedRoutes Component={ConfrimOrder} />}
          />
          <Route
            exact
            path="/me/orders"
            element={<ProtectedRoutes Component={UserOrders} />}
          />
          <Route
            exact
            path="/me/OrderDetails/:orderId"
            element={<ProtectedRoutes Component={UserSingleOrderDetails} />}
          />
          <Route
            exact
            path="/admin_owner/dashboard"
            element={<ProtectedRoutes isAdmin={true} Component={Dashboard} />}
          />
          <Route
            exact
            path="/admin_owner/createProduct"
            element={
              <ProtectedRoutes isAdmin={true} Component={CreateProduct} />
            }
          />
          <Route
            exact
            path="/admin_owner/allproduct"
            element={
              <ProtectedRoutes
                isAdmin={true}
                Component={Admin_Owner_AllProducts}
              />
            }
          />
          <Route
            exact
            path="/admin_owner/updateproduct/:ProductId"
            element={
              <ProtectedRoutes isAdmin={true} Component={CreateProduct} />
            }
          />
          <Route
            exact
            path="/admin_owner/productDetails/:productId"
            element={
              <ProtectedRoutes
                isAdmin={true}
                Component={SingleProductDetails}
              />
            }
          />
          <Route
            exact
            path="/admin_owner/admin/:role"
            element={
              <ProtectedRoutes
                isAdmin={true}
                Component={Admin_Owner_UserDetails}
              />
            }
          />
          <Route
            exact
            path="/admin_owner/owner/:role"
            element={
              <ProtectedRoutes
                isAdmin={true}
                Component={Admin_Owner_UserDetails}
              />
            }
          />
          <Route
            exact
            path="/admin_owner/updateuserrole"
            element={
              <ProtectedRoutes isOwner={true} Component={UpdateUserṚole} />
            }
          />
          <Route
            exact
            path="/admin_owner/getUserDetails"
            element={
              <ProtectedRoutes
                isAdmin={true}
                Component={Admin_OwnerSingleUserDetails}
              />
            }
          />
          <Route
            exact
            path="/admin_owner/allorders"
            element={
              <ProtectedRoutes
                isAdmin={true}
                Component={Admin_Owner_getAllUserOrder}
              />
            }
          />
          <Route
            exact
            path="/admin_owner/SingleOrder/:orderId"
            element={
              <ProtectedRoutes
                isAdmin={true}
                Component={UserSingleOrderDetails}
              />
            }
          />
          <Route
            exact
            path="/process/payment"
            element={<ProtectedRoutes Component={Payments} />}
          />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
        {/* 
        <Elements stripe={loadStripe(process.env.REACT_APP_PublicKey)}>
          <Routes>
            <Route
              exact
              path="/process/payment"
              element={<ProtectedRoutes Component={Payments} />}
            />
          </Routes>
        </Elements> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
