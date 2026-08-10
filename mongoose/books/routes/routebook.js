import express from "express"
import { addbook, deletebook, getbook, updatebook } from "../controllers/bookcontrol.js";
import { adduser, sighin } from "../controllers/usercontrol.js";

const router = express.Router();

router.post("/addbook", addbook);
router.get("/get", getbook);
router.put("/update", updatebook);
router.delete("/delete/:id", deletebook);
router.post("/adduser", adduser);
router.post("/signin", sighin);


export default router;