const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authtorizePermissions,
} = require("../middleware/authentication");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controller/productController");

const { getSingleProductReviews } = require("../controller/reviewController");

router
  .route("/")
  .post([authenticateUser, authtorizePermissions("admin")], createProduct)
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post([authenticateUser, authtorizePermissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authtorizePermissions("admin")], updateProduct)
  .delete([authenticateUser, authtorizePermissions("admin")], deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
