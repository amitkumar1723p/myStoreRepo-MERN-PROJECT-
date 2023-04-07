import { SendError } from "../Utils/error.js";
import OrderModel from "../Model/orderModel.js";
import UserModel from "../Model/UserModel.js";
import ProductModel from "../Model/ProductModel.js";

//  Crate New Order
export const CreateNewOrder = async (req, res) => {
  try {
    req.body.userId = req.user._id;
    req.body.shippingInfo.name = req.user.name;
    req.body.paidAt = Date.now();
    const OrderData = new OrderModel(req.body);
    //  Save the order Data in database

    req.body.orderItems.forEach(async (element) => {
      let findproduct = await ProductModel.findById(element.productId);

      if (findproduct) {
        let newstock = findproduct.stock - element.Quantity;
        if (newstock <= 0) {
          findproduct.stock = 0;
        } else {
          findproduct.stock = newstock;
        }

        await findproduct.save();
      }
    });
    const neworder = await OrderData.save();
    if (!neworder) {
      let message = "This Order is not Created";
      return SendError(res, 500, false, message, null);
    }
    let message = "Your order Created Successfully";
    res.status(201).json({ success: true, message, neworder });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//   Get Single Order  Details
export const getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const findorder = await OrderModel.findById(orderId);

    if (!findorder) {
      let message = "Order not found with this orderId";
      return SendError(res, 404, false, message, null);
    }
    return res.status(200).json({ order: findorder, success: true });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//  User get all her orders
export const getmeAllOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const findorders = await OrderModel.find({ userId });

    if (!findorders) {
      let message = "Your order is not found";
      return SendError(res, 404, false, message, null);
    }
    res.status(200).json({ success: true, findorders });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//  Get All User Order By Admin and owner
export const GetAllOrderByAdminAndOwner = async (req, res) => {
  try {
    const findorders = await OrderModel.find();

    if (!findorders) {
      let message = "Orders not found";
      return SendError(res, 404, false, message, null);
    }

    if (findorders.length > 0) {
      for (let i = 0; i < findorders.length; i++) {
        // const element = array[i];
        let user = await UserModel.findById(findorders[i].userId);
        findorders[i].userId = user;
      }
    }

    res.status(200).json({ success: true, findorders });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};
// Delete Order  By Admin and Owner

export const DeleteOrderByAdminAndOwner = async (req, res) => {
  try {
    const orderId = req.params.id;

    const findorder = await OrderModel.findById(orderId);
    if (!findorder) {
      let message = " This Order not found";
      return SendError(res, 404, false, message, null);
    }

    const deleteorder = await OrderModel.findByIdAndDelete(orderId);
    if (!deleteorder) {
      let message = " This Order This order is not deleted";
      return SendError(res, 500, false, message, null);
    }
    let message = "This Order is  Deleted Successfully";
    res.status(200).json({ success: true, message });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

// i will write after some time Order Update  Controller and Product Stock Update Controller and
//  Payment Controller
