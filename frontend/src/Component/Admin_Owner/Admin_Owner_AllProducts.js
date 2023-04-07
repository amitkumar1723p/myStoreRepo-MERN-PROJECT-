import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardNav from "./DashboardNav";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";
import "./Admin_Owner_AllProducts.css";
import { All_Products_Name_ClearError } from "../../Constant/ProductContanst";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link, useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteProduct_Clear } from "../../Constant/ProductContanst";
import {
  DeleteProductAction,
  GetAllProductsName,
} from "../../action/ProductAction";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Admin_Owner_AllProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: dataLoading, data } = useSelector((state) => {
    return state.getAllProductsName;
  });

  const { loading, productdata } = useSelector((state) => {
    return state.crtProduct;
  });
  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });

  const [myIndex, setMyIndex] = useState();

  useEffect(() => {
    dispatch(GetAllProductsName());
  }, []);
  useEffect(() => {
    if (data) {
      if (data.success == false) {
        setShowAlert(true);
        setAlertDetails({ AlertType: "Error", AlertMessage: data.error });

        dispatch({ type: All_Products_Name_ClearError });
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
    if (productdata) {
      if (productdata.success === true) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: productdata.message,
        });
        dispatch(GetAllProductsName());
        dispatch({ type: DeleteProduct_Clear });
      }
      if (productdata.success === false) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Error",
          AlertMessage: productdata.error,
        });
        dispatch({ type: DeleteProduct_Clear });
      }
    }
  }, [productdata]);

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

  let run = false;
  return (
    <>
      {/* import Helmet from '../Helmet' */}
      <Helmet title="MY Store --- get All Product" />
      <div className="getProductmain">
        <DashboardNav />

        {dataLoading == true ? (
          <Loader loading={"protectedloader"} />
        ) : (
          <>
            {data && data.success == true && (
              <>
                {data.findAllProduct.length > 0 && (
                  <>
                    <div className="getProductContent">
                      <div className="ProductHeadContainer">
                        <div className="Product_tabelHead Product_tabelFlex">
                          <p className="Product_Sno">SNo</p>
                          <p className="Product_productId">ProductId</p>
                          <p>CreatedBy</p>
                          <p>Name</p>
                          <p className="Product_stock">Stock</p>
                          <p>Action</p>
                        </div>
                      </div>

                      {data.findAllProduct.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="Product_tabelFlex Product_tabelFlex2"
                          >
                            <p className="Product_Sno">{index + 1}.</p>
                            <p className="Product_productId"> {item._id} </p>
                            <p> 
                              {" "}
                              <Link
                                to={"/admin_owner/getUserDetails"}
                                state={{ item: item.createproductuser }}
                              >
                                {" "}
                                <PersonAddIcon />{" "}
                              </Link>{" "}
                            </p>
                            <p> {item.name}</p>
                            <p className="Product_stock">{item.stock}</p>

                            <div className="actionChild">
                              {loading === true && myIndex === index + 1 ? (
                                <Loader loading={"smaillLoading"} />
                              ) : (
                                <>
                                  {" "}
                                  <EditIcon
                                    className="updateIcon getUserIcon"
                                    onClick={() => {
                                      navigate(
                                        `/admin_owner/updateproduct/${item._id}`
                                      );
                                    }}
                                  />
                                  <DeleteIcon
                                    className="deleteIcon getUserIcon"
                                    onClick={() => {
                                      setShowAlert(false);
                                      dispatch(DeleteProductAction(item._id));

                                      setMyIndex(index + 1);
                                    }}
                                  />
                                  <LaunchIcon
                                    className="LaunchIcon getUserIcon"
                                    onClick={() => {
                                      navigate(
                                        `/admin_owner/productDetails/${item._id}`
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

                {data.findAllProduct.length <= 0 && (
                  <div className="notShippingAddresh">
                    <CancelIcon className="notShippingAddreshIcon" />
                    <h2>Product Container is Empty </h2>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* </div> */}
      </div>
    </>
  );
}
