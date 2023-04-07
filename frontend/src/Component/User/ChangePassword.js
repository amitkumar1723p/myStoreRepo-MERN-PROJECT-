import React ,{useState ,useEffect} from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
 import  {AlertAction} from '../../action/AlertAction'
 import  {ChangePasswordAction} from '../../action/UserAction'
 import { ClearAlert } from '../../Constant/AlertContant';
  import { ChangePasswordClear} from '../../Constant/UserConstant'
  import {useDispatch ,useSelector} from 'react-redux'
   import {useNavigate} from 'react-router-dom'
   import Loader from '../Loader/loader'
   import Helmet from '../Helmet'
 import './changepassword.css'
export default function ChangePassword() {
    

    const  dispatch =useDispatch()
     const navigate =useNavigate()

 const {loading ,data} = useSelector((state)=>{
  return state.ChangePassword

 })



     const [oldpassswordtype,setOldPasswordtype] =useState("password")
     const [newpasswordtype ,setNewPasswordtype] =useState("password")
    const  [confrimpasswordtype ,setconfrimpasswordtype] =useState("password")
    const [showAlert, setShowAlert] = useState(null)
    const [alertdetails, setAlertDetails] = useState({ AlertType: "", AlertMessage: "" })
    const [oldpassswordshow,setOldPasswordShow] =useState(false)
    const [newpasswordshow ,setNewPasswordShow] =useState(false)
   const  [confrimpasswordshow ,setConfrimPasswordShow] =useState(false)
    const [passwords ,setPasswords] =useState({ NewPassword:"" ,oldPassword:"" ,confrimPassword:""})
        
 
 
 
   
      
      


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
                    dispatch({ type:  ChangePasswordClear })

                } else {
                    setShowAlert(true)

                    setAlertDetails({ AlertType: "Error", AlertMessage: `${data.error}` })



           
                    dispatch({ type:  ChangePasswordClear })


                }

            }
            if (data.success === true) {

                setShowAlert(true)
                setAlertDetails({ AlertType: "Success", AlertMessage: `${data.message}` })

           
      
 


     setTimeout(() => {
         navigate("/profile")
     }, 1000);
                       
                   

                        dispatch({ type:  ChangePasswordClear })
            }
        }



    }, [dispatch, loading, data, showAlert])

































useEffect(() => {


    if (showAlert === true) {
        dispatch(AlertAction(alertdetails.AlertType, alertdetails.AlertMessage, setShowAlert))
    }
    if (showAlert === false) {

        dispatch({ type: ClearAlert })
    }

}, [alertdetails, showAlert, setShowAlert])



 const ChangePasswordFunction =(e)=>{

  e.preventDefault()
 
      if(passwords.NewPassword!==passwords.confrimPassword) {

        setShowAlert(true)
         setAlertDetails({ AlertType: "Error", AlertMessage: "PasswordAndConfrimPassword is not Match" })

      }
       else{
         
         dispatch(ChangePasswordAction({oldPassword:passwords.oldPassword,NewPassword:passwords.confrimPassword}))
          setShowAlert(false)
       }


 }
 

        
    return (
        <>
        
        <Helmet title='MY Store --- Change_Password' />



     <div className="changepasswordContainer">

    { loading==true ? <Loader loading="changepasswordloading" /> :       <form  className="changepasswordform" onSubmit={ChangePasswordFunction}>


<h2 className="changepasswordheading">Change Password </h2>
<div>






     
                    <label htmlFor="oldpassword">  <LockOpenIcon />   </label>
                    <input type={oldpassswordtype } value={passwords.oldPassword} id='oldpassword' placeholder='Enter Your Old Password'   onChange={(e) => {
                         
                         setShowAlert(false)
                          setPasswords({...passwords ,oldPassword:e.target.value})
                     
                    }} minLength={8} required />




                    <div className='oldpassword_show-hidepassword' onClick={() => {

                        if (oldpassswordshow === false) {

                            setOldPasswordShow(true)
                            setOldPasswordtype('text')
                        }
                        else {
                            setOldPasswordShow(false)
                            setOldPasswordtype('password')
                        }
                    }}>
                        {oldpassswordshow === true ? <VisibilityOutlinedIcon /> : < VisibilityOffOutlinedIcon />}

                 </div>



</div>
{/* ----------------------------------------------------------------------------------------- */}
           











<div>






     
<label htmlFor="changenewpassword">  <LockOpenIcon />   </label>
<input type={newpasswordtype } id='changenewpassword' placeholder='Enter Your New Password' value={passwords.NewPassword}   onChange={(e) => {

setShowAlert(false)
setPasswords({...passwords ,NewPassword:e.target.value})


}}  required minLength={8} />

{/* minLength={8} */}


<div className='changenewpassword_show-hidepassword' onClick={() => {

if (newpasswordshow === false) {

setNewPasswordShow(true)
setNewPasswordtype('text')
}
else {
setNewPasswordShow(false)
setNewPasswordtype('password')
}
}}>
{newpasswordshow === true ? <VisibilityOutlinedIcon /> : < VisibilityOffOutlinedIcon />}

</div>



</div>

 













       <div>


     
<label htmlFor="changeconfrimpassword">  <LockOpenIcon />   </label>
<input type={confrimpasswordtype  } id='changeconfrimpassword' value={passwords.confrimPassword} placeholder='Enter Your Cofrim Password '   onChange={(e) => {

setShowAlert(false)


setPasswords({...passwords ,confrimPassword:e.target.value})


}}  required  minLength={8} />
{/* minLength={8} */}



<div className='changeconfrimpassword_show-hidepassword' onClick={() => {

if (confrimpasswordshow === false) {

setConfrimPasswordShow(true)
setconfrimpasswordtype('text')
}
else {
setConfrimPasswordShow(false)
setconfrimpasswordtype('password')
}
}}>
{confrimpasswordshow === true ? <VisibilityOutlinedIcon /> : < VisibilityOffOutlinedIcon />}

</div>



</div>



  



<button>Change Password </button>

</form>  }
       
          

     </div>
             
        </>
    )
}
