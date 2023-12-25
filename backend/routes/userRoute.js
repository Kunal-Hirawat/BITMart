import express from 'express'
import {registerContoller,
    loginController,
     testController} from "../controllers/userController.js";

import { requireSignIn , isAdmin} from "../middlewares/authMiddleware.js";

const router=express.Router();
//checking
router.post("/register",registerContoller);

//login
router.post('/login',loginController);

//test routes
router.get('/test',requireSignIn,isAdmin, testController);

export default router;