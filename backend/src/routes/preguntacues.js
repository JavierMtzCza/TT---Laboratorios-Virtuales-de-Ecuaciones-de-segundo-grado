import { Router } from "express";
import { PreguntaCuestionarioController } from "../controllers/preguntacuesController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();


// Crear una nueva pregunta de cuestionario
router.post("/:actividadId", upload.single('multimedia'), PreguntaCuestionarioController.create);

// Para crear varias preguntas en lote
router.post("/batch/:actividadId", upload.single('multimedia'), PreguntaCuestionarioController.createBatch);

// Obtener una pregunta de cuestionario por ID
router.get("/:idPreguntaCuestionario", PreguntaCuestionarioController.getById);

// Obtener todas las preguntas asociadas a una actividad con sus opciones
router.get("/actividad/:actividadId/preguntas", PreguntaCuestionarioController.getAllByActividad);

// Actualizar una pregunta de cuestionario por ID
router.put("/:idPreguntaCuestionario", upload.single('multimedia'), PreguntaCuestionarioController.update);

// Eliminar una pregunta de cuestionario por ID con todas sus opciones relacionadas
router.delete("/:idPreguntaCuestionario", PreguntaCuestionarioController.delete);

export default router;

