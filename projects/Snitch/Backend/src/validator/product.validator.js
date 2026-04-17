import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateCreateProduct = [
  body("title")
    .notEmpty()
    .withMessage("Title is required for product creation")
    .isLength({ min: 6 })
    .withMessage("Title should be atleast 6 character long."),

  body("description").notEmpty().withMessage("Description is required."),
  body("priceAmount").isNumeric().withMessage("Price amount must be a number."),
  body("priceCurrency").notEmpty().withMessage("Price currency is required."),
  validateRequest,
];
