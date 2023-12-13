// opcionCuestionarioRoutes.js
import { Router } from "express";
import { OpcionCuestionarioController } from "../controllers/opcioncuesController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

// Crear una nueva opción de cuestionario
router.post("/:preguntaCuestionarioId", upload.single('multimedia'), OpcionCuestionarioController.create);

// Obtener una opción de cuestionario por ID
router.get("/:opcionCuestionarioId", OpcionCuestionarioController.getById);

//Obtener todas las opciones de una pregunta 
router.get("/pregunta/:preguntaCuestionarioId", OpcionCuestionarioController.getAllByPregunta);

// Actualizar una opción de cuestionario por ID
router.put("/:opcionCuestionarioId", upload.single('multimedia'), OpcionCuestionarioController.update);

// Eliminar una opción de cuestionario por ID
router.delete("/:opcionCuestionarioId", OpcionCuestionarioController.delete);

export default router;



