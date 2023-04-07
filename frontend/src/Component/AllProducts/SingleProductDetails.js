import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  GetSingleProductAction,
  CreateReviewAction,
  DeleteReviewAction,
} from "../../action/ProductAction";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import "./singleProductDetails.css";
import Alert from "../Alert/Alert";
import ReactDOM from "react-dom";

// requires a loader
import Carousel from "react-material-ui-carousel";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { Get_Single_Products_Details_ClearError } from "../../Constant/ProductContanst";
import { AlertAction } from "../../action/AlertAction";
import { ClearAlert } from "../../Constant/AlertContant";
import { SubmitReview_Clear } from "../../Constant/ProductContanst";
import { AddtoCartAction } from "../../action/CartItemAction";
import { CartClear } from "../../Constant/CartConstant";

export default function SingleProductDetails() {
  const parms = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errortext, seterrortext] = useState(null);
  const submitreviewform = useRef(null);
  const [showreviewContainer, setShowReviewContainer] = useState(true);
  const [imageindex, setImageIndex] = useState(0);
  const [run, setRun] = useState(true);
  const [showbutton, setShowButton] = useState(false);

  const [imagetranlate, setImageTranslate] = useState(0);
  const [increase, setIncrease] = useState(true);
  const [decrease, setDecrease] = useState(false);
  const countElement = useRef(null);
  const [counttranslate, setCountTranslate] = useState(0);
  const [countWidth, setCountWidth] = useState(0);
  const [countstart, setcountstart] = useState(true);
  const [reviewdetail, setreviewDetail] = useState({
    rating: 0,
    comment: "",
    productId: "",
  });
  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });
  const [productquantity, setProductQuantity] = useState(1);

  const { loading, data } = useSelector((state) => {
    return state.getSingleProduct;
  });
  const { userdata } = useSelector((state) => {
    return state.meDetails;
  });

  const { Reviewdata, loading: ReviewLoader } = useSelector((state) => {
    return state.submitReview;
  });

  const { cartItems, loading: CartLoader, success } = useSelector((state) => {
    return state.Cart;
  });

  let slider;
  // let loadings = true;

  useEffect(() => {
    if (data) {
      if (data.success == true) {
        // reviewdetail ,

        if (imagetranlate >= data.findproduct.images.length - 1) {
          setIncrease(false);
          setDecrease(true);
        }
        if (imagetranlate <= 0) {
          setIncrease(true);
          setDecrease(false);
        }

        if (run === true) {
          slider = setInterval(() => {
            if (data.findproduct.images.length > 1) {
              if (increase === true) {
                setImageTranslate(imagetranlate + 1);
              }

              if (decrease == true) {
                setImageTranslate(imagetranlate - 1);
              }
            }
          }, 2000);

        }
        return () => {
          clearInterval(slider);
        };
      }
    }
  }, [data, imagetranlate, increase, decrease, run, slider]);

  useEffect(() => {
  }, [run]);

  if (showreviewContainer == false) {
    document.addEventListener("click", (e) => {
      if (submitreviewform.current) {
        let hideelement = submitreviewform.current.contains(e.target);
        let alertContainer = document.querySelector(".alert-container");

        if (alertContainer) {
          hideelement = alertContainer.contains(e.target);
        }

        if (hideelement === false) {
          setShowReviewContainer(true);
          setreviewDetail({ rating: 0, comment: "", productId: "" });
        }
      }
    });
  }

  if (showreviewContainer === true) {
    document.body.style.background = "none";
  }
  if (showreviewContainer == false) {
    document.body.style.backgroundColor = "rgb(0 0 0 / 57%)";
  }

  // let CartLoaders = true;
  useEffect(() => {
    if (data) {
      if (data.success === false) {
        setShowAlert(true);

        setAlertDetails({ AlertType: "Error", AlertMessage: `${data.error}` });
        dispatch({ type: Get_Single_Products_Details_ClearError });
        seterrortext(data.error);
        // navigate("/");
      }
      if (data.success === true) {
        let AlertType = document.getElementById("AlertType");

        if (AlertType) {
          if (AlertType.innerText.includes("Error")) {
            setShowAlert(false);
          }
        }

        seterrortext(null);
      }
    }
  }, [data]);

  useEffect(() => {
    dispatch(GetSingleProductAction(parms.productId));
  }, []);

  useEffect(() => {
    if (Reviewdata) {
      if (Reviewdata.success === false) {
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Error",
          AlertMessage: `${Reviewdata.error}`,
        });
        dispatch({ type: SubmitReview_Clear });
      }

      if (Reviewdata.success === true) {
        setShowAlert(true);

        setAlertDetails({
          AlertType: "Success",
          AlertMessage: `${Reviewdata.message}`,
        });
        dispatch({ type: SubmitReview_Clear });
        dispatch(GetSingleProductAction(parms.productId));
        setShowReviewContainer(true);
        setreviewDetail({ rating: 0, comment: "", productId: "" });
      }
    }
  }, [dispatch, ReviewLoader, Reviewdata]);

  //    Use Effect Add to Item Cart

  useEffect(() => {
    if (success == true) {
      setShowAlert(true);
      setAlertDetails({
        AlertType: "Success",
        AlertMessage: ` This Product Is Added To Cart`,
      });
      setTimeout(() => {
        navigate("/CartItem");
      }, 100);
      dispatch({ type: CartClear });
    }
    if (success == false) {
      setShowAlert(true);
      setAlertDetails({
        AlertType: "Error",
        AlertMessage: `This Product Is  Not Add To Cart`,
      });

      dispatch({ type: CartClear });
    }
  }, [cartItems, success, CartLoader, dispatch]);

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

  const SubmitReviewFormFunction = (e) => {
    e.preventDefault();

    if (reviewdetail.comment.length >= 4) {
      dispatch(CreateReviewAction(reviewdetail));
      setShowAlert(false);
    } else {
      setShowAlert(true);
      setAlertDetails({
        AlertType: "Error",
        AlertMessage:
          "Comment must be of 4 characters or more than 4 characters",
      });
    }
  };

  return (
    <>
      <Helmet title="MY Store --- Single Product Detail" />{" "}
      {loading === true ? (
        <Loader loading={"SingleProductDetailLoading"} />
      ) : (
        <>
          {data && data.success === true && (
            <>
              {location.pathname.includes("admin_owner") == true && (
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="goBack"
                >
                  Go Back
                </button>
              )}

              <h1 className="singleproductheading">Single Product Details</h1>
              <div className="content_container">
                <div className="singleProductContainer">
                  <div
                    className="singleProductImage"
                    onMouseEnter={() => {
                      clearInterval(slider);
                      setRun(false);
                      setcountstart(false);
                    }}
                    onMouseLeave={() => {
                      setcountstart(true);
                      setRun(true);
                    }}
                  >
                    <div
                      className="imageSlide"
                      onMouseEnter={() => {
                        setShowButton(true);
                      }}
                      onMouseLeave={() => {
                        setShowButton(false);
                      }}
                    >
                      {data.findproduct.images.map((item, index) => {
                        return (
                          <img
                            key={index}
                            src={item.url}
                            style={{
                              transform: `translateX(-${imagetranlate}00%)`,
                            }}
                            alt="ImageUrl"
                            className={`slider slider${index}`}
                          />
                        );
                      })}

                      {showbutton == true &&
                        imagetranlate < data.findproduct.images.length - 1 && (
                          <button
                            className="nextbutton"
                            onClick={() => {
                              if (
                                imagetranlate <=
                                data.findproduct.images.length - 2
                              ) {
                                setImageTranslate(imagetranlate + 1);
                              }
                            }}
                          >
                            {" "}
                            <p></p>{" "}
                          </button>
                        )}

                      {showbutton == true && imagetranlate > 0 && (
                        <button
                          className="previousbutton"
                          onClick={() => {
                            if (imagetranlate > 0) {
                              setImageTranslate(imagetranlate - 1);
                            }
                          }}
                        >
                          {" "}
                          <p></p>{" "}
                        </button>
                      )}
                    </div>

                    {
                      <div className="dotbox">
                        <span>{imagetranlate + 1}</span> /
                        <span>{data.findproduct.images.length}</span>
                      </div>
                    }
                  </div>

                  <div className="singleProductDetails">
                    <div className="productname_id">
                      <p>
                        {" "}
                        <span>Name :-</span>{" "}
                        <span>{data.findproduct.name}</span>{" "}
                      </p>
                      <p>
                        <span>Category :-</span>
                        <span>{data.findproduct.category}</span>
                      </p>
                      <small>
                        <span> Product # </span>
                        <span>{data.findproduct._id}</span>
                      </small>
                    </div>
                    <div className="productReviews">
                      <Rating
                        className="singleProductRating"
                        //
                        value={data.findproduct.allratingsAvg}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                      />
                      <span className="NumofReviews">
                        {`( ${data.findproduct.numOfReviews} )  Reviews`}
                      </span>
                    </div>
                    <div className="productPrice">
                      ₹ {data.findproduct.price} Price
                    </div>
                    {data.findproduct.stock > 0 &&
                      location.pathname.includes("admin_owner") == false && (
                        <div className="productAddtoCart">
                          <button
                            onClick={() => {
                              if (productquantity === 1) {
                                setProductQuantity(productquantity);
                              } else {
                                setProductQuantity(productquantity - 1);
                              }
                            }}
                          >
                            -
                          </button>
                          <p>{productquantity}</p>
                          <button
                            onClick={() => {
                              if (data.findproduct.stock === productquantity) {
                                setProductQuantity(productquantity);
                              } else {
                                setProductQuantity(productquantity + 1);
                              }
                            }}
                          >
                            +
                          </button>

                          {CartLoader == true ? (
                            <Loader loading={"cartLoader"} />
                          ) : (
                            <button
                              className="addtocart productdetailbutton"
                              onClick={() => {
                                setShowAlert(false);
                                if (userdata) {
                                  if (userdata.IsAuthenticated === true) {
                                    dispatch(
                                      AddtoCartAction(
                                        data.findproduct._id,
                                        productquantity
                                      )
                                    );
                                  } else {
                                    setTimeout(() => {
                                      setShowAlert(true);
                                    }, 0);
                                    setAlertDetails({
                                      AlertType: "Error",
                                      AlertMessage:
                                        "Please Login To Access This Resorce ",
                                    });
                                  }
                                }
                              }}
                            >
                              {" "}
                              Add to CArt
                            </button>
                          )}
                        </div>
                      )}
                    <div className="productStatus">
                      Status :
                      <span
                        style={{
                          color: data.findproduct.stock > 0 ? "green" : "red",
                        }}
                      >
                        {" "}
                        {data.findproduct.stock > 0 ? "InStock" : "OutStock"}
                      </span>
                    </div>
                    <div className="productdescription">
                      <p>Description</p>
                      <small>{data.findproduct.description}</small>
                    </div>
                    {userdata &&
                      userdata.IsAuthenticated === true &&
                      location.pathname.includes("admin_owner") == false && (
                        <div className="submitreviewbox" ref={submitreviewform}>
                          <button
                            className="submitreview productdetailbutton"
                            onClick={() => {
                              setShowReviewContainer(false);
                              setShowAlert(false);
                            }}
                          >
                            SubmitReview
                          </button>

                          <div
                            className="submitreviewMain"
                            style={{
                              transform:
                                showreviewContainer === true
                                  ? "translateX(150%)"
                                  : "translateX(0%)",
                              opacity: showreviewContainer === true ? 0 : 1,
                            }}
                          >
                            <form
                              onSubmit={SubmitReviewFormFunction}
                              className="submitreviewForm"
                            >
                              <p className="reviewheading">Submit Review</p>
                              <p className="reviewContainer">
                                <Rating
                                  value={Number(reviewdetail.rating)}
                                  className="setReviewRating"
                                  // data.findproduct.allratingsAvg
                                  onChange={(e) => {
                                    setreviewDetail({
                                      ...reviewdetail,
                                      rating: e.target.value,
                                    });
                                  }}
                                  precision={0.5}
                                />
                              </p>

                              <textarea
                                minLength="10"
                                value={reviewdetail.comment}
                                onChange={(e) => {
                                  setreviewDetail({
                                    ...reviewdetail,
                                    comment: e.target.value,
                                    productId: data.findproduct._id,
                                  });
                                }}
                                required
                              ></textarea>

                              <div className="submitreviewbuttonbox">
                                <button>Submit</button>
                              </div>
                            </form>

                            <button
                              className="cancelbutton"
                              onClick={() => {
                                setShowReviewContainer(true);

                                setreviewDetail({
                                  rating: 0,
                                  comment: "",
                                  productId: "",
                                });
                                setShowAlert(false);
                              }}
                            >
                              Cancle
                            </button>
                          </div>
                        </div>
                      )}{" "}
                  </div>
                </div>

                {data.findproduct.createreviews.length > 0 && (
                  <div className="showreview-container">
                    <h1>Review Container </h1>

                    <div className="showAllreview_container">
                      {data.findproduct.createreviews.map((item, index) => {
                        return (
                          <div className="reviewbox" key={index}>
                            {location.pathname.includes("admin_owner") ==
                              true && (
                              <DeleteIcon
                                className="reviewbox_deleteButton"
                                onClick={() => {
                                  dispatch(
                                    DeleteReviewAction(
                                      parms.productId,
                                      item._id
                                    )
                                  );
                                }}
                              />
                            )}

                            <p className="userId">
                              userId :- <span>{item.createreviewuser}</span>
                            </p>
                            <p className="review-box_userName">
                              {item.createreviewname}
                            </p>
                            <p className="reviewbox_rating">
                              <Rating
                                className="singleProductRating"
                                //
                                value={item.rating}
                                readOnly
                                precision={0.5}
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    className="EmptyIcon"
                                  />
                                }
                              />
                            </p>

                            <p className="comment"> {item.comment} </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {errortext && (
            <>
              <div className="IderrorBox">
                <h1>{errortext}</h1>

                <button
                  onClick={() => {
                    setShowAlert(false);
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
