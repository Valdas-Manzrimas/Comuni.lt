const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

const checkProductAuthorization = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).exec();

    if (!product) {
      return res.status(404).send({ message: 'Product not found.' });
    }

    const currentUser = await User.findById(req.userId).exec();

    if (!currentUser) {
      return res.status(401).send({ message: 'Unauthorized.' });
    }

    if (
      currentUser.roles.includes('moderator') ||
      product.createdBy.equals(currentUser._id)
    ) {
      return next();
    }

    return res.status(403).send({ message: 'Forbidden.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Routes for product controller functions
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:productId', productController.getProductById);
router.put(
  '/:productId',
  checkProductAuthorization,
  productController.updateProduct
);
router.delete(
  '/:productId',
  checkProductAuthorization,
  productController.deleteProduct
);

module.exports = router;
