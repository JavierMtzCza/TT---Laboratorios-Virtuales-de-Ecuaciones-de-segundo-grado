import { Router } from "express";
import { rolController } from "../controllers/rolController.js";

const router = Router()

router.post('/', rolController.create )

export default router