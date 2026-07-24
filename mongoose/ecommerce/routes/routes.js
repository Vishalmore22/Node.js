import {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/products_controllers.js'
import { signin, signup } from "../controllers/auth_controllers.js";
import express from 'express'
import { signinValidation, validateToken } from '../middlewares/middleware.js';

const router = express.Router();

router.get('/', validateToken, getProduct);
router.post('/', validateToken, addProduct);
router.put('/', validateToken, updateProduct);
router.delete('/', validateToken, deleteProduct);

router.post("/signin", signinValidation, signin);
router.post("/signup", signup)

export default router;