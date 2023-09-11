import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const router = Router()

// Consultar usuarios
router.get("/", usuarioController.getAll)

// Consultar usuario por Correo
router.get("/:correo", usuarioController.getByEmail)

// Crear usuario
router.post("/", usuarioController.create)

// Modificar usuario
router.patch("/:correo", usuarioController.update)

router.get("/grupos/:id", usuarioController.getGroups)

//Logeo de un usuario
router.get("/:correo/:contrasena", usuarioController.login)


export default router