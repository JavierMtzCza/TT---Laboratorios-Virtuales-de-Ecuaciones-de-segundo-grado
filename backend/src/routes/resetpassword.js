import express from "express";
import { resetpasswordController } from "../controllers/resetpasswordController.js";

const router = express.Router();

router.post("/resetpassword", resetpasswordController);

export default router;

