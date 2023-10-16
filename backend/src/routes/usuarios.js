import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { esCorreo, validarEsquema, validaErrores, existeCorreo, existeUsuario } from "../middlewares/middlewaresUsuario.js";

const router = Router()

//PASS: Consultar usuarios
router.get("/", usuarioController.getAll)

//PASS: Consultar usuario por Correo
router.get("/:correo", esCorreo, validaErrores, existeCorreo, usuarioController.getByEmail)

//PASS: Crear usuario
router.post("/", validarEsquema, validaErrores, existeUsuario, usuarioController.create)

//PASS: Modificar usuario
router.patch("/:correo", esCorreo, validaErrores, existeCorreo, usuarioController.update)

//PASS: Consultar los grupos a los que pertenece ese usuario
router.get("/grupos/:correo", esCorreo, validaErrores, existeCorreo, usuarioController.getGroups)

//PASS: Logeo de un usuario
//router.get("/:correo/:contrasena", esCorreo, validaErrores, existeCorreo, usuarioController.login)
router.get("/:correo/:hash", esCorreo, validaErrores, existeCorreo, usuarioController.login)
router.get("/:correo/:salt", esCorreo, validaErrores, existeCorreo, usuarioController.login)


export default router