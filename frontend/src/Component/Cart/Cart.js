import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { AlertAction } from "../../action/AlertAction";
import { ClearAlert } from "../../Constant/AlertContant";
import { CartClear } from "../../Constant/CartConstant";
import { RemoveCartAction } from "../../action/CartItemAction";
import { AddtoCartAction } from "../../action/CartItemAction";
import { useNavigate } from "react-router-dom";
import Helmet from "../Helmet";

export default function Cart() {
  const HeadingContainer = useRef();
  const [productquantity, setProductQuantity] = useState(1);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, RemoveCart, success } = useSelector((state) => {
    return state.Cart;
  });
  const [showAlert, setShowAlert] = useState(null);
  useEffect(() => {
    if (RemoveCart == true) {
      setShowAlert(true);
      setAlertDetails({
        AlertType: "Success",
        AlertMessage: "Product Is Remove To Cart ",
      });

      dispatch({ type: CartClear });
    }
    if (success === true) {
      dispatch({ type: CartClear });
    }
  }, [cartItems, RemoveCart, success]);

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

  let subtotal = cartItems.map((acc) => {
    return acc.Quantity * acc.price;
  });

  if (subtotal.length > 0) {
    subtotal = subtotal.reduce((acc, item) => {
      return acc + item;
    });
  }
  // }

  return (
    <>
      <Helmet title="MY Store --- CartItems" />
      {cartItems.length > 0 ? (
        <div className="tabel">
          <div className="tabelHead_Container ">
            <div className="tabelHead tabelflex">
              <p className="productHeading">Product</p>
              <p className="Quantity"> Quantity</p>
              <p className="subTotalHeading">SubTotal</p>
            </div>
          </div>

          {cartItems &&
            cartItems.map((item, index) => {
              return (
                <div key={index} className="tabelflex">
                  <div className="imgeAndProductDetails">
                    <Link to={`/productDetails/${item.productId}`}>
                      <img src={item.image} alt="ProductImage" />
                    </Link>

                    <div className="cartProductDetails">
                      <p className="cartItemProductId">
                        {" "}
                        <Link
                          className="underline_none"
                          to={`/productDetails/${item.productId}`}
                        >
                          {" "}
                          <span className="flex">ProductId :-</span>{" "}
                          <span>{item.productId}</span>
                        </Link>{" "}
                      </p>
                      <p className="cartproductDetailsitemname">{item.name}</p>
                      <p className="cartproductDetailsitemprice"> ₹ {item.price}</p>
                      <p
                        className="removeCart"
                        onClick={() => {
                          setShowAlert(false);
                          dispatch(RemoveCartAction(item.productId));
                        }}
                      >
                        Remove
                      </p>
                    </div>
                  </div>
                  <div className="Quantity">
                    <div className="cartItemButton">
                      <button
                        onClick={() => {
                          if (item.Quantity > 1) {
                            let newQuantity = item.Quantity - 1;
                            dispatch(
                              AddtoCartAction(item.productId, newQuantity)
                            );
                          }
                        }}
                      >
                        -
                      </button>
                      <p>{item.Quantity}</p>
                      <button
                        onClick={() => {
                          if (item.Quantity < item.stock) {
                            let newQuantity = item.Quantity + 1;
                            dispatch(
                              AddtoCartAction(item.productId, newQuantity)
                            );
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="pricesubtotal">
                    {" "}
                    ₹ {item.price * item.Quantity}{" "}
                  </div>
                </div>
              );
            })}

          <div className="tabelflex maintotal">
            <div></div>
            <div></div>
            <div className="GroseTotalContainer">
              <div className="GroseTotal">
                <p>Grose Total</p>
                <p>₹ {subtotal} </p>
              </div>
              <button
                className="cartItemcheckoutButton"
                onClick={() => {
                  navigate("/shipping");
                }}
              >
                {" "}
                Checkout{" "}
              </button>
            </div>
          </div>
        </div>
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
