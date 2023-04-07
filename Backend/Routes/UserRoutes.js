import express from 'express'
const router = express.Router()

import { CreateUser, LoginUser, LogOutUser, CheckLoginUser, ForgetPassword_SendOtpInEmail, AccessOtp, UpdatePassword, MeDetails, ChangePasswordForLoginUer, UpdateProfile, EmailVerify, otpVerify, ForgotEmailIdFindUser, ForgotEmailIdgetNewEmail, DeleteProfile, changeEmailId, otpVerifyForChangeEmailAndForgetEamil } from '../Controller/UserContoller.js'
import { checkerrorCreateUser } from '../MiddleWare/CheckUserdocumenterror.js'
import { body } from 'express-validator';


import { UserAuthenticate } from '../MiddleWare/UserAuthenticate.js';

import { CreateReview, GetAllProdductName, getAllProducts, GetAllReviewInSingleProduct, GetHighest_And_Lowest_PRoductPrice, GetSampleProducts, GetSingleProduct } from '../Controller/ProductController.js';
import { CreateNewOrder, getmeAllOrder, getSingleOrder } from '../Controller/orderController.js'
import {processPayment} from '../Controller/PaymentController.js'

 


//   Email Verify Purpose  Create User 
router.post('/emailverify', body('email', "Enter Your Valid Email").isEmail(), checkerrorCreateUser, EmailVerify)

router.post('/otpverifycreateuser', otpVerify)
//    Create User 
router.post('/register',
    body('email', "Enter Your Valid Email").isEmail(),
    body("name", "Name requires less than 30 characters and more than 2 characters").isLength({ min: 2, max: 30 }),
    body("contact", "Enter a Valid Contact").isLength({ max: 10, min: 10 }).isMobilePhone(),

    body('password', "password must be atlest 8 characters ").isLength({ min: 8 }),
    // body('userimage', "User image is required").notEmpty(),
    checkerrorCreateUser, CreateUser)



//  Login User 
router.post('/login', LoginUser)

// User Logout
router.get('/logout', UserAuthenticate, LogOutUser)

// this root check user login or not   ( Authentication is required)
router.get('/check/login', UserAuthenticate, CheckLoginUser)


//    Send otp 
router.post('/forgetpassword/sendcode',
    ForgetPassword_SendOtpInEmail)



//   Reciving otp 
router.post('/forgetpassword/resiveotp', AccessOtp)



// Finnaly Forget Password 
router.put('/forgetpassword',
    body('password', "password must be atlest 8 characters ").isLength({ min: 8 }),
    checkerrorCreateUser, UpdatePassword)

//   Forgot Email id   (Find User )

// User will get his details    (Authentication is required)
router.get("/medetail", UserAuthenticate, MeDetails)

//  Change Password For LOgin User    ( Authentication is required)
router.put("/changepassword",
    body('NewPassword', "password must be atlest 8 characters ").isLength({ min: 8 }), checkerrorCreateUser, UserAuthenticate, ChangePasswordForLoginUer)


//  Update User Profile  ( Authentication is required)

router.put('/updateprofile',
    body("name", "Name requires less than 30 characters and more than 2 characters").isLength({ min: 2, max: 30 }),
    body("contact", "Enter a Valid Contact").isLength({ max: 10, min: 10 }).isMobilePhone(), checkerrorCreateUser, UserAuthenticate, UpdateProfile)


// Forget Email id   (Find User )
router.post('/forgetEmail/finduser', ForgotEmailIdFindUser)
//  Forget Email Id (Get new Email)
router.post('/forgetEmail/newemail', body('email', "Enter Your Valid Email").isEmail(), checkerrorCreateUser, ForgotEmailIdgetNewEmail
)
//   Change Email id 
router.post('/changeEmail/newemail', body('email', "Enter Your Valid Email").isEmail(), checkerrorCreateUser, UserAuthenticate, changeEmailId)


//  otp verify for Chage Email and forget email 
router.post('/otpverify/changeemailid', otpVerifyForChangeEmailAndForgetEamil)


router.delete('/deleteprofile', UserAuthenticate, DeleteProfile)


//  Product Routes -------------------------------------------------------------------------------------------------------------- 

//  Get Sample Products 
router.get('/getsampleProducts', GetSampleProducts)

// Get All Products  
router.get('/getallproduct', getAllProducts)

// Get Higest and Lowest Price Product  

router.get('/highest-lowestprice/product', GetHighest_And_Lowest_PRoductPrice)
export default router

//  Get Single Product   by Id  
router.get('/singleproduct/:id', GetSingleProduct)

// Create Reviews And Update Reviews  
router.post('/createreviews/product', UserAuthenticate, CreateReview)

//  Get Single Product All Reviews   
router.get("/getsingleproductreview/:id", GetAllReviewInSingleProduct)

//  router.post("/CheckExistStock",  CheckExistStock)
 
//  Order Routes  -------------------------------------------------------------------------------------------------------------------------------------------->

//  Create New Order 
router.post("/createneworder", UserAuthenticate, CreateNewOrder)

router.get('/getallProductname', GetAllProdductName)

//  Get Single Order 
router.get('/getsingleorder/:id', UserAuthenticate, getSingleOrder)

// User get All her Orders 
router.get('/meallorders', UserAuthenticate, getmeAllOrder)


// Payment Routes  -------------------------------------------------------------------------------------------------------------------------------------------->
router.post('/payment/process', UserAuthenticate, processPayment)
 
 
 
