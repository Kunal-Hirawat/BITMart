import express from "express";
import {
  createLostfoundController,
  deleteLostfoundController,
  getLostfoundController,
  getSingleLostfoundController,
  getUserLostfoundController,
  lostfoundFilterController,
  lostfoundPhotoController,
  searchLostfoundController,
  updateLostfoundController,
} from "../controllers/lostfoundController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  formidable(),
  createLostfoundController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateLostfoundController
);

//get products
router.get("/get-product", getLostfoundController);

//single product
router.get("/get-product/:pid", getSingleLostfoundController);

//get photo
router.get("/product-photo/:pid", lostfoundPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteLostfoundController);

//search product
router.get("/search/:keyword", searchLostfoundController);

//get user product
router.get("/get-user-product/:email", getUserLostfoundController);

//product-filters
router.post("/product-filter", lostfoundFilterController);

//delete deleted user's product
router.delete("/deleted-user-product/:email", deleteLostfoundController);

export default router;
