
import UserModel from '../Model/UserMode.js'
import nodeMailer from 'nodeMailer'
import { SendError } from './error.js'


//   Email Send After Register User Sucessfully
export const SendSucessEmail = async (res, status, json, user) => {

    try {
        const transporter = nodeMailer.createTransport({


            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            service: process.env.SMPT_SERVICE,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_MAIL_PASSWORD
            }


        })
        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: user.email,
            subject: "Success Message User Created",
            html: "<b> Welcome To MyEcommerce Store <b>"
        }
        let result = await transporter.sendMail(mailOptions)

        if (!result) {

            // Cloudnary Delete Will be later for create User
            let message = "User not Registered"
            return SendError(res, 409, false, message, null)
        }

        //  Send response 
        let finduser = await user.save()
        if (!finduser) {
            let message = "User not Registered"
            return SendError(res, 409, false, message, null)
        }
        return res.status(status).json(json)


    }
    catch (error) {


        return SendError(res, 500, false, error)



    }

}