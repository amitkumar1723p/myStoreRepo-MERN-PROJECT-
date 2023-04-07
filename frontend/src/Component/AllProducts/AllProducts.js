import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllProduct.css";
import {
  GetAllProducts,
  GetHighestAndLowestPriceProduct,
} from "../../action/ProductAction";
import Helmet from "../Helmet";
import Loader from "../Loader/loader";
import AllProductItem from "./AllProductItem";
import Slider from "@mui/material/Slider";
import Alert from "../Alert/Alert";
import { useSearchParams } from "react-router-dom";
import { All_Products_ClearError } from "../../Constant/ProductContanst";
import { AlertAction } from "../../action/AlertAction";
import { ClearAlert } from "../../Constant/AlertContant";

export default function AllProducts() {
  const dispatch = useDispatch();
  const hamburger = useRef();
  const asideElement = useRef();
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

  const { loading, data, priceproduct } = useSelector((state) => {
    return state.getAllProducts;
  });

  const [querry, setquerry] = useSearchParams();

  let querrrkeyword = querry.get("keyword");

  if (querrrkeyword === null) {
    querrrkeyword = "";
  }

  const [slidervalue, setSlidervalue] = useState([0, 0]);
  const [slideprice, setSlideprice] = useState(null);
  const [PriceAlert, setPriceAlert] = useState(false);
  const [pricesort, setPricesort] = useState(false);

  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const numofproduct = 8;
  const [count, setCount] = useState(1);

  const incrementCount = () => {
    if (data) {
      let totalpage = Math.ceil(data.totalProduct / numofproduct);

      if (totalpage === count) {
        setCount(totalpage);
      } else {
        setCount(count + 1);
      }
    }
  };

  const decrementCount = () => {
    // eslint-disable-next-line
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if (slideprice === null) {
      dispatch(GetHighestAndLowestPriceProduct());
    }
    if (priceproduct) {
      if (priceproduct.success === true) {
        setSlideprice([
          priceproduct.LowestPriceProduct,
          priceproduct.HighestPriceProduct,
        ]);
      }
      if (priceproduct.success === false) {
        setSlideprice([0, 0]);
      }
    }

    // eslint-disable-next-line
  }, [priceproduct]);

  useEffect(() => {
    dispatch({ type: ClearAlert });
    setCount(1);

    if (querrrkeyword && slideprice) {
      setSlideprice([
        priceproduct && priceproduct.success === true
          ? priceproduct.LowestPriceProduct
          : 0,
        priceproduct && priceproduct.success === true
          ? priceproduct.HighestPriceProduct
          : 0,
      ]);
    }

    if (querrrkeyword && slideprice) {
      setRating(0);
    }

    if (pricesort === true) {
      dispatch(
        GetAllProducts({
          rating,
          numofproduct,
          pageNo: count,
          price: slidervalue,
          keyword: querrrkeyword,
        })
      );
    } else {
      dispatch(
        GetAllProducts({
          category,
          rating,
          numofproduct,
          pageNo: count,
          keyword: querrrkeyword,
        })
      );
    }

    // eslint-disable-next-line
  }, [dispatch, category, rating, numofproduct, querrrkeyword, slidervalue]);

  useEffect(() => {
    dispatch({ type: ClearAlert });
    if (pricesort === true) {
      dispatch(
        GetAllProducts({
          rating,
          numofproduct,
          pageNo: count,
          price: slidervalue,
          keyword: querrrkeyword,
        })
      );
    } else {
      dispatch(
        GetAllProducts({
          category,
          rating,
          numofproduct,
          pageNo: count,
          keyword: querrrkeyword,
        })
      );
    }

    // eslint-disable-next-line
  }, [count]);

  useEffect(() => {
    if (data) {
      if (data.success === false) {
        dispatch(AlertAction("Error", data.error, null));
        dispatch({ type: All_Products_ClearError });
      } else {
        dispatch({ type: ClearAlert });
      }
    }
  }, [data, priceproduct]);

  let loadings = true;

  return (
    <>
      <Helmet title="MY Store --- All Products" />

      <div className="maincontainer">
        <div className="asideParent">
          <div
            className="hamburger"
            ref={hamburger}
            onClick={(e) => {
              if (hamburger) {
                hamburger.current.classList.toggle("hamburger2");

                hamburger.current.firstElementChild.classList.toggle(
                  "hamburgerFirstP"
                );

                hamburger.current.lastElementChild.classList.toggle(
                  "displaynone"
                );

                asideElement.current.classList.toggle("asidemove");
              }
            }}
          >
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div ref={asideElement} className="aside asidemove">
            <fieldset>
              <legend> Price </legend>
              <Slider
                aria-labelledby="range-slider"
                value={slideprice}
                max={
                  priceproduct && priceproduct.success === true
                    ? priceproduct.HighestPriceProduct
                    : 0
                }
                min={
                  priceproduct && priceproduct.success === true
                    ? priceproduct.LowestPriceProduct
                    : 0
                }
                valueLabelDisplay="auto"
                onChange={(e, newvalue) => {
                  setPricesort(true);
                  setRating(0);
                  setquerry({ keyword: "" });
                  setSlideprice(e.target.value);
                  setSlidervalue(e.target.value);
                }}
              />
            </fieldset>

            <p
              className="mixallproduct"
              onClick={() => {
                setquerry({ keyword: "" });

                setCount(1);
                setPricesort(false);
                setCategory(null);
                setRating(0);
                setPricesort(false);
                setSlideprice([
                  priceproduct && priceproduct.success === true
                    ? priceproduct.LowestPriceProduct
                    : 0,
                  priceproduct && priceproduct.success === true
                    ? priceproduct.HighestPriceProduct
                    : 0,
                ]);

                dispatch(
                  GetAllProducts({
                    category,
                    rating,
                    numofproduct,
                    pageNo: count,
                    keyword: querrrkeyword,
                  })
                );
              }}
            >
              {" "}
              All Products
            </p>
            <p>Categories</p>

            <ul>
              {categories &&
                categories.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={(e) => {
                        setRating(0);
                        setquerry({ keyword: "" });
                        setPricesort(false);
                        setCategory(e.target.innerText);
                        setSlideprice([
                          priceproduct && priceproduct.success === true
                            ? priceproduct.LowestPriceProduct
                            : 0,
                          priceproduct && priceproduct.success === true
                            ? priceproduct.HighestPriceProduct
                            : 0,
                        ]);
                      }}
                    >
                      {" "}
                      {item}
                    </li>
                  );
                })}
            </ul>
            <p></p>

            <fieldset>
              <legend>Rating</legend>
              <Slider
                defaultValue={0}
                valueLabelDisplay="auto"
                value={rating}
                step={1}
                marks
                min={0}
                max={5}
                onChange={(e) => {
                  setquerry({ keyword: "" });
                  setPricesort(false);
                  setCategory(null);
                  setSlideprice([
                    priceproduct && priceproduct.success === true
                      ? priceproduct.LowestPriceProduct
                      : 0,
                    priceproduct && priceproduct.success === true
                      ? priceproduct.HighestPriceProduct
                      : 0,
                  ]);
                  setRating(e.target.value);
                }}
              />
            </fieldset>
          </div>
        </div>

        <div className="allproductcontainer">
          {loading === true ? (
            <Loader loading={"allproductloading"} />
          ) : (
            data &&
            data.success === true && (
              <>
                <h1 className="allproductheading"> All Products </h1>
                <div className="poductContainer">
                  {data.findproduct.length == 0 && (
                    <h1 className="nullProductHeading">
                      Product is not Avlabile
                    </h1>
                  )}

                  {data.findproduct.map((item, index) => {
                    return <AllProductItem item={item} key={index} />;
                  })}
                </div>

                {data.findproduct.length > 0 && (
                  <div className="paginationbox">
                    {count === 1 ? (
                      ""
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setCount(1);
                          }}
                        >
                          1st
                        </button>
                        <button onClick={decrementCount}>Pre</button>
                      </>
                    )}

                    <p className="currentpage">{count}</p>

                    {Math.ceil(data.totalProduct / numofproduct) === count ? (
                      ""
                    ) : (
                      <>
                        <button onClick={incrementCount}>next</button>
                        <button
                          onClick={() => {
                            let totalpage = Math.ceil(
                              data.totalProduct / numofproduct
                            );
                            setCount(totalpage);
                          }}
                        >
                          last
                        </button>
                      </>
                    )}
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
