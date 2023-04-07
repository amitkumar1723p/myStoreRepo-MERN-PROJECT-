import { SendError } from "../Utils/error.js"
export const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            let message = `Role: ${req.user.role} is not allowed to access this resource`
            return SendError(res, 403, false, message, null)
        }
 
        next()
    }
}
