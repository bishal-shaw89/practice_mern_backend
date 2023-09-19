const express = require("express");
const { check } = require("express-validator");
const validationMiddleware = require("../middleware/validationMiddleware");
const authController = require("../controller/authController");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validationMiddleware.validate,
  authController.register
);

module.exports = router;
