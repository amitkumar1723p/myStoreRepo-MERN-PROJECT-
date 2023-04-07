import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrderUserAction } from "../../action/OrderAction";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";
import { UserOrderClear } from "../../Constant/OrderConstant";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import "./UserOrders.css";
import Helmet from "../Helmet";
import LaunchIcon from "@mui/icons-material/Launch";

export default function UserOrders() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => {
    return state.UserOrders;
  });

  useEffect(() => {
    dispatch(GetAllOrderUserAction());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      if (data.success === false) {
        dispatch(AlertAction("Error", data.error, null));
        dispatch({ type: UserOrderClear });
      } else {
        dispatch({ type: ClearAlert });
      }
    }
  }, [data]);

  return (
    <>
      <Helmet title="MY Store --- My Orders" />

      {loading === true ? (
        <Loader loading={"protectedloader"} />
      ) : (
        data &&
        data.success === true && (
          <>
            {data.findorders.length > 0 && (
              <div className="Order_tabel">
                <div className="orderHeadContainer">
                  <div className="Order_tabelHead Order_tabelflex">
                    <p className="SNOheading">SNo</p>
                    <p className="OrderId">OrderId</p>
                    <p>Item Qty</p>
                    <p>Amount</p>
                    <p className="status">Status</p>

                    <p className="OrderAction">Action</p>
                  </div>
                </div>
                {/* ------------------------------------------------------------------------------------------------------------------------------- */}

                {data.findorders.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="Order_tabelflex Order_tabelFlex2"
                    >
                      <p className="SNOChildren">{index + 1}.</p>
                      <p className="OrderId">{item._id}</p>
                      <p>{item.orderItems.length}</p>
                      <p> ₹ {item.totalPrice}</p>
                      <p
                        className="status"
                        style={{
                          color:
                            item.orderStatus === "Delivered" ? "green" : "red",
                        }}
                      >
                        {item.orderStatus}
                      </p>
                      <p className="Rocket">
                        {" "}
                        <Link to={`/me/OrderDetails/${item._id}`}>
                          {" "}
                          <LaunchIcon className="RocketIcon" />
                        </Link>
                      </p>
                    </div>
                  );
                })}
                
               

                {/* -------------------------------------------------------------------------------------------------------------------------------------- */}
              </div>
            )}

            {data.findorders.length <= 0 && (
              <div className="notShippingAddresh">
                <CancelIcon className="notShippingAddreshIcon" />
                <h2> Your Order Container is Empty </h2>
              </div>
            )}
          </>
        )
      )}
    </>
  );
}
