import LostfoundModel from "../models/lostfoundModel.js";
import fs from "fs";
import slugify from "slugify";

export const createLostfoundController = async (req, res) => {
  try {
    const { name, description, location, datetime, slug, email, contact } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !location:
        return res.status(500).send({ error: "Location is Required" });
      case !datetime:
        return res.status(500).send({ error: "Date and Time is Required" });
      case !photo || photo.size > 1000000:
        return res
          .status(500)
          .send({
            error: "Photo is required and it should be less than 1mb in size",
          });
      case !contact:
        return res.status(500).send({ error: "Contact is Required" });
      case !email:
        return res.status(500).send({ error: "Email is Required" });
    }

    const product = new LostfoundModel({
      name,
      description,
      location,
      datetime,
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
      message: "Lost Found successfully created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something Went Wrong. Please Try Again",
    });
  }
};

export const getSingleLostfoundController = async (req, res) => {
  try {
    const product = await LostfoundModel.findById(req.params.pid);
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

export const getLostfoundController = async (req, res) => {
  try {
    const products = await LostfoundModel.find({}).select("-photo").limit(12);
    return res.status(200).send({
      success: true,
      productsCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting items",
    });
  }
};

export const lostfoundPhotoController = async (req, res) => {
  try {
    const product = await LostfoundModel.findById(req.params.pid).select(
      "photo"
    );
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

export const deleteLostfoundController = async (req, res) => {
  try {
    await LostfoundModel.findByIdAndDelete(req.params.pid).select("-photo");
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

export const updateLostfoundController = async (req, res) => {
  try {
    const { name, description, location, datetime } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !location:
        return res.status(500).send({ error: "Location is Required" });
      case !datetime:
        return res.status(500).send({ error: "Date and Time is Required" });
      case !photo || photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and it should be less then 1mb" });
    }

    const products = await LostfoundModel.findByIdAndUpdate(
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
      message: "Item Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in Updating item",
    });
  }
};

export const searchLostfoundController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await LostfoundModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
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

export const getUserLostfoundController = async (req, res) => {
  try {
    const products = await LostfoundModel.find({
      email: req.params.email,
    }).select("-photo");
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

export const lostfoundFilterController = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const products = await LostfoundModel.find({
      datetime: { $gte: startDate, $lte: endDate },
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

export const deletedUserLostFoundController = async (req, res) => {
  try {
    await LostfoundModel.deleteMany({ email: req.params.email });
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
