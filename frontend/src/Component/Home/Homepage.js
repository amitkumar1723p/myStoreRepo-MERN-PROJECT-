import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSampleProductsAction } from "../../action/ProductAction";
import "./Homepage.css";
import Loader from "../Loader/loader";
import Products from "./SampleProducts/products.js";
import Alert from "../Alert/Alert";
import { Link } from "react-scroll";
import Helmet from "../Helmet";
import { Sample_Products_ClearError } from "../../Constant/ProductContanst";

import { AlertAction } from "../../action/AlertAction";
import { ClearAlert } from "../../Constant/AlertContant";
export default function Homepage() {
  const dispatch = useDispatch();
  const Categories =
    "Lower,Shirt,T-shirt,Pant,Laptop,Phone,Camera,Earphone,Books";

  const { data, loading } = useSelector((state) => {
    return state.getProducts;
  });

  useEffect(() => {
    dispatch(GetSampleProductsAction({ Categories, NumOfProducts: 4 }));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      if (data.success == false) {
        dispatch(AlertAction("Error", data.error, null));
        dispatch({ type: Sample_Products_ClearError });
      } else {
        dispatch({ type: ClearAlert });
      }
    }
  }, [data]);

  return (
    <>
      <Helmet title="My Store --- Sample Products" />

      <div className="coverimage">
        <p className="firstp"> Welcom To MY Store</p>
        <p className="heading">Find AMAZING PRODUCTS BELOW</p>
        <Link to="sampleheading" smooth={true}>
          <button> Scroll </button>
        </Link>
      </div>

      <h1 className="sampleheading" id="sampleheading">
        {" "}
        Sample Products{" "}
      </h1>

      <div className="homepagecontainer">
        {loading == true ? (
          <Loader loading={"headingloading"} />
        ) : (
          <>
            {data && data.success && data.findproduct.length == 0 ? (
              <h1 className="notAvailableheading"> Product is Not Available</h1>
            ) : (
              <>
                {data &&
                  data.success &&
                  data.findproduct.map((productArr, index) => {
                    return <Products productArr={productArr} key={index} />;
                  })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
