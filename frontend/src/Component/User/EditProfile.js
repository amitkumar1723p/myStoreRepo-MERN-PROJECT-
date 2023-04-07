 
import React  ,{useState ,useEffect}from 'react'
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import FaceIcon from '@mui/icons-material/Face'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import './EditProfile.css'
     import { useSelector  ,useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
  import Loader from '../Loader/loader'
    import Helmet from '../Helmet'
     import userimage from '../../images/loginicon.png'
      import {UpdateProfileClear} from '../../Constant/UserConstant'
       import {EditProfileAction ,GetMeDetails} from '../../action/UserAction'
        import {ClearAlert} from '../../Constant/AlertContant'
         import {AlertAction} from '../../action/AlertAction'
export default function EditProfile() {


const [userDetails, setUserDetails] = useState({ name: "", contact: "", userimage: "" })
const [alertdetails, setAlertDetails] = useState({ AlertType: "", AlertMessage: "" })
 const [userImage ,setUserImage] =useState(userimage)
 const [dispatchuserdetails ,setDispatchuserdetails] =useState(false)
const [showAlert, setShowAlert] = useState(null)


 const dispatch = useDispatch() 
  const navigate =useNavigate()
   
         const { userdata } = useSelector((state) => {
             return state.meDetails
         })
      
         const { loading, data } = useSelector((state) => {
            return state.EditProfile
    
        })
    
 
          useEffect(()=>{

             if(userdata){
                
                 if(userDetails.userimage===""){

                     setUserImage(userdata.user.userimage.url)

                     
                 }
       setUserDetails({...userDetails ,name:userdata.user.name ,contact:userdata.user.contact})
             }
          } ,[userdata])

          useEffect(() => {
            let errormessage = ''
    
            if (data) {
                if (data.success === false) {
                    if (data.fielderrors) {
                        data.fielderrors.forEach((item) => {
                            errormessage += `< ${item.msg} > `
    
    
                        })
                        setShowAlert(true)
    
    
                        setAlertDetails({ AlertType: "Error", AlertMessage: `${errormessage}` })
                        
                         if(userdata){
                            setUserImage(userdata.user.userimage.url)
                            setUserDetails({ ...userDetails, userimage: "" })
                         } else{
                            setUserImage(userimage)
                            setUserDetails({ ...userDetails, userimage: "" })
                         }
                       
                        dispatch({ type: UpdateProfileClear })
                    } else {
                        setShowAlert(true)
    
                        setAlertDetails({ AlertType: "Error", AlertMessage: `${data.error}` })
                       
                         if(userdata){
                            setUserImage(userdata.user.userimage.url)
                            setUserDetails({ ...userDetails, userimage: "" })
                         }
                          else{
                            setUserImage(userimage)
                            setUserDetails({ ...userDetails, userimage: "" })
                          }
                        dispatch({ type: UpdateProfileClear })
    
    
                    }
    
                }
                if (data.success === true) {
    
                    setShowAlert(true)
                    setAlertDetails({ AlertType: "Success", AlertMessage: `${data.message}` })
              
                    setDispatchuserdetails(true)
                       setUserDetails({ name: "", contact: "", userimage: "" })
                       
                        setTimeout(() => {
                               navigate("/profile")
                        }, 1000);
                          
                           
                                 }
     
                    dispatch({ type: UpdateProfileClear })
    
                 
            }
    
    
    
        }, [dispatch, loading, data, showAlert,  navigate ,userDetails ])









 

               
     

          const UpdateDocumentFunction =(e)=>{
            
            e.preventDefault()
              
              if(userDetails.userimage===""){
       
                dispatch(EditProfileAction({name:userDetails.name ,contact:userDetails.contact}))

              }
                else{
                     dispatch(EditProfileAction(userDetails))
  
                }
                    
                setShowAlert(false)
                   }



                   useEffect(() => {


                    if (showAlert === true) {
                        dispatch(AlertAction(alertdetails.AlertType, alertdetails.AlertMessage, setShowAlert))
                         
                         if(dispatchuserdetails===true){
                             dispatch(GetMeDetails())
            
                         }
                    }
                    if (showAlert === false) {
            
                        dispatch({ type: ClearAlert })
                    }
            
                }, [alertdetails, showAlert, setShowAlert ,dispatchuserdetails])

//  ,


 
  return (
    <>
 
 
 <Helmet title='MY Store --- Edit Pofile' />
          {!userdata && <Loader loading ={"protectedloader"}/> }
   
 { userdata&&     userdata.success===true &&     <div className='UpdateProfileContainer' >
                                
                                {
                                      loading===true   ?  <Loader loading={"updateprofileloading"} />:
                                     <>
                                    <h2> Update Profile </h2>
                                    <form className='UpdateProfileForm' onSubmit={UpdateDocumentFunction} encType="multipart/form-data">
                                            <div>
                                                <label htmlFor="UpdateProfilename"  >
                                                    <FaceIcon />

                                                </label>
                                                <input type="text" id="UpdateProfilename" placeholder='Enter Your Name' required value={userDetails.name} minLength={2} maxLength={30} onChange={(e) => {
                                                    setUserDetails({ ...userDetails, name: e.target.value })
                                                    setShowAlert(false)
                                                }} />
                                            </div>
{/* value={userdata.user.name} */}
                                          



                                            <div>
                                                <label htmlFor="UpdateProfilecontact"  >
                                                    <PhoneIphoneIcon />


                                                </label>
                                                <input type='number' id="UpdateProfilecontact" placeholder='Enter Your Contact' minLength={10} maxLength={10} required value={userDetails.contact} onChange={(e) => {


                                                    if (e.target.value.length <= 10) {
                                                        setUserDetails({ ...userDetails, contact: e.target.value })

                                                    }
                                                    setShowAlert(false)


                                                }} />
                                            </div>



                                          
                                            <div>
                                                <label htmlFor="UpdateProfileimage"   id='UpdateProfileimagelabel' >

                                                   
                                                    <img src={userImage} alt="" className="UpdateProfileimageicon" /> 

                                                </label>
                                                <input type="file" id="UpdateProfileimage"  accept="image/*" onChange={(e) => {
                                                    const reader = new FileReader();
                                                    if (e.target.files[0]) {
                                                        reader.readAsDataURL(e.target.files[0])

                                                     }
                                                    else {
                                                        setUserImage(userdata.user.userimage.url)
                                                        setUserDetails({ ...userDetails, userimage: "" })
                                                    }
                                                    setShowAlert(false)

                                                      reader.onload = () => {
                                                        if (reader.readyState === 2) {
                                                            setUserImage(reader.result)
                                                            setUserDetails({ ...userDetails, userimage: e.target.files[0] })
                                                           

                                                        }
                                                    }


                                                }} />

                                            </div>




                                            <button> Edit Profile </button>
                                        </form>
                                    
                                    </>

                                        
                                }


</div> }
 



    </>
  )
}
