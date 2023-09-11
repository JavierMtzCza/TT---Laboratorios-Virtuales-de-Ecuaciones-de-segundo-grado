import { Router } from "express";
import { actividadController } from "../controllers/actividadController.js";

const router = Router()

//Crear actividad
router.post("/:idGrupo", actividadController.create)

//Listar actividad por medio de un grupo
router.get("/:idGrupo", actividadController.getAll)


export default router