import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { SendError } from '../Utils/error.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Createotp } from "../Utils/createotp.js";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true

    },
    contact: {
        type: Number,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        select: false
    },
    userimage: {
        public_id: {
            type: String,
            trim: true,

        },
        url: {
            type: String,
            trim: true,

        },
    },
    role: {
        type: String,
        trim: true,
        default: "user"
    },
    resetPasswordOtp: {
        type: String,
        trim: true
    },
    resetPasswordOtpExpire: {
        type: Date,
        trim: true

    },
    createdAt: {
        type: Date,
        trim: true,
        default: Date.now
    },
     lastUpdate:{
        type: Date 
       
     } ,
    emailVerify: {
        type: Boolean,
        default: false
    },
    AllfiledCreate: {
        type: Boolean,
        default: false
    },
    temporydata: {
        type: String,
        default: null

    }

})



//    Create  and Store Hash Password  in Database 
UserSchema.pre('save', async function (next) {

    if (this.isModified("password")) {

        this.password = await bcrypt.hash(this.password, 10,);

    }
    next()
})


//   Create a JsonWebToken 
UserSchema.methods.generateJwtToken = async function (res) {
    try {
        const jwtToken = await jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        return { jwtToken, success: true }
    }
    catch (error) {
        let err = error.message
        return { err, success: false }

    }
}

//   Match password  
UserSchema.methods.MatchPassword = async function (password) {

    try {
        const result = await bcrypt.compare(password, this.password)

        return { result, success: true }
    }
    catch (error) {
        let err = error.message
        return { err, success: false }

    }
}


// Save  Otp in database 
UserSchema.methods.SaveOtp = function (res) {



    let otp = Createotp()

    // Create a Otp Hash 
    const opthash = crypto.createHash('sha256', process.env.OTP_SECRET).update(otp).digest("hex")
    this.resetPasswordOtp = opthash
    // Set Token Expire for 15Minutes      // hour  * min *second * millisecond
    this.resetPasswordOtpExpire = Date.now() + 15 * 60 * 1000


    return otp;


}



const UserModel = mongoose.model("Users", UserSchema)


export default UserModel 
