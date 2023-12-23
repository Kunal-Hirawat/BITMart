import express from 'express'
import {userController} from "../controllers/userController.js";

const router=express.Router();
//checking
router.post("/register",userController);
//
export default router;