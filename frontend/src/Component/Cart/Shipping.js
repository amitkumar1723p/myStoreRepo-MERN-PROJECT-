import React ,{ useState,useEffect}from 'react';
import CheckoutStep from './CheckoutStep';
import  './Shipping.css';
 import {useNavigate} from 'react-router-dom';
import {useSelector ,useDispatch} from 'react-redux' ;
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CallIcon from '@mui/icons-material/Call';
import PublicIcon from '@mui/icons-material/Public';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Country, State, City }  from 'country-state-city';
import {SaveShippingInfoAction} from '../../action/CartItemAction'
import Helmet from '../Helmet'

export default function Shipping() {

  const {cartItems,shipping_Info} = useSelector((state)=>{
      return state.Cart ;
   })
    

   const dispatch =useDispatch()
   const navigate =useNavigate()
 
  
 const [ShippingInfo,setShippingInfo] =useState({state:"",country:"",city:"",address:"",pinCode:"",contact:""})
 
 useEffect(()=>{
   if(shipping_Info){
      
       if(shipping_Info.state){
        setShippingInfo({state:shipping_Info.state,country:shipping_Info.country,city:shipping_Info.city,address:shipping_Info.address,pinCode:shipping_Info.pinCode,contact:shipping_Info.contact})
        
       }
       
     
      
      }

 } ,[shipping_Info])

   

  const ShippingInfromation =(e)=>{
     e.preventDefault()

      dispatch(SaveShippingInfoAction(ShippingInfo))
      navigate('/confrim/order')
      
  
  }


   

  return (
    <>
<Helmet title='MY Store --- Shipping Info ' />
{
           cartItems.length>0 ?  
     <div className="shippingMain">
 <CheckoutStep   shippingIocnColor={"blue"} confrimOrderIconColor={"black"}  paymentIconColor={"black"}/>
  
      





   
 <div className='ShipingdetailsContainer'  >
                                
                                
                                    
                                    <h2>  Shipping Information </h2>
                                    <form className='Shipingdetailform' onSubmit={ShippingInfromation} >
                                            <div>
                                                <label htmlFor="Addresh" >
                                                    
                                                   <HomeIcon />

                                                </label>
                                                <input type="text" id="Addresh" required value={ShippingInfo.address} placeholder='Addresh' required    onChange={(e)=>{
                                                   setShippingInfo({...ShippingInfo ,  address:e.target.value})
                                                  
                                                }}/>
                                            </div>

                                            <div>
                                                <label htmlFor="City" >
                                                   <LocationCityIcon/>

                                                </label>
                                                <input type="text" id="City" required placeholder="City" value={ShippingInfo.city}  onChange={(e)=>{
                                                   setShippingInfo({...ShippingInfo ,city:e.target.value})
                                                  
                                                }}   />
                                            </div>

                                            <div>
                                                <label htmlFor="PinCode" >
                                                    <PinDropIcon />


                                                </label>
                                                <input type='number' required id="PinCode" placeholder='PinCode' value={ShippingInfo.pinCode}    onChange={(e)=>{
                                                   setShippingInfo({...ShippingInfo ,pinCode:e.target.value})
                                                  
                                                }} />
                                            </div>



                                            <div>
                                                <label htmlFor="Shippingcontact" >
                                                <CallIcon />

                                                </label>
                                                <input type="number"  required id="ShippingContact" placeholder='Contact' required  value={ShippingInfo.contact} onChange={(e)=>{
                                                     
                                                     
                                                     if (e.target.value.length <= 10) {
                                                      setShippingInfo({ ...ShippingInfo, contact: e.target.value })

                                                  }
                                                  
                                                }}  />
                                               
                                            </div>
                                             <div>
                                                <label htmlFor="country">
 <PublicIcon />
                                                </label>
                                                <select  required  value={ShippingInfo.country} onChange={(e)=>{
                         setShippingInfo({...ShippingInfo ,country:e.target.value})  

                                                }}>
                                                <option value="">Country</option>
                                                    {
                                                       Country.getAllCountries().map((item ,index)=>{
                                                         
                                                          return  (<option key={index} value={item.isoCode}>{item.name}</option>)
                                                       })   
                                                    }    
                                                    
                                                       
                                                </select>
                                             </div>
                                              



                                  {
                                  ShippingInfo.country&&  <div>
                                    <label htmlFor="state">
                                    <ApartmentIcon />
                                    </label>
                                    <select  value={ShippingInfo.state} required onChange={(e)=>{setShippingInfo({...ShippingInfo,state:e.target.value}) }}>
                                         <option value="">State</option>
                                          {
                                            State.getStatesOfCountry( ShippingInfo.country).map((item,index)=>{
                                                
                                            
                                               
                                        return( <option value={item.isoCode} key={index}>{item.name}</option>)
                                
                                        
                                                
                                            })
                                          }  
                                          
                                    </select> 
                                 </div>
                                  }            



                                            <button  >  Submit   </button>
                                        </form>
                                    
                              

   
                            </div>









 








      </div>







      :    <div className="NoItemToCart">
      <RemoveShoppingCartIcon  className="notitemtocartIcons"/>
     <h3> No Product In Your Cart </h3>
      <Link to="/Products"> <button className="noItemtocartButton" >View Products </button></Link>
       
    </div>
      
      
      
      }
    </>
  )
}
