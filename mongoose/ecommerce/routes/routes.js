import {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/products_controllers.js'
import express from 'express'

const router = express.Router();

router.get('/', getProduct);
router.post('/', addProduct);
router.put('/', updateProduct);
router.delete('/', deleteProduct);

export default router;