import React from "react";
import CheckoutStep from "./CheckoutStep";
import "./ConfrimOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router";

import Helmet from "../Helmet";

export default function ConfrimOrder() {
  const { cartItems, shipping_Info } = useSelector((state) => {
    return state.Cart;
  });
  const { userdata } = useSelector((state) => {
    return state.meDetails;
  });

  let subtotal = cartItems.map((acc) => {
    return acc.Quantity * acc.price;
  });

  const navigate = useNavigate();

  if (subtotal.length > 0) {
    subtotal = subtotal.reduce((acc, item) => {
      return acc + item;
    });
  }

  const shippingCharges = subtotal > 500 ? 0 : 50;

  let Gst = subtotal * 0.18;

  if (String(Gst).includes(".")) {
    let Gstvalue = String(Gst).split(".");

    if (Gstvalue[1]) {
      if (Gstvalue[1].length == 1) {
        Gst = `${Gstvalue[0]}.${Gstvalue[1][0]}`;
      }

      if (Gstvalue[1].length >= 2) {
        Gst = `${Gstvalue[0]}.${Gstvalue[1][0]}${Gstvalue[1][1]}`;
      }
    }
  }

  let totalPrice = subtotal + Gst + shippingCharges;

  if (String(totalPrice).includes(".")) {
    let totalvalue = String(totalPrice).split(".");

    if (totalvalue[1]) {
      if (totalvalue[1].length == 1) {
        totalPrice = `${totalvalue[0]}.${totalvalue[1][0]}`;
      }

      if (totalvalue[1].length >= 2) {
        totalPrice = `${totalvalue[0]}.${totalvalue[1][0]}${totalvalue[1][1]}`;
      }
    }
  }

  const proccedToPayment = () => {
    const data = { subtotal, shippingCharges, Gst, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <Helmet title="MY Store --- ConfrimOrder" />
      {cartItems.length > 0 ? (
        shipping_Info.state ? (
          <div className="confrimOrderMain">
            <CheckoutStep
              shippingIocnColor={"blue"}
              confrimOrderIconColor={"blue"}
              paymentIconColor={"black"}
            />

            <div className="first_second-SectionContainer">
              <div className="firstSection">
                <div className="confrimorder_shippingInfoContainer">
                  <h1>Shipping Info</h1>
                  <p>
                    Name:{" "}
                    <span>
                      {userdata && userdata.user && userdata.user.name}
                    </span>
                  </p>
                  <p>
                    Contact : <span>{shipping_Info.contact}</span>
                  </p>

                  <p>
                    Address :{" "}
                    <span>
                      {shipping_Info.address} , {shipping_Info.city} ,{" "}
                      {shipping_Info.pinCode} , {shipping_Info.state} ,{" "}
                      {shipping_Info.country}
                    </span>
                  </p>
                </div>

                <div className="confrimorder_cartItems">
                  <h1> Cart Items </h1>
                  <div className="confrimorder_cartDetails">
                    {cartItems.map((Items, index) => {
                      return (
                        <div className="confrimorder_cartItemsFlex" key={index}>
                          <div className="confrimorder_cartItemsFlex_First-Child">
                            <Link
                              className="underline_none"
                              to={`/productDetails/${Items.productId}`}
                            >
                              {" "}
                              <img src={Items.image} />
                            </Link>
                            &nbsp;&nbsp;
                            <div>
                              <p className="Confrimorder_ProductId">
                                {" "}
                                <Link
                                  className="underline_none"
                                  to={`/productDetails/${Items.productId}`}
                                >
                                  {" "}
                                  ProductId :- {Items.productId}{" "}
                                </Link>{" "}
                              </p>
                              <p>{Items.name}</p>
                            </div>
                            &nbsp;&nbsp;
                          </div>
                          <div>
                            <p>{Items.Quantity}</p>
                            <p>X</p>
                            <p>{Items.price}</p>
                            &nbsp;
                            <p>=</p>
                            &nbsp;
                            <p> ₹{Items.Quantity * Items.price}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Second Section  */}
              {/* ------------------------------------------------------ */}
              <div className="secondSection">
                <h1> Order Summery </h1>
                <div className="calPrice">
                  <div>
                    <p>subtotal</p>
                    <p>₹ {subtotal}</p>
                  </div>

                  <div>
                    <p>Shipping Charges</p>
                    <p> ₹ {shippingCharges}</p>
                  </div>

                  <div>
                    <p>GST</p>&nbsp; &nbsp;
                    <p>₹ {Gst}</p>
                  </div>
                </div>

                <div className="caltotalPrice">
                  <p>Total</p>
                  &nbsp; &nbsp;
                  <p>
                    {" "}
                    <span>₹&nbsp;{totalPrice}</span>{" "}
                  </p>
                </div>

                <button onClick={proccedToPayment}>Proceed To Payment </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="notShippingAddresh">
            <CancelIcon className="notShippingAddreshIcon" />
            <h2> Shipping Addresh not Found </h2>
          </div>
        )
      ) : (
        <div className="NoItemToCart">
          <RemoveShoppingCartIcon className="notitemtocartIcons" />
          <h3> No Product In Your Cart </h3>
          <Link to="/Products">
            {" "}
            <button className="noItemtocartButton">View Products </button>
          </Link>
        </div>
      )}
    </>
  );
}
