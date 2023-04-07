import {
  GetUserOrderRequest,
  GetUserOrderSuccess,
  GetUserOrderFail,
  UserOrderClear,
  GetUserSingleOrderRequest,
  GetUserSingleOrderSuccess,
  GetUserSingleOrderFail,
  UserSingleOrderClear,
  Admin_Owner_GetAllUserOrders_Request,
  Admin_Owner_GetAllUserOrders_Success,
  Admin_Owner_GetAllUserOrders_Fail,
  Admin_Owner_GetAllUserOrders_Clear,
  Admin_Owner_UpdateProcessOrder_Request,
  Admin_Owner_UpdateProcessOrder_Success,
  Admin_Owner_UpdateProcessOrder_Fail,
  Admin_Owner_UpdateProcessOrder_Clear,
  Admin_Owner_DeleteOrder_Request,
  Admin_Owner_DeleteOrder_Success,
  Admin_Owner_DeleteOrder_Fail,
  Admin_Owner_DeleteOrder_Clear,
} from "../Constant/OrderConstant";

export const GetAllOrderByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GetUserOrderRequest:
      return {
        ...state,
        loading: true,
      };

    case GetUserOrderSuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case GetUserOrderFail:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case UserOrderClear:
      return {};

    default:
      return {
        ...state,
      };
  }
};

export const GetSingleOrderByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GetUserSingleOrderRequest:
      return {
        ...state,
        loading: true,
      };

    case GetUserSingleOrderSuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case GetUserSingleOrderFail:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case UserSingleOrderClear:
      return {};

    default:
      return {
        ...state,
      };
  }
};

export const Admin_Owner_GetAllOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case Admin_Owner_GetAllUserOrders_Request:
      return {
        ...state,
        loading: true,
      };

    case Admin_Owner_GetAllUserOrders_Success:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case Admin_Owner_GetAllUserOrders_Fail:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case Admin_Owner_GetAllUserOrders_Clear:
      return {};

    default:
      return {
        ...state,
      };
  }
};

export const Admin_Owner_OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case Admin_Owner_UpdateProcessOrder_Request:
    case Admin_Owner_DeleteOrder_Request:
      return {
        ...state,
        orderLoading: true,
      };

    case Admin_Owner_UpdateProcessOrder_Success:
    case Admin_Owner_DeleteOrder_Success:
      return {
        ...state,
        Orderdata: action.payload,
        orderLoading: false,
      };

    case Admin_Owner_UpdateProcessOrder_Fail:
    case Admin_Owner_DeleteOrder_Fail:
      return {
        ...state,
        Orderdata: action.payload,
        orderLoading: false,
      };
    case Admin_Owner_UpdateProcessOrder_Clear:
    case Admin_Owner_DeleteOrder_Clear:
      return {};

    default:
      return {
        ...state,
      };
  }
};
