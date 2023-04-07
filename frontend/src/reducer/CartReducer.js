import {
AddtoCartRequest   ,
AddtoCartSuccess ,
AddtoCartFail ,
CartClear ,
RemoveCartItem ,
SaveShippingInfo,
AllCartClear

} from '../Constant/CartConstant'

export const CartReducer=(state={ cartItems:[],shipping_Info:{} },action)=>{

    switch (action.type) {


  case AddtoCartRequest :
    return{
        ...state ,
        loading:true }


         
       case AddtoCartSuccess:
  const IsExist =state.cartItems.find((i)=>{
 
    return i.productId ===action.payload.productId
})
   
 if(IsExist){
    return {
        ...state,
        cartItems:state.cartItems.map((i)=>{
            return i.productId ===IsExist.productId ? action.payload:i
        }),
        loading:false,
        success:true 
        

    }
 }
  else{
    return{
        ...state,
        cartItems:[...state.cartItems,action.payload],
        loading:false,
        success:true

        
     }
  }
  case AddtoCartFail : 
  return {
 ...state ,
    loading:false ,
    success:false
  }
    
   case  CartClear :
     return {
         ...state ,
        success:undefined,
        RemoveCart:undefined
     }
      
      case RemoveCartItem : 
      return{
        ...state ,
       cartItems:state.cartItems.filter((i)=>{
         return(i.productId !== action.payload)
        

       }),
       RemoveCart:true

      }
       case SaveShippingInfo:
        return{
          ...state ,
          shipping_Info:action.payload ,
        }
    
         case  AllCartClear:
          return{
            cartItems:[],shipping_Info:{}
          }
        
       default: 
          return state ;
    }

}