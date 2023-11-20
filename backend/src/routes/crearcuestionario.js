import express from "express";
import { preguntacuesController } from "../controllers/preguntacuesController.js";

const router = express.Router();

router.post("/", preguntacuesController);

export default router;
