import { Router } from "express";
import { PreguntaEjercicioController } from "../controllers/preguntaController.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = Router()

// Crear una nueva pregunta de ejercicio
router.post("/:actividadId", upload.single('multimedia'), PreguntaEjercicioController.create);

// Obtener una pregunta de ejercicio por ID
router.get("/:idPreguntaEjercicio", PreguntaEjercicioController.getById);

// Actualizar una pregunta de ejercicio por ID
router.put("/:idPreguntaEjercicio", PreguntaEjercicioController.update);

// Eliminar una pregunta de ejercicio por ID
router.delete("/:idPreguntaEjercicio", PreguntaEjercicioController.delete);

// Obtener la actividad asociada a una pregunta de ejercicio por ID
router.get("/:idPreguntaEjercicio/actividad", PreguntaEjercicioController.getActividadByPreguntaEjercicio);

export default router;
