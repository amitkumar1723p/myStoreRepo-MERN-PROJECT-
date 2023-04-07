import React, { useState, useEffect } from "react";
import DashboardNav from "./DashboardNav";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./CreateProduct.css";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { ClearAlert } from "../../Constant/AlertContant";
import { AlertAction } from "../../action/AlertAction";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateproductAction,
  UpdateProductAction,
  GetAllProductsName,
  GetSingleProductAction,
} from "../../action/ProductAction";
import {
  CrtProduct_Clert,
  Get_Single_Products_Details_ClearError,
} from "../../Constant/ProductContanst";

export default function CreateProduct() {
  const parms = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [previewImage, setpreviewImage] = useState([]);
  const [uploadimages, setuploadimages] = useState([]);

  const [CreateProductdata, setCreateProductdata] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  const [showAlert, setShowAlert] = useState(null);
  const [alertdetails, setAlertDetails] = useState({
    AlertType: "",
    AlertMessage: "",
  });

  // ---------------------------------------------------

  const { loading, productdata } = useSelector((state) => {
    return state.crtProduct;
  });

  const { loading: singleProductLoading, data } = useSelector((state) => {
    return state.getSingleProduct;
  });

  //  updateProduct

  useEffect(() => {
    if (location.pathname.includes("updateproduct") === true) {
      if (data) {
        if (data.success === false) {
          setShowAlert(true);

          setAlertDetails({
            AlertType: "Error",
            AlertMessage: `${data.error}`,
          });
          dispatch({ type: Get_Single_Products_Details_ClearError });
        }

        if (data.success === true) {
          setCreateProductdata({
            name: data.findproduct.name,
            price: data.findproduct.price,
            description: data.findproduct.description,
            category: data.findproduct.category,
            stock: data.findproduct.stock,
          });

          setpreviewImage([]);
          data.findproduct.images.forEach((item) => {
            setpreviewImage((old) => {
              return [...old, item.url];
            });
          });
        }
      }
    } else {
      setCreateProductdata({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
      });
      setpreviewImage([]);
    }
  }, [data, location.pathname.includes("updateproduct"), productdata]);

  useEffect(() => {
    if (location.pathname.includes("updateproduct") === true) {
      dispatch(GetSingleProductAction(parms.ProductId));
    } else {
      dispatch({ type: Get_Single_Products_Details_ClearError });
    }
  }, [location.pathname.includes("updateproduct")]);

  // update Product End

  useEffect(() => {
    if (productdata) {
      if (productdata.success === false) {
        setShowAlert(true);

        setpreviewImage([]);
        setuploadimages([]);
        setAlertDetails({
          AlertType: "Error",
          AlertMessage: `${productdata.error}`,
        });
        dispatch({ type: CrtProduct_Clert });
        // setShowAlert(false)
      }
      if (productdata.success === true) {
        dispatch(GetAllProductsName());
        setShowAlert(true);
        setAlertDetails({
          AlertType: "Success",
          AlertMessage: `${productdata.message}`,
        });

        setTimeout(() => {
          navigate("/admin_owner/allproduct");
        }, 0);

        dispatch({ type: CrtProduct_Clert });
      }
    }
  }, [dispatch, loading, productdata, showAlert, CreateProductdata, navigate]);

  // Alert Use Effect
  //  Show and Close Alert
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

  useEffect(() => {
    setCreateProductdata({ ...CreateProductdata, images: uploadimages });
  }, [uploadimages, setuploadimages]);

  // -------------------------------------------------

  const CreateProductForm = (e) => {
    e.preventDefault();
    setShowAlert(false);

    if (location.pathname.includes("updateproduct") == true) {
      dispatch(UpdateProductAction(CreateProductdata, parms.ProductId));
    } else {
      dispatch(CreateproductAction(CreateProductdata));
    }
  };

  const categories = [
    "Lower",
    "Shirt",
    "T-shirt",
    "Phone",
    "Camera",
    "Earphone",
    "Books",
    "Pant",
  ];
  return (
    <>
      <Helmet title="MY Store --- CreateProduct" />
      <div className="CreateProductmain">
        <DashboardNav />
        <div className="CreateProductContent">
          {" "}
          {/* main  */}
          <div className="CreateProductContainer">
            {(singleProductLoading === true &&
              location.pathname.includes("updateproduct") === true) ||
            loading == true ? (
              <Loader loading="protectedloader" />
            ) : (
              <>
                <h2>
                  {" "}
                  {location.pathname.includes("updateproduct") == true
                    ? "Update Product"
                    : "Create Product"}
                </h2>
                <form
                  className="CreateProductform"
                  onSubmit={CreateProductForm}
                  encType="multipart/form-data"
                >
                  <div>
                    <label htmlFor="ProductName">
                      {" "}
                      <SpellcheckIcon />
                    </label>
                    <input
                      type="text"
                      id="productName"
                      placeholder="Product Name"
                      value={CreateProductdata.name}
                      required
                      onChange={(e) => {
                        setShowAlert(false);
                        setCreateProductdata({
                          ...CreateProductdata,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="ProductPrice">
                      {" "}
                      <CurrencyRupeeIcon />
                    </label>
                    <input
                      type="number"
                      id="ProductPrice"
                      placeholder="Price"
                      value={CreateProductdata.price}
                      onChange={(e) => {
                        setShowAlert(false);
                        setCreateProductdata({
                          ...CreateProductdata,
                          price: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="ProductDescription" id="descriptionlabel">
                      {" "}
                      <DescriptionIcon />
                    </label>
                    <textarea
                      placeholder="Enter Description"
                      minLength={10}
                      value={CreateProductdata.description}
                      onChange={(e) => {
                        setShowAlert(false);
                        setCreateProductdata({
                          ...CreateProductdata,
                          description: e.target.value,
                        });
                      }}
                      id="ProductDescription"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="ProductCategory">
                      {" "}
                      <AccountTreeIcon />
                    </label>
                    <select
                      id="ProductCategory"
                      value={CreateProductdata.category}
                      required
                      onChange={(e) => {
                        setShowAlert(false);

                        setCreateProductdata({
                          ...CreateProductdata,
                          category: e.target.value,
                        });
                      }}
                    >
                      <option value="" className="categoryoption">
                        Chose Category{" "}
                      </option>
                      {categories &&
                        categories.map((item, index) => {
                          return (
                            <option
                              className="categoryoption"
                              key={index}
                              value={item}
                            >
                              {item}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ProductStock">
                      {" "}
                      <FormatListNumberedIcon />
                    </label>
                    <input
                      required
                      type="number"
                      value={CreateProductdata.stock}
                      onChange={(e) => {
                        setShowAlert(false);
                        setCreateProductdata({
                          ...CreateProductdata,
                          stock: e.target.value,
                        });
                      }}
                      id="ProductStock"
                      min={
                        location.pathname.includes("updateproduct") === true
                          ? 0
                          : 1
                      }
                      placeholder="Stock"
                    />
                  </div>

                  <div>
                    <label htmlFor="">
                      {" "}
                      <AddPhotoAlternateIcon />
                    </label>
                    <input
                      type="file"
                      name=""
                      id=""
                      multiple
                      accept="image/*"
                      required={previewImage.length > 0 ? false : true}
                      onChange={(e) => {
                        setShowAlert(false);
                        const reader = new FileReader();

                        setpreviewImage([]);
                        setuploadimages([]);
                        const files = Array.from(e.target.files);

                        if (
                          files.length <= 0 &&
                          data &&
                          location.pathname.includes("updateproduct") == true
                        ) {
                          if (data.success == true) {
                            setpreviewImage([]);
                            data.findproduct.images.forEach((item) => {
                              setpreviewImage((old) => {
                                return [...old, item.url];
                              });
                            });
                          }
                        }

                        files.forEach((file) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);

                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setpreviewImage((old) => {
                                return [...old, reader.result];
                              });

                              setuploadimages((old) => {
                                return [...old, file];
                              });
                            }
                          };
                        });
                      }}
                    />
                  </div>

                  <div className="showImags">
                    <div>
                      {previewImage.map((image, index) => {
                        return (
                          <img
                            className="showpreviewImage"
                            key={index}
                            src={image}
                            alt="Product Image"
                          />
                        );
                      })}
                    </div>
                  </div>
                  <button>
                    {" "}
                    {location.pathname.includes("updateproduct") == true
                      ? "Update"
                      : "Create"}{" "}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>{" "}
        {/*main */}
      </div>
    </>
  );
}
