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
  LoginUserRequest,
  LoginUserSuccess,
  LoginUserFail,
  UserClear,
  ForgotEmailFindUserRequest,
  ForgotEmailFindUserSuccess,
  ForgotEmailFindUserFail,
  ForgotEmailSendNewEmailRequest,
  ForgotEmailSendNewEmailSuccess,
  ForgotEmailSendNewEmailFail,
  ForgotEmailOtpVefifyRequest,
  ForgotEmailOtpVefifySuccess,
  ForgotEmailOtpVefifyFail,
  ForgotEmailClear,
  ForgotPasswordSendEmailRequest,
  ForgotPasswordSendEmailSuccess,
  ForgotPasswordSendEmailFail,
  ForgotPasswordOtpVerifyRequest,
  ForgotPasswordOtpVerifySuccess,
  ForgotPasswordOtpVerifyFail,
  ForgotPassword_ChangePasswordRequest,
  ForgotPassword_ChangePasswordSuccess,
  ForgotPassword_ChangePasswordFail,
  ForgotPasswordClear,
  MeDetailsRequest,
  MeDetailsSuccess,
  MeDetailsFail,
  MeDetailsClear,
  UserLogoutSuccess,
  UserLogoutFail,
  UserLogoutClear,
  ChangePasswordRequest,
  ChangePasswordSuccess,
  ChangePasswordFail,
  ChangePasswordClear,
  ChangeEmailSendNewEmailRequest,
  ChangeEmailSendNewEmailSuccess,
  ChangeEmailSendNewEmailFail,
  ChangeEmailOtpVefifyRequest,
  ChangeEmailOtpVefifySuccess,
  ChangeEmailOtpVefifyFail,
  ChangeEmailClear,
  UpdateProfileRequest,
  UpdateProfileSuccess,
  UpdateProfileFail,
  UpdateProfileClear,
  DeleteProfileRequest,
  DeleteProfileSuccess,
  DeleteProfileFail,
  DeleteProfileClear,
  Owner_Admin_All_User_Request,
  Owner_Admin_All_User_Success,
  Owner_Admin_All_User_Fail,
  Owner_Admin_All_User_Clear,
  Owner_Admin_Delete_Request,
  Owner_Admin_Delete_Success,
  Owner_Admin_Delete_Fail,
  Owner_Admin_Delete_Clear,
  // Owner_Admin_getSingleUser_Request,
  // Owner_Admin_getSingleUser_Success,
  // Owner_Admin_getSingleUser_Fail,
  // Owner_Admin_getSingleUser_Clear,
  Owner_Admin_updateRole_Request,
  Owner_Admin_updateRole_Success,
  Owner_Admin_updateRole_Fail,
  Owner_Admin_updateRole_Clear,
} from "../Constant/UserConstant";

//  Create User
export const CreateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case EmailVerifyRequest:
    case OtpVerifyRequest:
    case CreateUserRequest:
    case LoginUserRequest:
      return {
        ...state,
        loading: true,
      };
    case EmailVerifySuccess:
    case OtpVerifySuccess:
    case CreateUserSuccess:
    case LoginUserSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case EmailVerifyFail:
    case OtpVerifyFail:
    case CreateUserFail:
    case LoginUserFail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case UserClear:
      return {};
    default:
      return {
        ...state,
      };
  }
};

//  Forgot Email Reducer
export const ForgotEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case ForgotEmailFindUserRequest:
    case ForgotEmailSendNewEmailRequest:
    case ForgotEmailOtpVefifyRequest:
      return {
        ...state,
        loading: true,
      };

    case ForgotEmailFindUserSuccess:
    case ForgotEmailSendNewEmailSuccess:
    case ForgotEmailOtpVefifySuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ForgotEmailFindUserFail:
    case ForgotEmailSendNewEmailFail:
    case ForgotEmailOtpVefifyFail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ForgotEmailClear:
      return {};
    default:
      return {
        ...state,
      };
  }
};

//  Forgot Email Reducer
export const ForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case ForgotPasswordSendEmailRequest:
    case ForgotPasswordOtpVerifyRequest:
    case ForgotPassword_ChangePasswordRequest:
      return {
        ...state,
        loading: true,
      };

    case ForgotPasswordSendEmailSuccess:
    case ForgotPasswordOtpVerifySuccess:
    case ForgotPassword_ChangePasswordSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ForgotPasswordSendEmailFail:
    case ForgotPasswordOtpVerifyFail:
    case ForgotPassword_ChangePasswordFail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ForgotPasswordClear:
      return {};
    default:
      return {
        ...state,
      };
  }
};

//   Get Me Details

export const MeDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MeDetailsRequest:
      return {
        ...state,
        loading: true,
      };

    case MeDetailsSuccess:
      return {
        ...state,
        userdata: action.payload,
        loading: false,
      };

    case MeDetailsFail:
      return {
        ...state,
        userdata: action.payload,
        loading: false,
      };
    case MeDetailsClear:
      return {};

    default:
      return {
        ...state,
      };
  }
};

export const LogOutReducer = (state = {}, action) => {
  switch (action.type) {
    case UserLogoutSuccess:
      return {
        ...state,
        userlogoutdata: action.payload,
      };

    case UserLogoutFail:
      return {
        ...state,
        userlogoutdata: action.payload,
      };

    case UserLogoutClear:
      return {};

    default:
      return {
        ...state,
      };
  }
};

export const ChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case ChangePasswordRequest:
      return {
        ...state,
        loading: true,
      };

    case ChangePasswordSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ChangePasswordFail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ChangePasswordClear:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const ChangeEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case ChangeEmailSendNewEmailRequest:
    case ChangeEmailOtpVefifyRequest:
      return {
        ...state,
        loading: true,
      };

    case ChangeEmailSendNewEmailSuccess:
    case ChangeEmailOtpVefifySuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ChangeEmailSendNewEmailFail:
    case ChangeEmailOtpVefifyFail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ChangeEmailClear:
    case Owner_Admin_Delete_Clear:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const UpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UpdateProfileRequest:
    case Owner_Admin_updateRole_Request:
      return {
        ...state,
        loading: true,
      };

    case UpdateProfileSuccess:
    case Owner_Admin_updateRole_Success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case UpdateProfileFail:
    case Owner_Admin_updateRole_Fail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case UpdateProfileClear:
    case Owner_Admin_updateRole_Clear:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const DeleteProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case DeleteProfileRequest:
    case Owner_Admin_Delete_Request:
      return {
        ...state,
        loading: true,
      };

    case DeleteProfileSuccess:
    case Owner_Admin_Delete_Success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case DeleteProfileFail:
    case Owner_Admin_Delete_Fail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case DeleteProfileClear:
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const Admin_Owner_GetAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case Owner_Admin_All_User_Request:
      return {
        ...state,
        loading: true,
      };

    case Owner_Admin_All_User_Success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case Owner_Admin_All_User_Fail:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case Owner_Admin_All_User_Clear:
      return {};
    default:
      return {
        ...state,
      };
  }
};

// Get All User Admin_and_Owner Reducer

// export const Admin_Owner_GetSingleUserReducer = (state = {}, action) => {
//   switch (action.type) {
//     case Owner_Admin_getSingleUser_Request:
//       return {
//         ...state,
//         loading: true,
//       };

//     case Owner_Admin_getSingleUser_Success:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//       };

//     case Owner_Admin_getSingleUser_Fail:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//       };

//     case Owner_Admin_getSingleUser_Clear:
//       return {};
//     default:
//       return {
//         ...state,
//       };
//   }
// };
