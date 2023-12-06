
import { Router } from "express";
import { ActividadController } from "../controllers/actividadController.js";

const router = Router();

// Se utilizará para crear una nueva actividad en el grupo especificado.
router.post("/:claveGrupo/actividad", ActividadController.create);

// Ruta para obtener todas las actividades de un grupo
router.get("/:idGrupo/actividades", ActividadController.getAll);

// Ruta para obtener una actividad específica por su ID
router.get("/:idGrupo/actividad/:idActividad", ActividadController.getById);

// Ruta para actualizar una actividad existente
router.put("/:idGrupo/actividad/:idActividad", ActividadController.update);

// Ruta para eliminar una actividad existente
router.delete("/:idGrupo/actividad/:idActividad", ActividadController.delete);


export default router;
