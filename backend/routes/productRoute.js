import express from "express";
import { createProductController , getProductController , getSingleProductController , productPhotoController  } from "../controllers/productController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable'

const router=express.Router();

//routes
router.post("/create-product", requireSignIn,formidable(), createProductController);


//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);




export default router;