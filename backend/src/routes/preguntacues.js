import { Router } from "express";
import { PreguntaCuestionarioController } from "../controllers/preguntacuesController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

// Crear una nueva pregunta de ejercicio
router.post("/:actividadId", upload.single('multimedia'), PreguntaCuestionarioController.create);

// Obtener una pregunta de ejercicio por ID
router.get("/:idPreguntaEjercicio", PreguntaCuestionarioController.getById);

// Actualizar una pregunta de ejercicio por ID
router.put("/:idPreguntaEjercicio", upload.single('multimedia'), PreguntaCuestionarioController.update);

// Eliminar una pregunta de ejercicio por ID
router.delete("/:idPreguntaEjercicio", PreguntaCuestionarioController.delete);

// Obtener la actividad asociada a una pregunta de ejercicio por ID
//router.get("/:idPreguntaEjercicio/actividad", PreguntaCuestionarioController.getActividadByPreguntaCuestionario);

export default router;
