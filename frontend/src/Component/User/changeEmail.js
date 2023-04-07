import React  ,{ useState ,useEffect} from 'react'
import './changeEmail.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import { useDispatch, useSelector } from 'react-redux'
 import {useNavigate} from 'react-router-dom'
 import Loader from '../Loader/loader'
 import Helmet from '../Helmet'
import {ChangeEmailClear} from '../../Constant/UserConstant'
 import { ChangeEmailAction , ChangeEmailOtpVerifyAction , GetMeDetails} from '../../action/UserAction'
 
 

  import { ClearAlert } from '../../Constant/AlertContant';
import { AlertAction } from '../../action/AlertAction';
export default function ChangeEmail() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, data } = useSelector((state) => {
        return state.ChangeEmail

    })





    const [alertdetails, setAlertDetails] = useState({ AlertType: "", AlertMessage: "" })
    const [showAlert, setShowAlert] = useState(null)
    const [containertranslate, SetContainerTranslate] = useState(false)
      const [dispatchuserdetails ,setDispatchuserdetails] =useState(false)
    const [newemailverify ,setNewEmailverify] =useState("")
    const [otpvalue, setOtpValue] = useState("")
     







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
                    dispatch({ type: ChangeEmailClear })

                } else {
                    setShowAlert(true)

                    setAlertDetails({ AlertType: "Error", AlertMessage: `${data.error}` })
                    if (data.goback == true) {
                        SetContainerTranslate(false)
  
                       
                        setOtpValue("")
                        setNewEmailverify("")
                    }

                    dispatch({ type: ChangeEmailClear })


                }

            }
            if (data.success === true) {

                setShowAlert(true)
                setAlertDetails({ AlertType: "Success", AlertMessage: `${data.message}` })

               
                          if(data.ChangeEmailOtpSend===true){
                          SetContainerTranslate(true)
                   }
          
      
                if(data.changeEmailId===true){
                    setOtpValue("")
                    setNewEmailverify("") 
                    setDispatchuserdetails(true)
                 
                   setTimeout(() => {
                         navigate("/profile")
                          }, 1000); 
                             }
 
                dispatch({ type: ChangeEmailClear })

            }
        }



    }, [dispatch, loading, data, showAlert,  navigate ,newemailverify,otpvalue])






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














     const OtpVerifyFunction =(e)=>{
         
        e.preventDefault()
        
          dispatch(ChangeEmailOtpVerifyAction({otp:otpvalue}))
          setShowAlert(false)
     }
 const ChangeEmailFunction =(e)=>{
    e.preventDefault()
   
     dispatch( ChangeEmailAction({email:newemailverify}))
   
  setShowAlert(false)
 }
      

  return (
    <>
   
   <Helmet title='MY Store --- Change_Email' />
     <div className="EmailChangeMainContainer">
  <div className="EmailChangeContainer"    style={{ transform: containertranslate === true ? "translateX(-100%)" : "translateX(50%)", opacity: containertranslate === true ? 0 : 1 }}>

 {
     loading===true  ? <Loader loading={'changeEmailLoading'}/> :   <form  className="changeEmailForm" onSubmit={ChangeEmailFunction}>

     <h2 className="changeEmailheading" >Change Email</h2>
     <div>
           
                                     <label htmlFor="changeEmail">  <MailOutlineIcon /></label>
                          <input type="email" id="changeEmail" placeholder='Enter Your new Email'  required value={newemailverify} onChange={(e) => {
                                         setNewEmailverify(e.target.value)
                                         setShowAlert(false)

                                     }} />



      </div>


              <button > Change Email </button>



    </form>

 }
      

        </div>



 {/* Change Email otp Verify  */}



        <div className='changeEmailotpverifyContainer'    style={{ transform: containertranslate === false ? "translateX(100%)" : "translateX(-50%)", opacity: containertranslate === false ? 0:   1 }}>


                        {


loading===true  ? <Loader loading={'changeEmailLoading'}/> : <form action="" className='changeEmailotpverify' onSubmit={OtpVerifyFunction}>
                                <div className='changeEmailotptext'>

                                    <p className='changeEmailresendotp' onClick={() => {
                                     
                                        setShowAlert(false)
                                        SetContainerTranslate(false)
                                    }}>Resend Otp</p>
                                   


                                   <p className='changeEmailotptime'>opt valid for 15 Minutes</p>

                                   
                                </div>


                                <div>
                                    <label htmlFor="changeEmailotpverify">< PinOutlinedIcon /> </label>
                                    <input type="number" id='changeEmailotpverify' placeholder='Enter Your Otp' required value={otpvalue} minLength={6} maxLength={6} onChange={(e) => {

                                        setShowAlert(false)
                                        if (e.target.value.length <= 6) {

                                            setOtpValue(e.target.value)
                                        }
                                    }} />











                                </div>
                                <button  > Otp Verify </button>
                            </form>
                        }


                    </div>











     </div>
  

 


    </>
  )
}
 