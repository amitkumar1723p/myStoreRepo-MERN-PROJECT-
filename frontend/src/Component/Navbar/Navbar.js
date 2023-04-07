import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { GetAllProductsName } from "../../action/ProductAction";
import { All_Products_Name_ClearError } from "../../Constant/ProductContanst";
import "./Navbar.css";
export default function Navbar() {
  const dispatch = useDispatch();
  const [keyword, setKyword] = useState("");

  const [productName, setProductName] = useState([]);

  const [productnamecontainer, setProductNameContainer] = useState([]);
  const [showlist, setshowlist] = useState(false);

  const dropdownlist = useRef(null);
  const { data } = useSelector((state) => {
    return state.getAllProductsName;
  });

  useEffect(() => {
    // if (productName === null) {

    // if (productName.length == 0) {

    if (data) {
      if (data.success === true) {
        const returnproductname = data.findAllProduct.map((item) => {
          return item.name;
        });

        setProductName([...new Set(returnproductname)]);
        setProductNameContainer([...new Set(returnproductname)]);
      }
      if (data.success == false) {
        setProductName([]);
        setProductNameContainer([]);
        //  dispatch({type:All_Products_Name_ClearError})
      }
    }
  }, [data]);

  if (showlist == true) {
    document.addEventListener("click", (e) => {
      if (dropdownlist.current !== null) {
        let hideelement = dropdownlist.current.contains(e.target);

        let alertContainer = document.querySelector(".alert-container");
        if (alertContainer) {
          hideelement = alertContainer.contains(e.target);
        }

        if (hideelement === false) {
          setshowlist(false);
        }
      }
    });
  }

  return (
    <>
      <header>
        <nav className="flex aling-center navbar">
          <ul className="flex aling-center">
            <NavLink className="underline_none" to="/">
              <li className="li_style_none">Home</li>
            </NavLink>
            <NavLink className="underline_none" to="/Products">
              <li className="li_style_none">Products</li>
            </NavLink>
          </ul>
          <div className="searchbox">
            <div className="searchoption">
              <input
                type="search"
                name="search"
                placeholder="Search Product Name"
                autoComplete="off"
                value={keyword}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setshowlist(true);
                    if (productnamecontainer) {
                      // eslint-disable-next-line
                      const searhfilter = productnamecontainer.filter(
                        (element) => {
                          if (
                            element
                              .toUpperCase()
                              .indexOf(e.target.value.toUpperCase()) > -1
                          ) {
                            return element;
                          }
                        }
                      );

                      if (searhfilter.length === 0) {
                        setProductName(productnamecontainer);
                      } else {
                        setProductName(searhfilter);
                      }
                    }
                  }
                  // eslint-disable-next-line
                  if (e.target.value == "") {
                    setshowlist(false);
                  }

                  setKyword(e.target.value);
                }}
              />{" "}
              {showlist === true && productName.length > 0 && (
                <div className="productnamelist" ref={dropdownlist}>
                  {productName.map((item, index) => {
                    return (
                      <p
                        key={index}
                        onClick={(e) => {
                          setKyword(e.target.innerText);
                          setshowlist(false);
                        }}
                      >
                        {item}{" "}
                      </p>
                    );
                  })}{" "}
                </div>
              )}{" "}
            </div>
            {keyword && (
              <Link
                to={`/products?keyword=${keyword}`}
                onClick={() => {
                  setKyword("");
                }}
              >
                <button>Search</button>
              </Link>
            )}{" "}
          </div>
        </nav>
      </header>
    </>
  );
}
