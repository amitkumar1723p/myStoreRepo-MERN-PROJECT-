import { body, validationResult, check } from 'express-validator';

//  Check Error for Create User  
export const checkerrorCreateUser = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, fielderrors: errors.array() });
    }
    else {

        next()
    }


}

