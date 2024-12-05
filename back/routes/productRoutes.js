
const {Router} = require('express')
const { registerProduct, viewProducts, editProduct, deleteProduct } = require('../controller/productController')
const upload = require('../middleware/multer')
const router = Router()


router.route('/registerProduct').post(upload.array('files'),registerProduct)
router.route('/viewProducts').get(viewProducts)
router.route('/product/:id').put(upload.array('files'),editProduct).delete(deleteProduct)

module.exports = router