import { Router } from "express";
import multer from "multer"

import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, getSellerProducts } from "../controllers/product.controller.js";
import { validateCreateProduct } from "../validator/product.validator.js";

const router = Router();


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fieldSize: 5 * 1024 * 1024 //5MB
    }
})

/**
 * @route POST /api/products
 * @description create a new product
 * @access private (seller only)
 */

router.post(
  "/",
  authenticateSeller,
  validateCreateProduct, upload.array("images", 7),
  createProduct,
);

/**
 * @route GET /api/products/seller
 * @description get all products of authentecated seller only
 * @access private (Seller only)
 */

router.get("/seller", authenticateSeller, getSellerProducts);




export default router;