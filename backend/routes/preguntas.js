import { Router } from "express";
import multer from "multer";
import { prisma } from "../prisma/conexion.js";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = Router()

//Creando preguntas de actividad
router.post("/:idActividad", upload.single('multimedia'), async (req, res) => {
   const actividad = await prisma.pregunta.create({
      data: {
         pregunta: req.body.pregunta,
         respuesta: req.body.respuesta,
         consejo: req.body.consejo,
         actividad: { connect: { id: parseInt(req.params.idActividad) } },
         multimedia: req.file.buffer
      }
   })
   res.json(actividad)
})

//Creando preguntas de actividad
router.post("/:idActividad/:idLaboratorio", upload.single('multimedia'), async (req, res) => {
   const actividad = await prisma.pregunta.create({
      data: {
         pregunta: req.body.pregunta,
         respuesta: req.body.respuesta,
         consejo: req.body.consejo,
         actividad: { connect: { id: parseInt(req.params.idActividad) } },
         laboratorio: { connect: { id: parseInt(req.params.idLaboratorio) } },
         multimedia: req.file.buffer
      }
   })
   res.json(actividad)
})



export default router