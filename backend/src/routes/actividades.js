
import { Router } from "express";
import { ActividadController } from "../controllers/actividadController.js";

const router = Router();

// Ruta para obtener todas las actividades de un grupo
router.get("/:idGrupo/actividades", ActividadController.getAll);

// Ruta para obtener una actividad específica por su ID
router.get("/:idGrupo/actividad/:idActividad", ActividadController.getById);

// Obtener las calificaciones de una actividad
router.get("/calificaciones/:idGrupo", ActividadController.calificacionesGrupales);

// Obtener las calificaciones de una actividad
router.get("/calificacionesActividad/:idActividad", ActividadController.calificacionesActividad);

// Ruta para obtener una actividad específica por su ID para un usuario
router.get("/actividad/:idActividad/:idUsuario", ActividadController.getByIdUser);

// Se utilizará para crear una nueva actividad en el grupo especificado.
router.post("/:idGrupo/actividad", ActividadController.create);

// Agregar calificacion
router.post("/calificacion/", ActividadController.agregarCalificacion)

// Ruta para actualizar una actividad existente
router.put("/:idGrupo/actividad/:idActividad", ActividadController.update);

// Ruta para eliminar una actividad existente
router.delete("/:idGrupo/actividad/:idActividad", ActividadController.delete);




export default router;
