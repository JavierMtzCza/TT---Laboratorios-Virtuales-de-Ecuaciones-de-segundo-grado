import { Router } from "express";
import { grupoController } from "../controllers/grupoController.js";

const router = Router()

//listar grupos
router.get("/", grupoController.getAll)

//Listar integrantes de un grupo
router.get("/:idGrupo", grupoController.getUsers)

// Creacion de un grupo
router.post('/:idAlumno', grupoController.create)

// Inscripcion de un usuario a un grupo
router.post("/:idGrupo/:idAlumno", grupoController.inscripcion )

export default router