import express from "express";
import { createProductController , getProductController , 
    getSingleProductController , productPhotoController,
    updateProductController,deleteProductController  } from "../controllers/productController.js";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable'

const router=express.Router();

//routes
router.post("/create-product", requireSignIn,formidable(), createProductController);

//routes
router.put("/update-product/:pid", requireSignIn,isAdmin ,formidable(),updateProductController);  

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);


export default router;