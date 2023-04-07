// Find All User
import OrderModel from "../Model/orderModel.js";
import UserModel from "../Model/UserModel.js";
import cloudinary from "cloudinary";
import { SendError } from "../Utils/error.js";
export const getAllUser = async (req, res) => {
  try {
    let user = await UserModel.find();

    if (!user) {
      let message = "User not found ";
      return SendError(res, 404, false, message, null);
    }

    user = user.filter((item) => {
      if (
        (item.emailVerify === false && item.AllfiledCreate == false) ||
        (item.emailVerify == true && item.AllfiledCreate == false)
      ) {
        return item.createdAt < new Date(Date.now() - 15 * 60 * 1000);
      } else {
        return item;
      }
    });

    let message = "All User Find";
    return res.status(200).json({ success: true, message, user });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//   Delete User  and Admin    (owner and Admin routes )
export const deleteUserandAdmin = async (req, res) => {
  try {
    let id = req.params.id;

    let finduser = await UserModel.findById(id);
    

    if (!finduser) {
      let message = "Detail not Found";
      return SendError(res, 404, false, message, null);
    }
    if (req.user.role === "admin") {
      let findadmin = await UserModel.findOne({
        _id: id,
        role: "admin",
        emailVerify: true,
        AllfiledCreate: true,
      });
      if (findadmin) {
        let message = `Role:${finduser.role} is not accepted for deleted `;
        return SendError(res, 400, false, message, null);
      }
    }

    let findowner = await UserModel.findOne({
      _id: id,
      role: "owner",
      emailVerify: true,
      AllfiledCreate: true,
    });
    if (findowner) {
      let message = `Role:${finduser.role} is not accepted for deleted `;
      return SendError(res, 400, false, message, null);
    }
    
    if (finduser.userimage) {
      if (finduser.userimage.public_id) {
        await cloudinary.v2.uploader.destroy(finduser.userimage.public_id);
      }
    }

    let result = await UserModel.findByIdAndDelete(id);
    if (!result) {
      let message = `${finduser.role} not Deleted`;
      return SendError(res, 500, false, message, null);
    }
    let message = `${finduser.role} Delete Sucessfully`;
    return res.status(200).json({ success: true, message });
  } catch (error) {
   

    if (!error.message) {
      return SendError(res, 400, false, error, null);
    }
    return SendError(res, 500, false, null, error);
  }
};

//  Update User Role By owner
export const UpdateUserRoleByOwner = async (req, res) => {
  try {
    let { role } = req.body;

    if (!role) {
      let message = "Role is not provide";
      return SendError(res, 400, false, message, null);
    }
    let id = req.params.id;

    let finduser = await UserModel.findById(id);

    if (!finduser) {
      let message = "Detail not Found";
      return SendError(res, 404, false, message, null);
    }
    let user = await UserModel.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      let message = "Role not Updated";
      return SendError(res, 404, false, message, null);
    }

    let message = "Role Update SuccessFully";
    return res.status(200).json({ success: true, message, user });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

export const GetSingleUser_Admin_Owner = async (req, res) => {
  try {
    let id = req.params.id;

    let finduser = await UserModel.findOne({
      _id: id,
      emailVerify: true,
      AllfiledCreate: true,
    });

    if (!finduser) {
      let message = "Details is Not Found";
      return SendError(res, 400, false, message, null);
    }

    if (req.user.role === "admin") {
      if (finduser.role === "owner") {
        let message = "This resource is not Access for  Admin";
        return SendError(res, 400, false, message, null);
      }
    }

    let message = "Find User  SuccessFully";
    return res.status(200).json({ succes: true, message, user: finduser });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

export const UpdateorderProcess = async (req, res) => {
  try {
    
    const orderId = req.params.id;
    const { OrderProcess } = req.body;

    const findorder = await OrderModel.findById(orderId);
    if (!findorder) {
      let message = " This Order not found";
      return SendError(res, 404, false, message, null);
    }

    findorder.orderStatus = OrderProcess;
   
    let order = await findorder.save();
    if (!order) {
      let message = " This Order not found";
      return SendError(res, 404, false, message, null);
    }
    let message = "Order Process Update Sucessfully";
    return res.status(200).json({ success: true, message });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

// Check Admin and Owner

export const CheckAdminAndOwner = (req, res) => {
  res.status(200).json({ success: true, adminAndOwner: true });
};
export const CheckOwner = (req, res) => {
  res.status(200).json({ success: true, Owner: true });
};
