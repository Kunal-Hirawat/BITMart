import express from 'express'
import {registerContoller} from "../controllers/userController.js";

const router=express.Router();
//checking
router.post("/register",registerContoller);
//
export default router;