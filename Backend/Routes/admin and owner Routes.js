import express from "express";
const router = express.Router();
import { UserAuthenticate } from "../MiddleWare/UserAuthenticate.js";
import { authorizeRoles } from "../MiddleWare/create admin and owner.js";
import {
  deleteUserandAdmin,
  getAllUser,
  CheckAdminAndOwner,
  GetSingleUser_Admin_Owner,
  UpdateorderProcess,
} from "../Controller/admin and owner Controller.js";
import {
  CreateProduct,
  deleteProduct,
  DeleteReviewsByAdminAndOwner,
  GetAllProductsByAdminandOwner,
  UpddteProduct,
} from "../Controller/ProductController.js";
import {
  DeleteOrderByAdminAndOwner,
  GetAllOrderByAdminAndOwner,
  getSingleOrder,
} from "../Controller/orderController.js";

// This routes Available both admin and owner

//   Get All User
router.get(
  "/findalluser",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  getAllUser
);
router.get(
  "/singleUser/:id",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  GetSingleUser_Admin_Owner
);

//  Delete User
router.delete(
  "/deleteuser/:id",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  deleteUserandAdmin
);

//  Check Admin and Owner

//   Product Routes  -------------------------------------------------------------------------------------------------------------------

//    Create Product
router.post(
  "/createproducts",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  CreateProduct
);

//    Delete Product
router.delete(
  "/deleteproduct/:id",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  deleteProduct
);

//  Get All Products
router.get(
  "/getallproducts",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  GetAllProductsByAdminandOwner
);

//  Update Product
router.put(
  "/updateproduct/:id",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  UpddteProduct
);

//  DElete Reviews
router.delete(
  "/deletereviews",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  DeleteReviewsByAdminAndOwner
);

//  Get Single Order
router.get(
  "/getsingleorder/:id",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  getSingleOrder
);

//  Get All User Orders
router.get(
  "/getalluserorders",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  GetAllOrderByAdminAndOwner
);

//   Order Process Update

router.delete(
  "/deleteorder/:id",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  DeleteOrderByAdminAndOwner
);
// ======================================================================

router.put("/updateprocessorder/:id", UpdateorderProcess);

// =================================================================================

//  router.de
//  ordr routes  ----------------------------------------------------------------------------------------- ---------

router.delete(
  "/deleteorder/:id",
  UserAuthenticate,
  authorizeRoles("admin", "owner"),
  DeleteOrderByAdminAndOwner
);
export default router;
