
import { ShowAlert } from "../Constant/AlertContant"
export const AlertAction = (AlertType, AlertMessage, show) => {
    return async (dispatch) => {
        dispatch({ type: ShowAlert, payload: { AlertType, AlertMessage, show } })

    }
}
