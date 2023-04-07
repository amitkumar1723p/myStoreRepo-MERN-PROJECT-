import { 
AddtoCartRequest   ,
AddtoCartSuccess ,
AddtoCartFail ,
RemoveCartItem ,
SaveShippingInfo,

} from '../Constant/CartConstant'
 import axios from 'axios'


 export const AddtoCartAction =(productId,ProductQuantity)=>{
    return async (dispatch ,getState)=>{ 
     try{


          dispatch({type:AddtoCartRequest})


        const config = {
            headers: { "Content-Type": "application/json" },
              withCredentials: true }
 

        const { data } = await axios.get(`/user/singleproduct/${productId}`, config)  
  
         let cartData ={
            productId:  data.findproduct._id ,
            name:data.findproduct.name ,
            price:data.findproduct.price,
           image:data.findproduct.images[0].url ,
           stock :data.findproduct.stock,
           Quantity : ProductQuantity
              
         }
           
    
         dispatch({
            type:AddtoCartSuccess ,
            payload: cartData
         })
        
         
         localStorage.setItem("cartItems" , JSON.stringify(getState().Cart.cartItems))
       
     }
      catch(error){
      
 dispatch({type:AddtoCartFail})
          
      }
    }
}

  // Remove Cart Action 

export const RemoveCartAction =(productId) =>{
  return async (dispatch ,getState)=>{ 
    dispatch({
      type: RemoveCartItem,
      payload: productId 
  })
  localStorage.setItem("cartItems" , JSON.stringify(getState().Cart.cartItems))

   }
}

//  Save Shipping Info 
 export const SaveShippingInfoAction =(data)=>{
   
   return async (dispatch)=>{
     localStorage.setItem('shippingInfo' ,JSON.stringify(data))
      
    dispatch({type:SaveShippingInfo,payload:data})
      
  }
 }


 