import { Router } from "express";
import { ActividadController } from "../controllers/actividadController.js";

const router = Router();

// Se utilizará para crear una nueva actividad en el grupo especificado.
router.post("/:claveGrupo/actividad", ActividadController.create);

// Ruta para obtener todas las actividades de un grupo
router.get("/:claveGrupo/actividades", ActividadController.getAll);

// Ruta para obtener una actividad específica por su ID
router.get("/:clave/actividad/:idActividad", ActividadController.getById);

export default router;
