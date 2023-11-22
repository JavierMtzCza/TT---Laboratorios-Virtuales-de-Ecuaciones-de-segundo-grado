import { Router } from "express";
import { rolController } from "../controllers/rolController.js";

const router = Router()

//PASS: Crear un rol en la base de datos
router.post('/', rolController.create )

//NOTE: Saber el rol de un usuario en un grupo
router.get("/:correo/:grupo", rolController.getRol)

export default router