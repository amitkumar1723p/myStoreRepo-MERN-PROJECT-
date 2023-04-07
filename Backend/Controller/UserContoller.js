import UserModel from "../Model/UserModel.js";
import { SendError } from "../Utils/error.js";
import { sendJWT } from "../Utils/sendjwtToken.js";
import crypto from "crypto";
import { SendEamil } from "../Utils/SendEmail.js";
import { Createotp } from "../Utils/createotp.js";
import cloudinary from "cloudinary";

//   Crate User
//  Email Verifyfication  Purpose CreateUser

export const EmailVerify = async (req, res) => {
  try {
    const { email } = req.body;
    let documentid;
    if (req.query.id) {
      documentid = req.query.id;
    }

    // FindUser   (EmailVerify true)

    //    Find User        (AllfiledCreated)
    let finduser = await UserModel.findOne({
      email,
      AllfiledCreate: true,
      emailVerify: true,
    });

    if (finduser) {
      let message = `This Email is Allready exist`;
      return SendError(res, 302, false, message, null);
    }

    let otp = Createotp();
    if (!otp) {
      let message = `Try again OTP  not sent ${req.body.email}`;
      return SendError(res, 424, false, message, null);
    }
    // Create a Otp Hash
    const opthash = crypto
      .createHash("sha256", process.env.OTP_SECRET)
      .update(otp)
      .digest("hex");
    let resetPasswordOtp = opthash; // hour  * min *second * millisecond
    //                             Token Valid 15 Minutes
    let resetPasswordOtpExpire = Date.now() + 15 * 60 * 1000;

    let userotpdocument;

    if (documentid) {
      userotpdocument = await UserModel.findById(documentid);
      if (!userotpdocument) {
        userotpdocument = new UserModel({
          resetPasswordOtp,
          resetPasswordOtpExpire,
          email,
        });
      } else {
        userotpdocument.resetPasswordOtp = resetPasswordOtp;
        userotpdocument.resetPasswordOtpExpire = resetPasswordOtpExpire;
        userotpdocument.email = email;
      }
    } else {
      userotpdocument = new UserModel({
        resetPasswordOtp,
        resetPasswordOtpExpire,
        email,
      });
    }

    const subject = `Email Verify`;
    const html = `
        <div>
        <h3> Otp is ${otp}</h3>
      
        <p> This Otp valid for 15 Min <p>
        </div>
        `;

    let { resolve, err } = await SendEamil(email, subject, html);

    if (resolve == false) {
      if (err) {
        let message = `Try again OTP  not sent  This Region ${err}`;
        return SendError(res, 500, false, message, null);
      }
      let message = `Try again OTP  not sent ${email}`;
      return SendError(res, 500, false, message, null);
    }
    let saveopt = await userotpdocument.save();
    if (!saveopt) {
      let message = `Try again OTP  not sent ${email}`;
      return SendError(res, 500, false, message, null);
    }

    return res
      .status(200)
      .json({
        message: `please check  ${email}  otp  has been sent" `,
        success: true,
        id: userotpdocument._id,
      });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};
//    Otp Verify    Purpose Create User
export const otpVerify = async (req, res) => {
  try {
    const resiveotp = req.body.otp;
    const opthash = crypto
      .createHash(
        "sha256",

        process.env.OTP_SECRET
      )
      .update(resiveotp)
      .digest("hex");
    const result = await UserModel.findOne({ resetPasswordOtp: opthash });

    if (!result) {
      let message = `Invalid Otp`;
      return SendError(res, 404, false, message, null);
    }

    if (result.resetPasswordOtpExpire <= new Date(Date.now())) {
      //  Send response token are expire
      let message = "Your otp has been Expired Resend Otp ";

      return SendError(res, 404, false, message, null);
    }

    // Delete  Fake Email

    let deleteuser = await UserModel.find({
      email: result.email,
      emailVerify: true,
      AllfiledCreate: false,
    });

    if (deleteuser.length > 0) {
      deleteuser.forEach(async (element) => {
        await UserModel.findByIdAndDelete(element._id);
      });
    }

    result.emailVerify = true;
    result.resetPasswordOtp = null;
    result.resetPasswordOtpExpire = null;

    const user = await result.save();
    deleteuser = await UserModel.find({
      email: result.email,
      emailVerify: false,
      AllfiledCreate: false,
    });

    if (deleteuser.length > 0) {
      deleteuser.forEach(async (element) => {
        await UserModel.findByIdAndDelete(element._id);
      });
    }

    if (!user) {
      let message = `Please Resend otp`;
      return SendError(res, 500, false, message, null);
    }

    return res
      .status(200)
      .json({
        OtpIsValid: true,
        message: "Otp is Valid",
        success: true,
        verifyEmail: result.email,
      });
  } catch (error) {
    let message = `Your otp is Failn This region ${error.message} Plese Re-Send otp`;
    return res.status(500).json({ success: false, message });
  }
};

export const CreateUser = async (req, res) => {
  try {
    const { name, contact, password, email, userimage } = req.body;

    if (!req.files) {
      let message = "Image File is Required";
      return res.status(404).json({ success: false, error: message });
    }

    if (!req.files.userimage) {
      let message = "Image File is Required";
      return res.status(404).json({ success: false, error: message });
    }

    // check the user email because this email can be exist in database
    let finduser = await UserModel.findOne({
      email: req.body.email,
      emailVerify: true,
      AllfiledCreate: true,
    });

    if (finduser) {
      let message = "This Email is Alredy Exist";
      return SendError(res, 401, false, message, null);
    }

    finduser = await UserModel.findOne({
      email: req.body.email,
      emailVerify: true,
    });

    if (!finduser) {
      let message = "This Email is NOt Verify ";
      // return (SendError(res, 401, false, message))

      return res
        .status(400)
        .json({ success: false, error: message, goback: true });
    }

    // check the user Contact because this Contact can be exist in database
    const userContactCheck = await UserModel.findOne({
      contact: req.body.contact,
    });
    if (userContactCheck) {
      let message = "User  Contact Allready Exist";
      return SendError(res, 400, false, message, null);
    }

    //  Create User Document

    finduser.name = name;
    (finduser.contact = contact), (finduser.password = password);
    finduser.email = email;

    const myCloud = await cloudinary.v2.uploader.upload(
      req.files.userimage.tempFilePath,
      {
        folder: "MyStore_Users",
      }
    );
    if (!myCloud) {
      let message = "Your Image is not Upload";
      return SendError(res, 500, false, message, null);
    }

    finduser.userimage = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };

    //  create and send jwt
    sendJWT(res, finduser, true);
  } catch (error) {
   

    if (!error.message) {
      return SendError(res, 400, false, error, null);
    }
    return SendError(res, 500, false, null, error);
  }
};

// Login User
export const LoginUser = async (req, res, next) => {
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
      emailVerify: true,
      AllfiledCreate: true,
    }).select("+password");
    if (!user) {
      let message = "User Login fail eamil";
      return SendError(res, 404, false, message, null);
    }
    // Match Password

    let { result, success, err } = await user.MatchPassword(req.body.password);
    if (success == false) {
      let message = `User Login fail password This region (${err})}`;
      return SendError(res, 500, false, message, null);
    }

    if (result == true) {
      //  create and send jwt

      return sendJWT(res, user, false);
    } else {
      let message = "User Login fail";
      return SendError(res, 401, false, message, null);
    }
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//  LogOUt User
export const LogOutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    return res
      .status(200)
      .json({
        message: `${req.user.name} is Logout Sucessfully `,
        success: true,
      });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//   Check User Login or not
export const CheckLoginUser = (req, res) => {
  return res
    .status(200)
    .json({
      IsAuthenticated: true,
      message: `${req.user.name} is Allready Login`,
      success: true,
    });
};

// Fortget Password   (Send  Otp in the Email)
export const ForgetPassword_SendOtpInEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const finduser = await UserModel.findOne({
      email,
      AllfiledCreate: true,
      emailVerify: true,
    });

    //   Find User
    if (!finduser) {
      let message = "This email does not exist";
      return SendError(res, 500, false, message, null);
    }

    let otp = finduser.SaveOtp(res);

    if (!otp) {
      let message = `Try again OTP  not sent ${req.body.email}`;
      return SendError(res, 424, false, message, null);
    }
    const subject = `Forget Password`;
    const html = `
        <div>
        <h3 > Otp is ${otp}</h3>
        <p> This Otp valid for 15 Min <p>
        </div>
        `;

    let { resolve, err } = await SendEamil(email, subject, html);

    if (resolve == false) {
      if (err) {
        let message = `Try again OTP  not sent  This Region ${err}`;
        return SendError(res, 424, false, message, null);
      }
      let message = `Try again OTP  not sent ${req.body.email}`;
      return SendError(res, 424, false, message, null);
    }
    let user = await finduser.save();
    if (!user) {
      let message = `Try again OTP  not sent ${req.body.email}`;
      return SendError(res, 424, false, message, null);
    }

    return res
      .status(200)
      .json({
        message: `please check  ${req.body.email} a otp  has been sent" `,
        success: true,
        forgotpasswordotpsend: true,
      });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//   Access User  Forgot Otp
export const AccessOtp = async (req, res) => {
  try {
    const resiveotp = req.body.otp;
    const opthash = crypto
      .createHash("sha256", process.env.OTP_SECRET)
      .update(resiveotp)
      .digest("hex");
    const result = await UserModel.findOne({ resetPasswordOtp: opthash });

    if (!result) {
      let message = `Invalid Otp`;
      return SendError(res, 404, false, message, null);
    }

    if (result.resetPasswordOtpExpire <= new Date(Date.now())) {
      //  Send response token are expire
      let message = "Your otp has been Expired Resend Otp ";
      return SendError(res, 404, false, message, null);
    }

    const option = {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    };

    res.cookie("id", result._id, option);

    result.resetPasswordOtp = null;
    result.resetPasswordOtpExpire = null;
    return res
      .status(200)
      .json({
        forgotpasswordotpisvalid: true,
        message: "Otp is Valid",
        success: true,
      });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//   Forgot Password
export const UpdatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    let id = req.cookies.id;

    if (!id) {
      let error = "Your Password is not Forgot Please resend otp";
      return res.status(400).json({ success: false, goback: true, error });
      // return SendError(res, 404, false, message, null)
    }

    let user = await UserModel.findById(id).select("+password");

    if (!user) {
      let message = "User not Found Please resend otp";
      return SendError(res, 404, false, message, null);
    }

    user.password = password;
    let result = await user.save();
    if (!result) {
      let message = "Your password not Forgot ";
      return SendError(res, 403, false, message, null);
    }

    return res
      .status(200)
      .json({
        message: "Your Password is Forget SucessFully ",
        success: true,
        changePassword: true,
      });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

// User will get his details
export const MeDetails = async (req, res) => {
  try {
    let { _id } = req.user;

    let user = await UserModel.findById({ _id });

    if (!user) {
      let error = "User not Found";
      // return SendError(res, 404, false, message, null)
      return res
        .status(400)
        .json({ success: false, IsAuthenticated: false, error });
    }

    const message = "User Found Successfully";
    return res
      .status(200)
      .json({ success: true, user, message, IsAuthenticated: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, IsAuthenticated: false, error: error.message });
  }
};

// Login User  Change Password
export const ChangePasswordForLoginUer = async (req, res) => {
  try {
    const { oldPassword, NewPassword } = req.body;
    const user = await UserModel.findById(req.user._id).select("+password");

    if (!user) {
      let message = `User Not Found`;
      return SendError(res, 404, false, message, null);
    }

    let { result, success, err } = await user.MatchPassword(
      req.body.oldPassword
    );

    if (success == false) {
      let message = `User Password  Not Change This region (${err})}`;
      return SendError(res, 500, false, message, null);
    }

    if (result == false) {
      //  create and send jwt
      let message = "Old Password not Match";
      return SendError(res, 500, false, message, null);
    }

    //  Set new password in user Document
    user.password = NewPassword;

    //  save new password in user Document
    let finduser = await user.save();
    if (!finduser) {
      let message = "Your Password not Change";
      return SendError(res, 500, false, message, null);
    }

    let message = "User Password Change Successfully ";
    res.status(200).json({ success: true, message });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

// Update User Profile
export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, contact } = req.body;

    // check the user Contact because this Contact can be exist in database
    const userContactCheck = await UserModel.findOne({ contact });
    if (userContactCheck) {
      if (userContactCheck.contact != req.user.contact) {
        let message = "User  Contact Allready Exist";
        return SendError(res, 400, false, message, null);
      }
    }
    const newUerData = {
      name,
      contact,
      lastUpdate: Date.now(),
    };

    if (req.files) {
      if (req.files.userimage) {
        await cloudinary.v2.uploader.destroy(req.user.userimage.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(
          req.files.userimage.tempFilePath,
          {
            folder: "MyStore_Users",
          }
        );
        if (!myCloud) {
          let message = "Your Image is not Upload";
          return SendError(res, 500, false, message, null);
        }

        newUerData.userimage = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        };
      }
    }

    let user = await UserModel.findByIdAndUpdate(userId, newUerData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      const message = "User Profile not Update";
      return SendError(res, 500, false, message, null);
    }
    let message = "Update Profile Successfully";
    res.status(200).json({ success: true, message, user });
  } catch (error) {

    if (!error.message) {
      return SendError(res, 400, false, error, null);
    }
    return SendError(res, 500, false, null, error);
  }
};

//   Forget Eamil Id   Find User
export const ForgotEmailIdFindUser = async (req, res) => {
  try {
    const { password, contact } = req.body;

    const user = await UserModel.findOne({ contact }).select("+password");
    if (!user) {
      let message = "User not Found";
      return SendError(res, 404, false, message, null);
    }

    let { result, success, err } = await user.MatchPassword(password);

    if (success == false) {
      let message = `Password Not Found This region (${err})}`;
      return SendError(res, 500, false, message, null);
    }

    if (result == false) {
      let message = "Password not Match";
      return SendError(res, 500, false, message, null);
    }

    const option = {
      httpOnly: true,
      // minutes expire time
      expires: new Date(Date.now() + 15 * 60 * 1000),
    };
    res.cookie("id", user._id, option);
    let message = "User Found Successfully !";
    return res.status(200).json({ success: true, finduser: true, message });
  } catch (error) {
    if (!error.message) {
      return SendError(res, 500, false, error, null);
    }
    return SendError(res, 500, false, null, error);
  }
};

//  Forget Email id   (Get new Email )

export const ForgotEmailIdgetNewEmail = async (req, res) => {
  try {
    const { email } = req.body;

    let id = req.cookies.id;

    const finduser = await UserModel.findById(id);

    // if (!finduser) {
    //     const message = "Go back and submit details again "
    //     return SendError(res, 404, false, message, null)
    // }

    if (!finduser) {
      const error = "submit  Your Details  again";
      return res.status(400).json({ success: false, goback: true, error });
      // return SendError(res, 404, false, message, null)
    }

    let user = await UserModel.findOne({
      email,
      AllfiledCreate: true,
      emailVerify: true,
    });

    if (user) {
      const message = "This Email is All ready Exist";
      return SendError(res, 404, false, message, null);
    }

    let otp = finduser.SaveOtp(res);

    if (!otp) {
      let message = `Try again OTP  not sent ${req.body.email}`;
      return SendError(res, 424, false, message, null);
    }
    const subject = `Forgot Email Id`;
    const html = `
        <div>
        <h3 > Otp is ${otp} </h3>
       
       
        <p> This Otp valid for 15 Min <p>
        </div>
        `;

    let { resolve, err } = await SendEamil(email, subject, html);

    if (resolve == false) {
      if (err) {
        let message = `Try again OTP  not sent  This Region ${err}`;
        return SendError(res, 424, false, message, null);
      }
      let message = `Try again OTP  not sent ${req.body.email}`;
      return SendError(res, 424, false, message, null);
    }

    finduser.temporydata = email;

    let result = await finduser.save();
    if (!result) {
      let message = `Try again OTP  not sent ${email}`;
      return SendError(res, 500, false, message, null);
    }

    return res
      .status(200)
      .json({
        message: `please check  ${email} a otp  has been sent" `,
        success: true,
        newEmailOtpSend: true,
      });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//  Change  Email Id   Authantication required

export const changeEmailId = async (req, res) => {
  try {
    let { email } = req.body;

    let finduser = await UserModel.findById(req.user._id);
    if (!finduser) {
      const message = "User not Found";
      return SendError(res, 404, false, message, null);
    }
    let user = await UserModel.findOne({
      email,
      AllfiledCreate: true,
      emailVerify: true,
    });
    if (user) {
      const message = "This Email is All ready Exist";
      return SendError(res, 404, false, message, null);
    }

    let otp = finduser.SaveOtp(res);

    if (!otp) {
      let message = `Try again OTP  not sent ${req.body.email}`;
      return SendError(res, 424, false, message, null);
    }
    const subject = `Change Email Id`;
    const html = `
        <div>
        <h3> otp is ${otp} </h3>
        
      
        <p> This Otp valid for 15 Min <p>
        </div>
        `;

    let { resolve, err } = await SendEamil(email, subject, html);

    if (resolve == false) {
      if (err) {
        let message = `Try again OTP  not sent  This Region ${err}`;
        return SendError(res, 424, false, message, null);
      }
      let message = `Try again OTP  not sent ${req.body.email}`;
      return SendError(res, 424, false, message, null);
    }

    finduser.temporydata = email;

    let result = await finduser.save();
    if (!result) {
      let message = `Try again OTP  not sent ${email}`;
      return SendError(res, 500, false, message, null);
    }

    return res
      .status(200)
      .json({
        message: `please check  ${email} a otp  has been sent" `,
        success: true,
        ChangeEmailOtpSend: true,
      });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//    Otp verifyEmail Change Email And Forget Password
export const otpVerifyForChangeEmailAndForgetEamil = async (req, res) => {
  try {
    let result = null;

    const resiveotp = req.body.otp;
    const opthash = crypto
      .createHash(
        "sha256",

        process.env.OTP_SECRET
      )
      .update(resiveotp)
      .digest("hex");
    result = await UserModel.findOne({ resetPasswordOtp: opthash });

    if (!result) {
      let message = `Invalid Otp`;
      return SendError(res, 404, false, message, null);
    }

    if (result.resetPasswordOtpExpire <= new Date(Date.now())) {
      //  Send response token are expire
      let message = "Your otp has been Expired Resend Otp ";
      result.temporydata = null;
      return SendError(res, 404, false, message, null);
    }

    if (result.temporydata == null) {
      // let message = "May be Your Email is Change  otherwise resend otp"
      // return SendError(res, 403, false, message, null)

      const error = "Email is not Found Change Try Again";
      return res.status(400).json({ success: false, goback: true, error });
    }
    let tempemail = result.temporydata;
    result.email = tempemail;
    result.temporydata = null;

    result.resetPasswordOtp = null;
    result.resetPasswordOtpExpire = null;

    // Delete  Fake Email
    let deleteuser = await UserModel.find({
      email: result.email,
      emailVerify: true,
      AllfiledCreate: false,
    });

    if (deleteuser.length > 0) {
      deleteuser.forEach(async (element) => {
        await UserModel.findByIdAndDelete(element._id);
      });
    }
    deleteuser = await UserModel.find({
      email: result.email,
      emailVerify: false,
      AllfiledCreate: false,
    });
    if (deleteuser.length > 0) {
      deleteuser.forEach(async (element) => {
        await UserModel.findByIdAndDelete(element._id);
      });
    }

    const user = await result.save();
    if (!user) {
      let message = `Please Resend otp`;
      return SendError(res, 500, false, message, null);
    }

    return res
      .status(200)
      .json({
        OtpIsValid: true,
        message: "Otp is Valid (Change Email Id is Successfully)",
        success: true,
        changeEmailId: true,
      });
  } catch (error) {
    if (result != null) {
      result.resetPasswordOtp = null;
      result.resetPasswordOtpExpire = null;
    }
    let errors = `Your otp is Failn This region ${error.message} Plese Re-Send otp`;
    return res.status(500).json({ success: false, error: errors });
  }
};

// Delete  User Profile     by me
export const DeleteProfile = async (req, res) => {
  try {
    let result = await UserModel.findByIdAndDelete(req.user._id);
    await cloudinary.v2.uploader.destroy(req.user.userimage.public_id);
    if (!result) {
      let message = "user not deleted";
      return SendError(res, 500, false, message, null);
    }

    let message = "User Deleted Successfully";
    return res.status(200).json({ success: true, message });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};
