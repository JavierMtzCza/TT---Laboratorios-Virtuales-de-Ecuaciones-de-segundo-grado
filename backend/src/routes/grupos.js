import { Router } from "express";
import { grupoController } from "../controllers/grupoController.js";
import { existeGrupo, existeCorreo, existeRegistro } from "../middlewares/middlewaresGrupo.js";
import { esCorreo, validaErrores } from "../middlewares/middlewaresUsuario.js";

const router = Router()

//listar grupos
router.get("/", grupoController.getAll)

//Listar integrantes de un grupo
router.get("/:idGrupo", existeGrupo, grupoController.getUsers)

// Creacion de un grupo
router.post('/:correo', esCorreo, validaErrores, exiscleateCorreo, grupoController.create)

// Inscripcion de un usuario a un grupo
router.post("/:idGrupo/:correo", existeGrupo, esCorreo, existeCorreo, validaErrores, existeRegistro, grupoController.inscripcion)


export default router