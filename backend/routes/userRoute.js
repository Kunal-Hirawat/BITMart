import express from 'express'
import {registerContoller,
    loginController,
      updateProfileController,
     testController,
    forgotPasswordController,
    getSecurityQuestionController,
    checkSecurityAnswerController} from "../controllers/userController.js";

import { requireSignIn,isAdmin} from "../middlewares/authMiddleware.js";

const router=express.Router();
//checking
router.post("/register",registerContoller);

//forgot-password
router.post("/forgotPassword",forgotPasswordController);

//get security question
router.get("/getSecurityQuestion",getSecurityQuestionController)

//check security answer
router.post("/checkSecurityAnswer",checkSecurityAnswerController)

//login
router.post('/login',loginController);

//test routes
router.get('/test',requireSignIn,isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
  
  //protected Admin route auth
  router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;