import { uploadFile } from "../services/storage.service.js";
import productModel from "../models/product.model.js"


export async function createProduct(req, res) {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;


    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
    }))

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: priceAmount,
        currency: priceCurrency || "INR"
      },
      images,
      seller: seller._id,
    });

    res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })

}

export async function  getSellerProducts(req, res) {
  const seller = req.user;

  const products = await productModel.find({ seller: seller._id });


  res.status(200).json({
    success: true,
    message: "Products fetched successfully.",
    products,
  })
}

export async function getAllProducts(req, res) {
  const products = await productModel.find();

  res.status(200).json({
    success: true,
    message: "Product fetched successfully.",
    products,
  })
}

export async function getProductById(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id)
  res.status(200).json({
    success: true,
    message: "Product details successfully.",
    product
  })
}