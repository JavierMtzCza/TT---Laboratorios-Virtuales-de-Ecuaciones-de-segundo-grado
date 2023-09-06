import { Router } from "express";
import multer from "multer";
import { laboratorioController } from "../controllers/laboratorioController.js";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = Router()

//Crear laboratorios
router.post("/", upload.single('imagen'), laboratorioController.create)

//Listar laboratorios
router.get("/", laboratorioController.getAll)

export default router