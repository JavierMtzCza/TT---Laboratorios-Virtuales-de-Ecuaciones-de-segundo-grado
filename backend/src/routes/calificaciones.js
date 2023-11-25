import { Router } from "express";
import { CalificacionesActividadController } from "../controllers/calificacionesController.js";

const router = Router();

// Crear una nueva calificación de actividad
router.post("/", CalificacionesActividadController.create);

// Obtener calificación de actividad por usuario y actividad
router.get("/usuario/:usuarioId/actividad/:actividadId", CalificacionesActividadController.getByIds);

// Actualizar calificación de actividad
router.put("/usuario/:usuarioId/actividad/:actividadId", CalificacionesActividadController.update);

// Eliminar calificación de actividad
router.delete("/usuario/:usuarioId/actividad/:actividadId", CalificacionesActividadController.delete);

// Obtener calificaciones de actividad por actividad
router.get("/actividad/:actividadId", CalificacionesActividadController.getByActividadId);

// Obtener calificaciones de actividad por usuario
router.get("/usuario/:usuarioId", CalificacionesActividadController.getByUsuarioId);

export default router;
