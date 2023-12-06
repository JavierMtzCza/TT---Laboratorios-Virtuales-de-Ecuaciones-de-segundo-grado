import { Router } from "express";
import { ActividadController } from "../controllers/ActividadController.js";

const router = Router();

// Crear Actividad
router.post('/:claveGrupo/crearActividad',  ActividadController.create);

// Obtener actividades por clave del grupo
router.get('/:claveGrupo/actividades',  ActividadController.obtenerActividadesPorClaveGrupo);

// Obtener actividad por ID
router.get('/actividad/:actividadId/:claveGrupo', ActividadController.getById);

// Actualizar Actividad
router.patch('/actividad/:actividadId', ActividadController.update);

// Eliminar Actividad por Clave del Grupo
router.delete('/:claveGrupo/actividad/:actividadId', ActividadController.delete);

export default router;
