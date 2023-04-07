import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";
import {
  GetSingleOrderUserAction,
  Admin_Owner_OrderProcess,
} from "../../action/OrderAction";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import "./UserSingleOrderDetails.css";
import {
  UserSingleOrderClear,
  Admin_Owner_UpdateProcessOrder_Clear,
} from "../../Constant/OrderConstant";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function UserSingleOrderDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, loading } = useSelector((state) => {
    return state.SingleUserOrder;
  });

  const { orderLoading, Orderdata } = useSelector((state) => {
    return state.orderDetails;
  });

  const [errortext, setErrorText] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [OrderProcess, setOrderProcess] = useState("");

  useEffect(() => {
    dispatch(GetSingleOrderUserAction(params.orderId));
  }, []);

  useEffect(() => {
    if (data) {
      if (data.success === false) {
        setShowAlert(true);
        setErrorText(data.error);
        setAlertDetails({ AlertType: "Error", AlertMessage: data.error });
        dispatch({ type: UserSingleOrderClear });
      }

      if (data.success === true) {
        setErrorText(null);

        let AlertType = document.getElementById("AlertType");
        if (AlertType) {
          if (AlertType.innerText.includes("Error")) {
            setShowAlert(false);
          }
        }
      }
    }
  }, [data, loading]);

  useEffect(() => {
    if (Orderdata) {
      if (Orderdata.success === false) {
        setShowAlert(true);
        setAlertDetails({ AlertType: "Error", AlertMessage: Orderdata.error });
        dispatch({ type: Admin_Owner_UpdateProcessOrder_Clear });
      }

      if (Orderdata.success === true) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: Orderdata.message,
        });
        dispatch(GetSingleOrderUserAction(params.orderId));
        dispatch({ type: Admin_Owner_UpdateProcessOrder_Clear });
      }
    }
  }, [Orderdata, orderLoading]);

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
      <Helmet title="MY Store ---Order Detail" />
      {loading === true ? (
        <Loader loading={"protectedloader"} />
      ) : (
        <>
          {data && data.success === true && (
            <>
              {location.pathname.includes("admin_owner") === true && (
                <button
                  style={{ top: "85px" }}
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="goBack"
                >
                  {" "}
                  Go Back
                </button>
              )}

              <div className="SingleOrderMainContainer">
                <div className="singleOrderfirst_second-SectionContainer">
                  {/* Single Order First Section  */}
                  <div className="singleOrderfirstSection">
                    <div className="singleOrderOrderId">
                      <h1>Order Id :- {params.orderId}</h1>
                    </div>

                    <div className="singleOrder_shippingInfoContainer">
                      <h1>Shipping Info</h1>
                      <p>
                        Name : <span>{data.order.shippingInfo.name}</span>{" "}
                      </p>
                      <p>
                        Contact : <span>{data.order.shippingInfo.contact}</span>
                      </p>
                      <p>
                        Address :
                        <span>
                          {data.order.shippingInfo.address}&nbsp;
                          {data.order.shippingInfo.city}&nbsp;
                          {data.order.shippingInfo.state}&nbsp;
                          {data.order.shippingInfo.country}
                        </span>
                      </p>
                    </div>

                    <div className="singleOrder_cartItems">
                      <h1>Order Items</h1>

                      <div className="singleOrder_cartDetails">
                        {data.order.orderItems.map((Items, index) => {
                          return (
                            <div
                              className="singleOrder_cartItemsFlex"
                              key={index}
                            >
                              <div className="singleOrder_cartItemsFlex_First-Child">
                                <Link
                                  className="underline_none"
                                  to={
                                    location.pathname.includes(
                                      "admin_owner"
                                    ) === true
                                      ? `/admin_owner/productDetails/${Items.productId}`
                                      : `/productDetails/${Items.productId}`
                                  }
                                >
                                  <img src={Items.image} />
                                </Link>
                                &nbsp;&nbsp;
                                <div>
                                  <p className="singleOrder_ProductId">
                                    <Link
                                      className="underline_none"
                                      to={
                                        location.pathname.includes(
                                          "admin_owner"
                                        ) === true
                                          ? `/admin_owner/productDetails/${Items.productId}`
                                          : `/productDetails/${Items.productId}`
                                      }
                                    >
                                      ProductId :- {Items.productId}
                                    </Link>
                                  </p>
                                  <p>{Items.name}</p>
                                </div>
                              </div>
                              &nbsp; &nbsp;
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
                  {/* Single Order First Section End  */}

                  {/* Single Order Second Section  */}
                  <div className="SingleOrder_secondSection">
                    <div>
                      <h2 className="payment_OrderHeading">
                        Payment And Order Details
                      </h2>

                      <div className="SingleOrder_calPrice">
                        <div>
                          <p>Payment</p>
                          <p
                            style={{
                              color:
                                data.order.paymentInfo.status === "succeeded"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {" "}
                            {data.order.paymentInfo.status === "succeeded"
                              ? "PAID"
                              : "UNPAID"}
                          </p>
                        </div>
                        <div>
                          <p>PAID AT</p>
                          <p className="PAIDAT">{`${new Date(
                            data.order.paidAt
                          ).toDateString()} - ${new Date(
                            data.order.paidAt
                          ).toLocaleTimeString()}`}</p>
                        </div>

                        <div>
                          <p>Amount</p>
                          <p> ₹ {data.order.totalPrice} </p>
                        </div>

                        <div>
                          <p>OrderStatus</p>
                          <p
                            style={{
                              color:
                                data.order.orderStatus === "Delivered"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {data.order.orderStatus}{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    {location.pathname.includes("admin_owner") == true &&
                      data.order.orderStatus !== "Delivered" && (
                        <div className="processorderformContainer">
                          {/* orderLoading === true ?  */}
                          {/* (<Loader loading={"protectedloader"} />) */}
                          {orderLoading === true ? (
                            <Loader loading={"Orderprocessloading"} />
                          ) : (
                            <form
                              action=""
                              className="processorderfrom"
                              onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(
                                  Admin_Owner_OrderProcess(
                                    { OrderProcess },
                                    params.orderId
                                  )
                                );
                              }}
                            >
                              <h2> Process Order</h2>
                              <select
                                value={OrderProcess}
                                required
                                onChange={(e) => {
                                  setOrderProcess(e.target.value);
                                }}
                              >
                                <option value="">Update Order Process </option>
                                {data.order.orderStatus === "Processing" && (
                                  <option value="Shipped">Shipped</option>
                                )}
                                {data.order.orderStatus === "Shipped" && (
                                  <option value="Delivered">Delivered</option>
                                )}
                              </select>

                              <button>Process Order</button>
                            </form>
                          )}
                        </div>
                      )}
                  </div>

                  {/* Single Order Second Section End  */}
                </div>
              </div>
            </>
          )}
          {errortext && (
            <>
              <div className="IderrorBox">
                <h1>{errortext}</h1>

                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Go Back
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
