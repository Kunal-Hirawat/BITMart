import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, slug, email, contact } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo || photo.size > 1000000:
        return res
          .status(500)
          .send({
            error: "Photo is required and should be less than 1mb in size",
          });
      case !contact:
        return res.status(500).send({ error: "Contact is Required" });
      case !email:
        return res.status(500).send({ error: "Email is Required" });
    }

    const product = new productModel({
      name,
      description,
      price,
      quantity,
      slug: slugify(name),
      email,
      contact,
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    return res.status(201).send({
      success: true,
      message: "product successfully created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something Went Wrong. Please Try Again",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).select("-photo").limit(12);
    return res.status(200).send({
      success: true,
      productsCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting products",
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    return res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting the product",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    return res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo || photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    return res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in Updating product",
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in searching product",
    });
  }
};

export const getUserProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({ email: req.params.email })
      .select("-photo");
    return res.status(200).send({
      success: true,
      productsCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting products",
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { radio } = req.body;
    const products = await productModel.find({
      price: { $gte: radio[0], $lte: radio[1] },
    });
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while applying filter",
      error,
    });
  }
};

//delete deleted user product controller
export const deletedUserProductController = async (req, res) => {
  try {
    await productModel.deleteMany({ email: req.params.email });
    return res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
