import { SendError } from "../Utils/error.js";
import jwt from "jsonwebtoken";
import UserModel from "../Model/UserModel.js";
export const UserAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;


    if (!token) {
      return res.status(401).json({
        success: false,
        IsAuthenticated: false,
        error: "Please Login to access this resource ",
      });
    }
    const token_secret = process.env.JWT_TOKEN_SECRET;

    // verify Jwt Token

    let { id } = await jwt.verify(token, token_secret);
    if (!id) {
      return res.status(401).json({
        success: false,
        IsAuthenticated: false,
        error: "Please Login to access this resource ",
      });
    }
    const FindUser = await UserModel.findById(id);

    if (!FindUser) {
      return res.status(401).json({
        success: false,
        IsAuthenticated: false,
        error: "Please Login to access this resource ",
      });
    }
    req.user = FindUser;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      IsAuthenticated: false,
      error: "Please Login to access this resource ",
    });
  }
};
