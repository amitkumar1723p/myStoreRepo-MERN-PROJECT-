import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Admin_Owner_GetAllUserOrdersAction,
  Admin_Owner_DelelteOrder,
} from "../../action/OrderAction";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";
import {
  Admin_Owner_GetAllUserOrders_Clear,
  Admin_Owner_DeleteOrder_Clear,
} from "../../Constant/OrderConstant";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import { Link, useNavigate } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Admin_Owner_getAllUserOrder.css";
export default function Admin_Owner_getAllUserOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, data } = useSelector((state) => {
    return state.getAllOrder;
  });

  const { orderLoading, Orderdata } = useSelector((state) => {
    return state.orderDetails;
  });

  // let orderLoadings = true;
  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });

  const [myIndex, setMyIndex] = useState();

  useEffect(() => {
    dispatch(Admin_Owner_GetAllUserOrdersAction());
  }, []);

  useEffect(() => {
    if (Orderdata) {
      if (Orderdata.success === false) {
        setShowAlert(true);
        setAlertDetails({ AlertType: "Error", AlertMessage: Orderdata.error });
        dispatch({ type: Admin_Owner_DeleteOrder_Clear });
      }

      if (Orderdata.success === true) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: Orderdata.message,
        });
        dispatch(Admin_Owner_GetAllUserOrdersAction());
        dispatch({ type: Admin_Owner_DeleteOrder_Clear });
      }
    }
  }, [Orderdata, orderLoading]);

  useEffect(() => {
    if (data) {
      if (data.success == false) {
        setShowAlert(true);
        setAlertDetails({ AlertType: "Error", AlertMessage: data.error });

        dispatch({ type: Admin_Owner_GetAllUserOrders_Clear });
      }

      if (data.success === true) {

        let AlertType = document.getElementById("AlertType");

        if (AlertType) {
          if (AlertType.innerText.includes("Error")) {
            setShowAlert(false);
          }
        }
      }
    }
  }, [data]);

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
      <Helmet title="MY Store --- get All Orders" />

      <div className="getOrdersmain">
        <DashboardNav />
        {loading === true ? (
          <Loader loading={"protectedloader"} />
        ) : (
          data &&
          data.success === true && (
            <>
              {data.findorders.length > 0 && (
                <>
                  <div className="getOrdersContent">
                    <div className="getOrdersHeadContainer">
                      <div className="getOrders_tabelHead getOrders_tabelFlex">
                        <p className="getOrders_Sno"> SNo </p>
                        <p className="getOrders_OrderId"> Order Id </p>
                        <p className="getOrders_User">User</p>
                        <p>Status</p>
                        <p>Item Qty</p>
                        <p>Amount</p>
                        <p className="getOrders_Action">Action</p>
                      </div>
                    </div>

                    {data.findorders.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="getOrders_tabelFlex getOrders_tabelFlex2"
                        >
                          <p className="getOrders_Sno">{index + 1}</p>
                          <p className="getOrders_OrderId">{item._id}</p>
                          <p className="getOrders_User">
                            <Link
                              to={"/admin_owner/getUserDetails"}
                              state={{ item: item.userId }}
                            >
                              <PersonAddIcon />
                            </Link>
                          </p>

                          <p
                            style={{
                              color:
                                item.orderStatus === "Delivered"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {item.orderStatus}
                          </p>
                          <p> {item.orderItems.length}</p>
                          <p> ₹ {item.totalPrice}</p>
                          <div className="getOrders_Action getOrders_ActionChild">
                            {orderLoading === true && myIndex === index + 1 ? (
                              <Loader loading={"smaillLoading"} />
                            ) : (
                              <>
                                <Link
                                  className="getOrders_ActionIcon"
                                  to={`/admin_owner/SingleOrder/${item._id}`}
                                >
                                  {/* /:orderId */}
                                  <LaunchIcon className="LaunchIcon" />
                                </Link>
                                <DeleteIcon
                                  className="getOrders_ActionIcon deleteIcon"
                                  onClick={() => {
                                    setMyIndex(index + 1);
                                    dispatch(
                                      Admin_Owner_DelelteOrder(item._id)
                                    );
                                  }}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {data.findorders.length <= 0 && (
                <div className="notShippingAddresh">
                  <CancelIcon className="notShippingAddreshIcon" />
                  <h2> Order Container is Empty </h2>
                </div>
              )}
            </>
          )
        )}
      </div>
    </>
  );
}
