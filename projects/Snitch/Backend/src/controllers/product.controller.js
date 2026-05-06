import { uploadFile } from "../services/storage.service.js";
import productModel from "../models/product.model.js";

export async function createProduct(req, res) {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "INR",
    },
    images,
    seller: seller._id,
  });

  res.status(201).json({
    message: "Product created successfully",
    success: true,
    product,
  });
}

export async function getSellerProducts(req, res) {
  const seller = req.user;

  const products = await productModel.find({ seller: seller._id });

  res.status(200).json({
    success: true,
    message: "Products fetched successfully.",
    products,
  });
}

export async function getAllProducts(req, res) {
  const products = await productModel.find();

  res.status(200).json({
    success: true,
    message: "Product fetched successfully.",
    products,
  });
}

export async function getProductById(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "Product details successfully.",
    product,
  });
}

export async function addProductVariants(req, res) {
  const { id } = req.params;

  const product = await productModel.findOne({
    _id: id,
    seller: req.user._id,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const files = req.files;
  const selectedImages = JSON.parse(req.body.selectedImages || "[]");
  const images = [...selectedImages];

  if (files && files.length !== 0) {
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const result = await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
        return result.url;
      }),
    );
    images.push(...uploadedImages);
  }

  const price = req.body.priceAmount;
  const stock = req.body.stock;
  const attributes = JSON.parse(req.body.attributes || "{}");
  const currency = req.body.priceCurrency || "INR";

  const variant = {
    images: images.map((url) => ({ url })),
    stock: Number(stock),
    attributes,
    price: {
      amount: Number(price),
      currency,
    },
  };

  product.variants.push(variant);
  await product.save();

  res.status(201).json({
    success: true,
    message: "Variant added successfully",
    variant,
  });
}

export async function updateProductVariant(req, res) {
  const { id, variantId } = req.params;
  const { stock, priceAmount, priceCurrency, attributes } = req.body;

  const product = await productModel.findOne({
    _id: id,
    seller: req.user._id,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const variant = product.variants.id(variantId);
  if (!variant) {
    return res.status(404).json({
      success: false,
      message: "Variant not found",
    });
  }

  if (stock !== undefined) variant.stock = Number(stock);
  if (priceAmount !== undefined) {
    variant.price.amount = Number(priceAmount);
    if (priceCurrency) variant.price.currency = priceCurrency;
  }
  if (attributes !== undefined)
    variant.attributes = JSON.parse(attributes || "{}");

  await product.save();

  res.status(200).json({
    success: true,
    message: "Variant updated successfully",
    variant,
  });
}

export async function deleteProductVariant(req, res) {
  const { id, variantId } = req.params;

  const product = await productModel.findOne({
    _id: id,
    seller: req.user._id,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const variant = product.variants.id(variantId);
  if (!variant) {
    return res.status(404).json({
      success: false,
      message: "Variant not found",
    });
  }

  product.variants.pull(variantId);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Variant deleted successfully",
  });
}
