
import { ShowAlert, ClearAlert } from "../Constant/AlertContant"

//  Forgot Email Reducer 
export const ShowAlertReducer = (state = {}, action) => {


    switch (action.type) {

        case ShowAlert:
            return {
                ...state,
                showAlert: action.payload
            }
        case ClearAlert:
            return {}

        default:
            return {
                ...state
            }
    }
}
