import {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/products_controllers.js'
import { signin, signup } from "../controllers/auth_controllers.js";
import express from 'express'
import { signinValidation } from '../middlewares/middleware.js';

const router = express.Router();

router.get('/', getProduct);
router.post('/', addProduct);
router.put('/', updateProduct);
router.delete('/', deleteProduct);

router.post("/signin", signinValidation, signin);
router.post("/signup", signup)

export default router;