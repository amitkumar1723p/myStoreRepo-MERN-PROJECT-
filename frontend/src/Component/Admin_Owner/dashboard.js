import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { GetAllProductsName } from "../../action/ProductAction";

import { Admin_Owner_GetAllUserOrdersAction } from "../../action/OrderAction";
import { Admin_Owner_GetAllUserAction } from "../../action/UserAction";
import Helmet from "../Helmet";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const { data } = useSelector((state) => {
    return state.getAllProductsName;
  });
  const { data: OrderData } = useSelector((state) => {
    return state.getAllOrder;
  });
  const { data: UserData } = useSelector((state) => {
    return state.getAllUser;
  });

  const [admin, setAdmin] = useState([]);
  const [user, setUser] = useState([]);
  const [owner, setOwner] = useState([]);
  const [doughnutState, setdoughnutState] = useState(null);
  const [totalPrice, settotalPrice] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProductsName());
    dispatch(Admin_Owner_GetAllUserOrdersAction());
    dispatch(Admin_Owner_GetAllUserAction());
  }, []);

  useEffect(() => {
    if (UserData) {
      if (UserData.success === true) {
        setAdmin(
          UserData.user.filter((item) => {
            return item.role === "admin";
          })
        );

        setOwner(
          UserData.user.filter((item) => {
            return item.role === "owner";
          })
        );

        setUser(
          UserData.user.filter((item) => {
            return item.role === "user";
          })
        );
      } else {
        setAdmin([]);
        setUser([]);
        setOwner([]);
      }

      if (data) {
        let outofStock = 0;
        if (data.success === true) {
          if (data.findAllProduct.length > 0) {
            data.findAllProduct.forEach((item) => {
              if (item.stock <= 0) {
                outofStock += 1; //  ( outofStock =outofStock+1)
              }
            });
            setdoughnutState({
              labels: ["Out of Stock", "InStock"],
              datasets: [
                {
                  hoverBackgroundColor: ["#485000", "#35014f"],
                  backgroundColor: ["#00A684", "#6800BA"],
                  data: [outofStock, data.findAllProduct.length - outofStock],
                  // data: [0, 1],
                },
              ],
            });
          }
        }
      }
    }
  }, [UserData, data]);

  const navigate = useNavigate();

  useEffect(() => {
    // ? OrderData.findorders.map((item) => {

    if (OrderData) {
      if (OrderData.success == true) {
        let total = OrderData.findorders.map((item) => {
          return item.totalPrice;
        });
        if (total.length > 0) {
          settotalPrice(
            total.reduce((acc, item) => {
              return acc + item;
            })
          );
        }

        if (String(totalPrice).includes(".")) {
          let totalvalue = String(totalPrice).split(".");

          if (totalvalue[1]) {
            if (totalvalue[1].length == 1) {
              settotalPrice(`${totalvalue[0]}.${totalvalue[1][0]}`);
            }

            if (totalvalue[1].length >= 2) {
              settotalPrice(
                `${totalvalue[0]}.${totalvalue[1][0]}${totalvalue[1][1]}`
              );
            }
          }
        }
      }
    }
  }, [totalPrice, settotalPrice, OrderData]);

  return (
    <>
      <Helmet title="MY Store --- Dashboard" />
      <div className="Dashboardmain">
        <DashboardNav />

        <div className="DashboardContent">
          <h1> Dashboard </h1>
          <div className="totalAmount">
            <p>Total Amount</p>

            <p>
              <span>₹&nbsp;{totalPrice}</span>
            </p>
          </div>
          <div className="circleContainer">
            <div className="circleContainerChild">
              <div
                className="product_Circle"
                onClick={() => {
                  navigate("/admin_owner/allproduct");
                }}
              >
                <div>
                  <p>Product</p>
                  <p>
                    {data && data.success == true
                      ? data.findAllProduct.length
                      : "0"}
                  </p>
                </div>
              </div>
              <div
                className="order_Circle"
                onClick={() => {
                  navigate("/admin_owner/allorders");
                }}
              >
                <div>
                  <p>Order</p>
                  <p>
                    {OrderData && OrderData.success === true
                      ? OrderData.findorders.length
                      : "0"}
                  </p>
                </div>
              </div>
              <div className="user_Circle">
                <div className="totalUser">
                  <p>User</p>
                  <p>
                    {UserData && UserData.success === true
                      ? UserData.user.length
                      : "0"}
                  </p>
                </div>
                <div className="smallCircleContainer">
                  <div
                    className="smallCircle smallCircle1"
                    onClick={() => {
                      navigate("/admin_owner/admin/admin");
                    }}
                  >
                    <div>
                      <p>admin</p>
                      <p>{admin.length}</p>
                    </div>
                  </div>

                  <div
                    className="smallCircle smallCircle2"
                    onClick={() => {
                      navigate("/admin_owner/admin/user");
                    }}
                  >
                    <div>
                      <p>user</p>
                      <p>{user.length}</p>
                    </div>
                  </div>

                  <div
                    className="smallCircle smallCircle3"
                    onClick={() => {
                      navigate("/admin_owner/owner/owner");
                    }}
                  >
                    <div>
                      <p>owner</p>
                      <p>{owner.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {doughnutState && (
            <div className="doughnutChart">
              <Doughnut className="doughnut" data={doughnutState}></Doughnut>
            </div>
          )}{" "}
        </div>
      </div>
    </>
  );
}
