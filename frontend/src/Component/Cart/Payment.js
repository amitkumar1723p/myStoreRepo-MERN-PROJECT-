import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./payment.css";
import CheckoutStep from "./CheckoutStep";
import CancelIcon from "@mui/icons-material/Cancel";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
//   Elements,
// } from "@stripe/react-stripe-js";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../Helmet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { AlertAction } from "../../action/AlertAction";
import { ClearAlert } from "../../Constant/AlertContant";

import { AllCartClear } from "../../Constant/CartConstant";
import Loader from "../Loader/loader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// frontend\src\action\OrderAction.js

export default function Payment() {
  const [showAlert, setShowAlert] = useState(null);
  const [myCardDetails, setMyCardDetails] = useState();
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [payment, setpayment] = useState(false);

  const { userdata } = useSelector((state) => {
    return state.meDetails;
  });

  const { cartItems, shipping_Info } = useSelector((state) => {
    return state.Cart;
  });

  const [Loading, setLoading] = useState(false);
  const [buttondisabled, setButtonDisabled] = useState(false);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const stripe = useStripe();
  // const elements = useElements();

  const Payment_Submit = async (e) => {
    e.preventDefault();
    // setShowAlert(false);

    if (orderInfo && cartItems && shipping_Info) {
      const order = {
        shippingInfo: shipping_Info,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        Gst: orderInfo.Gst,
        shippingCharges: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };

      try {
        setButtonDisabled(true);
        setLoading(true);
        // setShowAlert(false);

        const config = {
          header: { "Content-type": "application/json" },
          withCredentials: true,
        };
        // const paymentData = { amount: orderInfo.totalPrice * 100 };
        // const { data } = await axios.post(
        //   `/user/payment/process`,
        //   paymentData,
        //   config
        // );
        // const client_secret = data.client_secret;

        // if (!stripe || !elements) {
        //   setButtonDisabled(false);
        //   setLoading(false);
        //   return;
        // }

        // const result = await stripe.confirmCardPayment(client_secret, {
        //   payment_method: {
        //     card: elements.getElement(CardNumberElement),
        //     billing_details: {
        //       name: userdata.user.name,
        //       email: userdata.user.email,
        //       address: {
        //         line1: shipping_Info.address,
        //         city: shipping_Info.city,
        //         state: shipping_Info.state,
        //         postal_code: shipping_Info.pinCode,
        //         country: shipping_Info.country,
        //       },
        //     },
        //   },
        // });

        // if (result.error) {
        //   // payBtn.current.disabled = false;
        //   setButtonDisabled(false);
        //   setLoading(false);
        //   setShowAlert(true);

        //   setAlertDetails({
        //     AlertType: "Error",
        //     AlertMessage: result.error.message,
        //   });
        // }

        // else {
        // if ((result.paymentIntent.status = "succeeded")) {
        order.paymentInfo = {
          PaymentId: "12345678912",
          status: "succeeded",
        };

        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: "Submit Your Payment ",
        });
        setpayment(true);

        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingInfo");
        sessionStorage.removeItem("orderInfo");

        setTimeout(async () => {
          try {
            setShowAlert(false);

            const { data } = await axios.post(
              `/user/createneworder`,
              order,
              config
            );
            if (data.success === true) {
            }

            setTimeout(() => {
              navigate("/me/orders");

              dispatch({ type: AllCartClear });
            }, 1000);
            setShowAlert(true);
            setAlertDetails({
              AlertType: "Success",
              AlertMessage: data.message,
            });
          } catch (error) {
            setLoading(true);

            if (error.response) {
              setShowAlert(true);
              setAlertDetails({
                AlertType: "Error",
                AlertMessage: error.response.data.error,
              });
            } else {
              setShowAlert(true);
              setAlertDetails({
                AlertType: "Error",
                AlertMessage: error.message,
              });
            }
          }
        }, 3000);
        // }

        //  else {
        //   setShowAlert(true);
        //   setAlertDetails({
        //     AlertType: "Error",
        //     AlertMessage: "There 's some issue whiele processing payment",
        //   });
        // }
        // }
      } catch (error) {
        setButtonDisabled(false);
        setLoading(false);
        setShowAlert(true);

        if (error.response) {
          setAlertDetails({
            AlertType: "Error",
            AlertMessage: error.response.data.error,
          });
        } else {
          // dispatch({ type: CreateOrderFail, payload: { error: error.message, success: false } })
          setAlertDetails({ AlertType: "Error", AlertMessage: error.message });
        }
      }
    } else {
      setShowAlert(true);
      setAlertDetails({
        AlertType: "Error",
        AlertMessage: "Order Info is Not Found",
      });
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
      <Helmet title="MY Store --- Process Payment" />
      {orderInfo ? (
        cartItems.length > 0 ? (
          shipping_Info.state ? (
            <div className="paymentMain">
              <CheckoutStep
                shippingIocnColor={"blue"}
                confrimOrderIconColor={"blue"}
                paymentIconColor={"blue"}
              />

              <div className="formContainer">
                <form className="paymentForm" onSubmit={Payment_Submit}>
                  <h2>Card Info</h2>

                  <div className="Payment_Input_First">
                    <CreditCardIcon className="Payment_Input_label" />

                    <input
                      type="text"
                      className="Payment_Input"
                      value="4000 0000 0000 5126"
                      readOnly
                    />
                    {/* <CardNumberElement /> */}
                  </div>
                  <small className="cardNumber">
                    {" "}
                    use This card Number <span></span>{" "}
                  </small>
                  <div>
                    <EventIcon className="Payment_Input_label" />
                    <input type="text" className="Payment_Input" value="4/12" />
                  </div>

                  <div>
                    <VpnKeyIcon className="Payment_Input_label" />
                    <input type="text" className="Payment_Input" value="123" />
                  </div>

                  <button disabled={buttondisabled == true ? true : false}>
                    {Loading == true ? (
                      <Loader loading="paymentLoading" />
                    ) : (
                      `Pay - ₹ ${orderInfo && orderInfo.totalPrice}`
                    )}
                  </button>
                </form>
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
        )
      ) : (
        payment === false && (
          <div className="notShippingAddresh">
            <CancelIcon className="notShippingAddreshIcon" />
            <h2> Payment Details Not Found </h2>
          </div>
        )
      )}

      {payment === true && (
        <div className="notShippingAddresh">
          <CheckCircleIcon className="notShippingAddreshIcon" />
          <h2> Payment Submit Sucessfully </h2>
        </div>
      )}
    </>
  );
}
