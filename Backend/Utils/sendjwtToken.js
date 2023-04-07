
import { SendError } from "./error.js"
import { SendEamil } from '../Utils/SendEmail.js'
import UserModel from "../Model/UserModel.js"
import cloudinary from "cloudinary"

//   Send Jwt 

export const sendJWT = async (res, UserDocument, run) => {

    const { success, jwtToken: token, err } = await UserDocument.generateJwtToken(res)


    if (success == false) {
        let message = `User not Created This region (${err})}`
        return SendError(res, 500, false, message, null)
    }




    const option = { expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000) }
    res.cookie('token', token, option)





    // User Crated   Send success Email 
    if (run == true) {
        const json = {
            success: true, message: "User Register Successfully", token, IsAuthenticated: true
        }

        const subject = `User Created Successfully`
        const html = `
        <div>
        <h3 > Welcome To My Store </h3>
        
        </div>
        `

        let { resolve, err } = await SendEamil(UserDocument.email, subject, html)

        if (resolve == false) {

            if (err) {
                let message = `Try Again User not Create  This Region ${err}`
                return SendError(res, 500, false, message, null)
            }
            let message = `User not Created`
            return SendError(res, 500, false, message, null)

        }
        UserDocument.AllfiledCreate = true
        let user = await UserDocument.save()

        if (!user) {
            let message = "User Not Created"

            if (UserDocument.userimage.public_id) {
                await cloudinary.v2.uploader.destroy(UserDocument.userimage.public_id)



            }
            return SendError(res, 500, false, message, null)
        }

        return res.status(200).json({ message: `User Created Successfully`, success: true, userCreated: true })


    } else {
        const json = {
            success: true, message: "Login SucessFully", login: true
        }
        res.status(200).json(json)

    }

}





