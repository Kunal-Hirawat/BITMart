import productModel from "..\backendcontrollersproductController.js";
import fs from "fs";
import slugify from 'slugify'

export const productController = async (req, res) => {
  try {
    const { name, description, price, quantity, slug } = req.fields;
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
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo should be less than 1mb in size" });
    }

    const product =new productModel({name,description,price,quantity,slug:slugify(name)})

    if(photo){
        product.photo.data=fs.readFileSync(photo.path)
        product.contentType=photo.type
    }

    await product.save();
    res.status(201).send({
        success:true,
        message:'product successfully created'
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong. Please Try Again",
    });
  }
};

export const getProductController=async(req,res)=>{
    try {
        const products = await productModel.find({}).select("-photo").limit(12);
        res.status(200).send({
            success:true,
            productsCount:products.length,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting products'
        })
    }
};

export const getSingleProductController= async(req,res)=>{
    try {
        const product = await productModel.findOne({slug:req.fields.slug})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting the product'
        })
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
      res.status(500).send({
        success: false,
        message: "Error in fetching photo",
        error,
      });
    }
  };
