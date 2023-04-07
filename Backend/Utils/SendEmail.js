
import nodeMailer from 'nodemailer'
export const SendEamil = async (email, subject, html) => {
    try {

        //   Send Eamil 

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
            to: email,
            subject: subject,
            html: html

        }

        let result = await transporter.sendMail(mailOptions)


        if (!result) {
            let resolve = false
            return { resolve }

        }
        let resolve = true
        return resolve

    }
    catch (error) {
        let resolve = false
        return { resolve, err: error.message }


    }
}