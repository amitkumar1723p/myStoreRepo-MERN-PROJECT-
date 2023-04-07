import Stripe from 'stripe'
import { SendError } from '../Utils/error.js'
  
//   PRocess Payment Controller 
  
export const processPayment = async (req,res,next)=>{
   
try {
    const stripe =new Stripe (process.env.STRIPE_SECRET_KEY)

    const myPayment =await stripe.paymentIntents.create({
        amount:req.body.amount ,
        currency :"inr",
        metadata :{
            company:"MyStore"
        },
    })
     res.status(200).json({success:true,client_secret:myPayment.client_secret})
    }
     catch (error) {
     
        return SendError(res, 500, false, null, error)
     }
}


