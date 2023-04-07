import { AddtoCart } from "../Constant/CartConstant";

import {
  All_Products_Request,
  All_Products_Success,
  All_Products_Fail,
  All_Products_ClearError,
  Sample_Products_Request,
  Sample_Products_Success,
  Sample_Products_Fail,
  Sample_Products_ClearError,
  Get_HighestAndLowestPrice_Products_Success,
  Get_HighestAndLowestPrice_Products_Fail,
  All_Products_Name_Success,
  All_Products_Name_Fail,
  All_Products_Name_ClearError,
  All_Products_Name_Request,
  Get_Single_Products_Details_Request,
  Get_Single_Products_Details_Success,
  Get_Single_Products_Details_Fail,
  Get_Single_Products_Details_ClearError,
  SubmitReview_Request,
  SubmitReview_Success,
  SubmitReview_Fail,
  SubmitReview_Clear,
  CreateProduct_Request,
  CreateProduct_Success,
  CreateProduct_Fail,
  CrtProduct_Clert,
  DeleteProduct_Request,
  DeleteProduct_Success,
  DeleteProduct_Fail,
  DeleteProduct_Clear,
  UpdateProduct_Request,
  UpdateProduct_Success,
  UpdateProduct_Fail,
  Delete_Review_Request,
  Delete_Review_Success,
  Delete_Review_Fail,
  Delete_Review_Clear,
} from "../Constant/ProductContanst";

// Get Sample Products
export const GetSampleProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case Sample_Products_Request:
      return {
        ...state,
        loading: true,
      };
    case Sample_Products_Success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case Sample_Products_Fail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Sample_Products_ClearError:
      return {};
    default:
      return {
        ...state,
      };
  }
};

//  Get All Products
export const GetAllProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case All_Products_Request:
      return {
        ...state,
        loading: true,
      };

    case Get_HighestAndLowestPrice_Products_Success:
      return {
        ...state,

        priceproduct: action.payload,
      };

    case All_Products_Success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case Get_HighestAndLowestPrice_Products_Fail:
      return {
        ...state,

        priceproduct: action.payload,
      };

    case All_Products_Fail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case All_Products_ClearError:
      return {
        // priceproduct: null
      };

    default:
      return {
        ...state,
      };
  }
};

//  Get All Product Name

export const GetAllProductsNameReducer = (state = {}, action) => {
  switch (action.type) {
    case All_Products_Name_Request: {
      return {
        loading: true,
      };
    }
    case All_Products_Name_Success:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case All_Products_Name_Fail:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case All_Products_Name_ClearError:
      return {};

    default:
      return {
        ...state,
      };
  }
};
//  Get Single Product Reducer

export const GetSingleProducReducer = (state = {}, action) => {
  switch (action.type) {
    case Get_Single_Products_Details_Request:
      return {
        ...state,
        loading: true,
      };
    case Get_Single_Products_Details_Success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case Get_Single_Products_Details_Fail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Get_Single_Products_Details_ClearError:
      return {};
    default:
      return {
        ...state,
      };
  }
};

//  Submit Product Review

export const SubmitReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SubmitReview_Request:
    case Delete_Review_Request:
      return {
        ...state,
        loading: true,
      };

    case SubmitReview_Success:
    case Delete_Review_Success:
      return {
        ...state,
        loading: false,
        Reviewdata: action.payload,
      };

    case SubmitReview_Fail:
    case Delete_Review_Success:
      return {
        ...state,
        loading: false,
        Reviewdata: action.payload,
      };

    case SubmitReview_Clear:
    case Delete_Review_Clear:
      return {};

    default:
      return {
        ...state,
      };
  }
};

// Admin Owner Reducer

export const CreateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CreateProduct_Request:
    case DeleteProduct_Request:
    case UpdateProduct_Request:
      return {
        ...state,
        loading: true,
      };

    case CreateProduct_Success:
    case DeleteProduct_Success:
    case UpdateProduct_Success:
      return {
        ...state,
        loading: false,
        productdata: action.payload,
      };

    case CreateProduct_Fail:
    case DeleteProduct_Fail:
    case UpdateProduct_Fail:
      return {
        ...state,
        loading: false,
        productdata: action.payload,
      };

    case CrtProduct_Clert:
    case DeleteProduct_Clear:
      return {};

    default:
      return {
        ...state,
      };
  }
};

