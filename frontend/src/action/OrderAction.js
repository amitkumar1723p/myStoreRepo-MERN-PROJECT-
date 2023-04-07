import axios from "axios";

import {
  GetUserOrderRequest,
  GetUserOrderSuccess,
  GetUserOrderFail,
  GetUserSingleOrderRequest,
  GetUserSingleOrderSuccess,
  GetUserSingleOrderFail,
  Admin_Owner_GetAllUserOrders_Request,
  Admin_Owner_GetAllUserOrders_Success,
  Admin_Owner_GetAllUserOrders_Fail,
  Admin_Owner_UpdateProcessOrder_Request,
  Admin_Owner_UpdateProcessOrder_Success,
  Admin_Owner_UpdateProcessOrder_Fail,
  Admin_Owner_UpdateProcessOrder_Clear,
  Admin_Owner_DeleteOrder_Request,
  Admin_Owner_DeleteOrder_Success,
  Admin_Owner_DeleteOrder_Fail,
  Admin_Owner_DeleteOrder_Clear,
} from "../Constant/OrderConstant";

//  Get All Order By User
export const GetAllOrderUserAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GetUserOrderRequest });
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.get(`/user/meallorders`, config);
      dispatch({ type: GetUserOrderSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: GetUserOrderFail, payload: error.response.data });
      } else {
        dispatch({
          type: GetUserOrderFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Get SingleOrder Details By User
export const GetSingleOrderUserAction = (OrderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GetUserSingleOrderRequest });
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.get(
        `/user/getsingleorder/${OrderId}`,
        config
      );
      dispatch({ type: GetUserSingleOrderSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: GetUserSingleOrderFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: GetUserSingleOrderFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

export const Admin_Owner_GetAllUserOrdersAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: Admin_Owner_GetAllUserOrders_Request });
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.get(`/admin/owner/getalluserorders`, config);
      dispatch({ type: Admin_Owner_GetAllUserOrders_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: Admin_Owner_GetAllUserOrders_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: Admin_Owner_GetAllUserOrders_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

export const Admin_Owner_OrderProcess = (OrderProcess, orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: Admin_Owner_UpdateProcessOrder_Request });

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `/admin/owner/updateprocessorder/${orderId}`,
        OrderProcess,
        config
      );

      dispatch({ type: Admin_Owner_UpdateProcessOrder_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: Admin_Owner_UpdateProcessOrder_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: Admin_Owner_UpdateProcessOrder_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

export const Admin_Owner_DelelteOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: Admin_Owner_DeleteOrder_Request });

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `/admin/owner/deleteorder/${orderId}`,
        config
      );

      dispatch({ type: Admin_Owner_DeleteOrder_Success, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: Admin_Owner_DeleteOrder_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: Admin_Owner_DeleteOrder_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};
