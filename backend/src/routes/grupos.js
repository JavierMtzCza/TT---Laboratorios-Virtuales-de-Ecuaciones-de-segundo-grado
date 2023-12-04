import { Router } from "express";
import { grupoController } from "../controllers/grupoController.js";
import { existeGrupo, existeCorreo, existeRegistro } from "../middlewares/middlewaresGrupo.js";


const router = Router()

//listar grupos
router.get("/", grupoController.getAll)

//Listar integrantes de un grupo
router.get("/:idGrupo", existeGrupo, grupoController.getUsers)

// Inscripcion de un usuario a un grupo
router.post("/inscripcion", existeGrupo, existeCorreo, existeRegistro, grupoController.inscripcion)

// Creacion de un grupo
router.post('/crear', existeCorreo, grupoController.create)

//Eliminar a un usuario de un grupo
router.delete('/:claveGrupo/:token', existeGrupo, grupoController.deleteUserFromGroup)

//Eliminar un grupo
router.delete('/:claveGrupo', grupoController.delete)

//Ediatar un grupo
router.patch('/:claveGrupo', grupoController.update)

//Listar grupos que contengan %nombre% 
router.get('/:token/:nombre', grupoController.find)



export default router