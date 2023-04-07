import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  GetSampleProductsReducer,
  GetAllProductsReducer,
  GetAllProductsNameReducer,
  GetSingleProducReducer,
  SubmitReviewReducer,
  CreateProductReducer,
} from "./reducer/ProductReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  CreateUserReducer,
  ForgotEmailReducer,
  ForgotPasswordReducer,
  MeDetailsReducer,
  LogOutReducer,
  ChangePasswordReducer,
  ChangeEmailReducer,
  UpdateProfileReducer,
  DeleteProfileReducer,
  Admin_Owner_GetAllUserReducer /* ,Admin_Owner_GetSingleUserReducer */,
} from "./reducer/UserReducer";
import { ShowAlertReducer } from "./reducer/AlertReducer";
import { CartReducer } from "./reducer/CartReducer";
import {
  GetAllOrderByUserReducer,
  GetSingleOrderByUserReducer,
  Admin_Owner_GetAllOrdersReducer,
  Admin_Owner_OrderReducer,
} from "./reducer/OrderReducer";

//

const reducer = combineReducers({
  getProducts: GetSampleProductsReducer,
  getAllProducts: GetAllProductsReducer,
  getAllProductsName: GetAllProductsNameReducer,
  getSingleProduct: GetSingleProducReducer,
  userdata: CreateUserReducer,
  ForgotEmail: ForgotEmailReducer,
  ForgotPassword: ForgotPasswordReducer,
  meDetails: MeDetailsReducer,
  Alert: ShowAlertReducer,
  LogoutUser: LogOutReducer,
  ChangePassword: ChangePasswordReducer,
  ChangeEmail: ChangeEmailReducer,
  EditProfile: UpdateProfileReducer,
  deleteProfile: DeleteProfileReducer,
  submitReview: SubmitReviewReducer,
  Cart: CartReducer,
  UserOrders: GetAllOrderByUserReducer,
  SingleUserOrder: GetSingleOrderByUserReducer,
  crtProduct: CreateProductReducer,
  getAllUser: Admin_Owner_GetAllUserReducer,
  getAllOrder: Admin_Owner_GetAllOrdersReducer,
  orderDetails: Admin_Owner_OrderReducer,
});

let initialState = {
  Cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shipping_Info: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
