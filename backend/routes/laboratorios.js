import { Router } from "express";
import { prisma } from "../prisma/conexion.js"
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = Router()

//Crear laboratorios
router.post("/", upload.single('imagen'), async (req, res) => {
   const laboratorio = await prisma.laboratorio.create({
      data: {
         nombre: req.body.nombre,
         descripcion: req.body.descripcion,
         imagen: req.file.buffer
      }
   })
   res.send(laboratorio)
})

//Listar laboratorios
router.get("/", async (req, res) => {
   const laboratorios = await prisma.laboratorio.findMany()
   res.send(laboratorios)
})




export default router