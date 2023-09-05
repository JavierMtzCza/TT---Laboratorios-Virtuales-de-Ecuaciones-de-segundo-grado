import { Router } from "express";
import { prisma } from "../prisma/conexion.js";

const router = Router()

//Crear actividad
router.post("/:idGrupo", async (req, res) => {
   const actividad = await prisma.actividad.create({
      data: {
         grupoId: parseInt(req.params.idGrupo),
         descripcion: req.body.descripcion
      }
   })
   res.json(actividad)
})

//Listar actividad por medio de un grupo
router.get("/:idGrupo", async (req, res) => {
   const actividades = await prisma.actividad.findMany({
      where: {
         grupoId: parseInt(req.params.idGrupo)
      },
      include: {
         grupo: true,
         preguntas: true
      }
   })
   res.json(actividades)
})


export default router