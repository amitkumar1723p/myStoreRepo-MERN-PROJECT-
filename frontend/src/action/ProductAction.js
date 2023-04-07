import axios from "axios";
import {
  //  Get Product Details
  All_Products_Request,
  All_Products_Success,
  All_Products_Fail,
  Sample_Products_Request,
  Sample_Products_Success,
  Sample_Products_Fail,
  Get_HighestAndLowestPrice_Products_Success,
  Get_HighestAndLowestPrice_Products_Fail,
  All_Products_Name_Request,
  All_Products_Name_Success,
  All_Products_Name_Fail,
  Get_Single_Products_Details_Request,
  Get_Single_Products_Details_Success,
  Get_Single_Products_Details_Fail,
  SubmitReview_Request,
  SubmitReview_Success,
  SubmitReview_Fail,
  CreateProduct_Success,
  CreateProduct_Request,
  CreateProduct_Fail,
  DeleteProduct_Request,
  DeleteProduct_Success,
  DeleteProduct_Fail,
  UpdateProduct_Request,
  UpdateProduct_Success,
  UpdateProduct_Fail,
  Delete_Review_Request,
  Delete_Review_Success,
  Delete_Review_Fail,
  Delete_Review_Clear,
} from "../Constant/ProductContanst";
// const backendport = "http://localhost:5000"
const backendport = process.env.REACT_APP_BackendPort;

//  Get Prodcuts Action

export const GetSampleProductsAction = ({ Categories, NumOfProducts }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: Sample_Products_Request });
      const { data } = await axios.get(
        `${backendport}/user/getsampleProducts?NumOfProducts=${NumOfProducts}&Categories=${Categories}`,
        {
          withCredentials: true,
        }
      );

      dispatch({ type: Sample_Products_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: Sample_Products_Fail, payload: error.response.data });
      } else {
        dispatch({
          type: Sample_Products_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

// Get All PRoducts
export const GetAllProducts = (querry) => {
  return async (dispatch) => {
    try {
      dispatch({ type: All_Products_Request });

      if (querry.price && querry.keyword) {
        querry.price = undefined;
      }
      if (querry.rating && querry.keyword) {
        querry.rating = 0;
      }

      if (querry.category && querry.keyword) {
        querry.category = null;
      }

      if (querry.price) {
        const { data } = await axios.get(
          `${backendport}/user/getallproduct?pagenumber=${querry.pageNo}&perpageresult=${querry.numofproduct}&price[$lte]=${querry.price[1]}&price[$gte]=${querry.price[0]}&keyword=${querry.keyword}`,
          {
            withCredentials: true,
          }
        );
        dispatch({ type: All_Products_Success, payload: data });
      } else {
        if (querry.category) {
          const { data } = await axios.get(
            `${backendport}/user/getallproduct?pagenumber=${querry.pageNo}&perpageresult=${querry.numofproduct}&allratingsAvg[$gte]=${querry.rating}&category=${querry.category}&keyword=${querry.keyword}`,
            {
              withCredentials: true,
            }
          );
          dispatch({ type: All_Products_Success, payload: data });
        } else {
          const { data } = await axios.get(
            `${backendport}/user/getallproduct?pagenumber=${querry.pageNo}&perpageresult=${querry.numofproduct}&allratingsAvg[$gte]=${querry.rating}&keyword=${querry.keyword}`,
            {
              withCredentials: true,
            }
          );
          dispatch({ type: All_Products_Success, payload: data });
        }
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: All_Products_Fail, payload: error.response.data });
      } else {
        dispatch({
          type: All_Products_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Get Highest and Lowest Price Product

export const GetHighestAndLowestPriceProduct = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.get(
        `${backendport}/user/highest-lowestprice/product`,
        config
      );

      dispatch({
        type: Get_HighestAndLowestPrice_Products_Success,
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: Get_HighestAndLowestPrice_Products_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: Get_HighestAndLowestPrice_Products_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Get Product Name

export const GetAllProductsName = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: All_Products_Name_Request });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.get(
        `${backendport}/user/getallProductname`,
        config
      );

      dispatch({ type: All_Products_Name_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: All_Products_Name_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: All_Products_Name_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

// Get Single Product  By Product Id

export const GetSingleProductAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: Get_Single_Products_Details_Request });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.get(
        `${backendport}/user/singleproduct/${id}`,
        config
      );

      dispatch({ type: Get_Single_Products_Details_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: Get_Single_Products_Details_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: Get_Single_Products_Details_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Submit Review

export const CreateReviewAction = (reviewdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SubmitReview_Request });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/createreviews/product`,
        reviewdata,
        config
      );
      // const { data } = await axios.post(`${backendport}/user/login`, userdata, config)

      dispatch({ type: SubmitReview_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: SubmitReview_Fail, payload: error.response.data });
      } else {
        dispatch({
          type: SubmitReview_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  CreateProduct

export const CreateproductAction = (productdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CreateProduct_Request });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/admin/owner/createproducts`,
        productdata,
        config
      );
      // const { data } = await axios.post(`${backendport}/user/login`, userdata, config)

      dispatch({ type: CreateProduct_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: CreateProduct_Fail, payload: error.response.data });
      } else {
        dispatch({
          type: CreateProduct_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

export const DeleteProductAction = (ProductId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DeleteProduct_Request });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.delete(
        `${backendport}/admin/owner/deleteproduct/${ProductId}`,
        config
      );

      dispatch({ type: DeleteProduct_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: DeleteProduct_Fail, payload: error.response.data });
      } else {
        dispatch({
          type: DeleteProduct_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Update Product

export const UpdateProductAction = (productdata, productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UpdateProduct_Request });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${backendport}/admin/owner/updateproduct/${productId}`,
        productdata,
        config
      );
      // const { data } = await axios.post(`${backendport}/user/login`, userdata, config)

      dispatch({ type: UpdateProduct_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: UpdateProduct_Fail, payload: error.response.data });
      } else {
        dispatch({
          type: UpdateProduct_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Delete Review

export const DeleteReviewAction = (productId, ReviewId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: Delete_Review_Request });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.delete(
        `${backendport}/admin/owner/deletereviews/?ProductId=${productId}&ReviewId=${ReviewId}`,
        config
      );

      dispatch({ type: Delete_Review_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: Delete_Review_Fail, payload: error.response.data });
      } else {
        dispatch({
          type: Delete_Review_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};
