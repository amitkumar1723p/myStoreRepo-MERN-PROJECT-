import axios from "axios";

import {
  // Email Verify
  EmailVerifyRequest,
  EmailVerifySuccess,
  EmailVerifyFail,
  OtpVerifyRequest,
  OtpVerifySuccess,
  OtpVerifyFail,
  CreateUserRequest,
  CreateUserSuccess,
  CreateUserFail,
  ForgotEmailFindUserRequest,
  ForgotEmailFindUserSuccess,
  ForgotEmailFindUserFail,
  ForgotEmailSendNewEmailRequest,
  ForgotEmailSendNewEmailSuccess,
  ForgotEmailSendNewEmailFail,
  ForgotEmailOtpVefifyRequest,
  ForgotEmailOtpVefifySuccess,
  ForgotEmailOtpVefifyFail,
  ForgotPasswordSendEmailRequest,
  ForgotPasswordSendEmailSuccess,
  ForgotPasswordSendEmailFail,
  ForgotPasswordOtpVerifyRequest,
  ForgotPasswordOtpVerifySuccess,
  ForgotPasswordOtpVerifyFail,
  ForgotPassword_ChangePasswordRequest,
  ForgotPassword_ChangePasswordSuccess,
  ForgotPassword_ChangePasswordFail,
  LoginUserRequest,
  LoginUserSuccess,
  LoginUserFail,
  MeDetailsRequest,
  MeDetailsSuccess,
  MeDetailsFail,
  UserLogoutSuccess,
  UserLogoutFail,
  ChangePasswordRequest,
  ChangePasswordSuccess,
  ChangePasswordFail,
  ChangeEmailSendNewEmailRequest,
  ChangeEmailSendNewEmailSuccess,
  ChangeEmailSendNewEmailFail,
  ChangeEmailOtpVefifyRequest,
  ChangeEmailOtpVefifySuccess,
  ChangeEmailOtpVefifyFail,
  UpdateProfileRequest,
  UpdateProfileSuccess,
  UpdateProfileFail,
  DeleteProfileRequest,
  DeleteProfileSuccess,
  DeleteProfileFail,
  DeleteProfileClear,
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  Owner_Admin_All_User_Request,
  Owner_Admin_All_User_Success,
  Owner_Admin_All_User_Fail,
  Owner_Admin_Delete_Request,
  Owner_Admin_Delete_Success,
  Owner_Admin_Delete_Fail,
  Owner_Admin_updateRole_Request,
  Owner_Admin_updateRole_Success,
  Owner_Admin_updateRole_Fail,
} from "../Constant/UserConstant";

const backendport = process.env.REACT_APP_BackendPort;

//  User Eamil Verify
export const UserEmailVefify = (userdata, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EmailVerifyRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };
      if (id) {
        const { data } = await axios.post(
          `${backendport}/user/emailverify?id=${id}`,
          userdata,
          config
        );

        dispatch({ type: EmailVerifySuccess, payload: data });
      } else {
        const { data } = await axios.post(
          `${backendport}/user/emailverify`,
          userdata,
          config
        );

        dispatch({ type: EmailVerifySuccess, payload: data });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: EmailVerifyFail, payload: error.response.data });
      } else {
        dispatch({
          type: EmailVerifyFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Otp Verify
export const OtpVerify = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OtpVerifyRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/otpverifycreateuser`,
        userdata,
        config
      );

      dispatch({ type: OtpVerifySuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: OtpVerifyFail, payload: error.response.data });
      } else {
        dispatch({
          type: OtpVerifyFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

// Create User
export const CreateUser = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CreateUserRequest });
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/register`,
        userdata,
        config
      );

      dispatch({ type: CreateUserSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: CreateUserFail, payload: error.response.data });
      } else {
        dispatch({
          type: CreateUserFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  ForgotEmailFindUser  Email Action

//    Find User
export const FindUser = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ForgotEmailFindUserRequest });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/forgetEmail/finduser`,
        userdata,
        config
      );
      dispatch({ type: ForgotEmailFindUserSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ForgotEmailFindUserFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ForgotEmailFindUserFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Send New Eamil
export const SendNewEmail = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ForgotEmailSendNewEmailRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/forgetEmail/newemail`,
        userdata,
        config
      );
      dispatch({ type: ForgotEmailSendNewEmailSuccess, payload: data });
    } catch (error) {

      if (error.response) {
        dispatch({
          type: ForgotEmailSendNewEmailFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ForgotEmailSendNewEmailFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

// Opt Vefify  Forgot Email Id
export const ForgotEmailOtpVerify = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ForgotEmailOtpVefifyRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/otpverify/changeemailid`,
        userdata,
        config
      );

      dispatch({ type: ForgotEmailOtpVefifySuccess, payload: data });
    } catch (error) {

      if (error.response) {
        dispatch({
          type: ForgotEmailOtpVefifyFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ForgotEmailOtpVefifyFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//    End Forgot Email Action

//  Forgot Password   Action

//  Forgot Password Send Eamil
export const ForgetPasswordSendEmailAction = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ForgotPasswordSendEmailRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/forgetpassword/sendcode`,
        userdata,
        config
      );
      dispatch({ type: ForgotPasswordSendEmailSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ForgotPasswordSendEmailFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ForgotPasswordSendEmailFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Forgot Password Opt verify

export const ForgotPasswordOtpVerifyAction = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ForgotPasswordOtpVerifyRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/forgetpassword/resiveotp`,
        userdata,
        config
      );
      dispatch({ type: ForgotPasswordOtpVerifySuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ForgotPasswordOtpVerifyFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ForgotPasswordOtpVerifyFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Change Password  For Loging User

export const NewPassword = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ForgotPassword_ChangePasswordRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${backendport}/user/forgetpassword`,
        userdata,
        config
      );
      dispatch({ type: ForgotPassword_ChangePasswordSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ForgotPassword_ChangePasswordFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ForgotPassword_ChangePasswordFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  End Forgot Password

//  Login User

export const LoginuserAction = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LoginUserRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      // const { data } = await axios.post(`${process.env.BackendPort}/user/login`, userdata, config)
      const { data } = await axios.post(
        `${backendport}/user/login`,
        userdata,
        config
      );
      dispatch({ type: LoginUserSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: LoginUserFail, payload: error.response.data });
      } else {
        dispatch({
          type: LoginUserFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//   Get Logged User Details

export const GetMeDetails = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MeDetailsRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.get(`${backendport}/user/medetail`, config);
      dispatch({ type: MeDetailsSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: MeDetailsFail, payload: error.response.data });
      } else {
        dispatch({
          type: MeDetailsFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//   LogOut User
export const LogoutUserAction = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.get(`${backendport}/user/logout`, config);
      dispatch({ type: UserLogoutSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: UserLogoutFail, payload: error.response.data });
      } else {
        dispatch({
          type: UserLogoutFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

// Change Password

export const ChangePasswordAction = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ChangePasswordRequest });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.put(
        `${backendport}/user/changepassword`,
        userdata,
        config
      );
      dispatch({ type: ChangePasswordSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: ChangePasswordFail, payload: error.response.data });
      } else {
        dispatch({
          type: ChangePasswordFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Change Email for login User

export const ChangeEmailAction = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ChangeEmailSendNewEmailRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/changeEmail/newemail`,
        userdata,
        config
      );
      dispatch({ type: ChangeEmailSendNewEmailSuccess, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ChangeEmailSendNewEmailFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ChangeEmailSendNewEmailFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

export const ChangeEmailOtpVerifyAction = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ChangeEmailOtpVefifyRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendport}/user/otpverify/changeemailid`,
        userdata,
        config
      );

      dispatch({ type: ChangeEmailOtpVefifySuccess, payload: data });
    } catch (error) {

      if (error.response) {
        dispatch({
          type: ChangeEmailOtpVefifyFail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ChangeEmailOtpVefifyFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

export const EditProfileAction = (userdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UpdateProfileRequest });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      };

      const { data } = await axios.put(
        `${backendport}/user/updateprofile`,
        userdata,
        config
      );

      dispatch({ type: UpdateProfileSuccess, payload: data });
    } catch (error) {

      if (error.response) {
        dispatch({ type: UpdateProfileFail, payload: error.response.data });
      } else {
        dispatch({
          type: UpdateProfileFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

export const DeleteProfileAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: DeleteProfileRequest });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.delete(
        `${backendport}/user/deleteprofile`,
        config
      );

      dispatch({ type: DeleteProfileSuccess, payload: data });
    } catch (error) {

      if (error.response) {
        dispatch({ type: DeleteProfileFail, payload: error.response.data });
      } else {
        dispatch({
          type: DeleteProfileFail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};
 
//    Get All User By  Admin Routs
export const Admin_Owner_GetAllUserAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: Owner_Admin_All_User_Request });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.get(
        `${backendport}/admin/owner/findalluser`,
        config
      );

      dispatch({ type: Owner_Admin_All_User_Success, payload: data });
    } catch (error) {

      if (error.response) {
        dispatch({
          type: Owner_Admin_All_User_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: Owner_Admin_All_User_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

//  Delete Profile  By Admin_Owner_Routes

export const Admin_Owner_DelteUserProfileAction = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: Owner_Admin_Delete_Request });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.delete(
        `${backendport}/admin/owner/deleteuser/${userId}`,
        config
      );

      dispatch({ type: Owner_Admin_Delete_Success, payload: data });
    } catch (error) {

      if (error.response) {
        dispatch({
          type: Owner_Admin_Delete_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: Owner_Admin_Delete_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};

export const Admin_Owner_UpdateUserRole = (UserRole, userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: Owner_Admin_updateRole_Request });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      };
      // owner/updaterole/63f1c283550d5d702c2951515
      const { data } = await axios.put(
        `${backendport}/owner/updaterole/${userId}`,
        UserRole,
        config
      );

      dispatch({ type: Owner_Admin_updateRole_Success, payload: data });
    } catch (error) {

      if (error.response) {
        dispatch({
          type: Owner_Admin_updateRole_Fail,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: Owner_Admin_updateRole_Fail,
          payload: { error: error.message, success: false },
        });
      }
    }
  };
};


