import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { validarEsquema, validaErrores, existeCorreo, existeUsuario, FiltrarToken } from "../middlewares/middlewaresUsuario.js";

const router = Router()

//PASS: Consultar usuarios
router.get("/", usuarioController.getAll)

//PASS: Consultar los grupos a los que pertenece ese usuario
router.get("/grupos/:correo", existeCorreo, usuarioController.getGroups)

//PASS: Logeo de un usuario
router.get("/:correo/:contrasena", existeCorreo, usuarioController.login)

//PASS: Consultar usuario por Correo
router.get("/:correo", existeCorreo, usuarioController.getByEmail)

//PASS: Crear usuario
router.post("/", validarEsquema, validaErrores, existeUsuario, usuarioController.create)

//PASS: Modificar usuario
router.patch("/:token", FiltrarToken, usuarioController.update)


export default router