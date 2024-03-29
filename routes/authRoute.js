import express from 'express';
import { registerController,loginController } from '../controller/authController.js';
 const router = express.Router();

 //routing
 //REGISTER || METHOD POST
 router.post('/register',registerController)

 //LOGIN || METHOD POST
 router.post('/login',loginController)

 export default router;