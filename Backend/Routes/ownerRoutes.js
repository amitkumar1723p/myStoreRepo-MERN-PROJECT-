import express from 'express'
const router = express.Router()
import { UserAuthenticate } from '../MiddleWare/UserAuthenticate.js';
import { authorizeRoles } from '../MiddleWare/create admin and owner.js';
import { deleteUserandAdmin, UpdateUserRoleByOwner, CheckOwner } from '../Controller/admin and owner Controller.js';


// This  routes Available  For owner 
  
router.put('/updaterole/:id', UserAuthenticate, authorizeRoles('owner'), UpdateUserRoleByOwner)

// router.get('/CheckOwner', UserAuthenticate, authorizeRoles("owner"), CheckOwner)




export default router