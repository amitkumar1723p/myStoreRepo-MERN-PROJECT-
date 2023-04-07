import React from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';




import './CheckoutStep.css'
export default function CheckoutStep({shippingIocnColor,confrimOrderIconColor,paymentIconColor,}) {
  return (
    <>
      <div className="checkoutStep">
    
             <div className="shippingicon"> <LocalShippingIcon  className="checkoutIcon" style={{color:shippingIocnColor}} />
               {/* <span>Shipping Details</span> */}
             <p>Shipping Details </p>
           
             </div>
     
            <div className="confrimordericon">  <LibraryAddCheckIcon className="checkoutIcon" style={{color: confrimOrderIconColor}}  />
             
            <p> Confrim Order </p>
       
            </div>
            
              <div className="paymenticon"> <AccountBalanceIcon className="checkoutIcon" style={{color:paymentIconColor}} />
              <span> Payment </span>
               </div>
              
              
           
         
      </div>
    </>
  )
}
