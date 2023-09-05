import { Router } from "express";
import { prisma } from "../prisma/conexion.js";
import { v1 as uuidv1 } from 'uuid';

const router = Router()

// Creacion de un Grupo por medio de un Alumno
router.post('/:idAlumno', async (req, res) => {

   const alumnoId = parseInt(req.params.idAlumno)
   const claveGrupo = uuidv1().split("-")[0] //Generamos una clave unica paa el grupo

   const grupo = await prisma.grupo.create({
      data: {
         clave: claveGrupo,
         ...req.body
      }
   })

   await prisma.usuarios_Grupo.create({
      data: {
         grupoId: grupo.id,
         usuarioId: alumnoId,
         rol: true
      }
   })

   res.json(grupo)
})

//listar grupos
router.get("/listar", async (req, res) => {
   const grupo = await prisma.grupo.findMany()
   res.json(grupo)
})

// Inscripcion de un usuario a un grupo
router.post("/:idGrupo/:idAlumno", async (req, res) => {
   const inscripcion = await prisma.usuarios_Grupo.create({
      data:{
         grupoId:parseInt(req.params.idGrupo),
         usuarioId:parseInt(req.params.idAlumno)
      }
   })
   res.json(inscripcion)
})

//Listar todos los integrantes de un grupo (profesor y alumno)
router.get("/:idGrupo", async (req, res) => {

   const { IdGrupo } = req.params

   const alumnos = await prisma.usuarios_Grupo.findMany({
      where: { grupoId: parseInt(req.params.idGrupo) },
      include: {
         usuario: true
      }
   })
   res.json(alumnos)
})

//Listar todos los alumnos de un grupo
router.get("/alumnos/:idGrupo", async (req, res) => {
   const alumnos = await prisma.usuarios_Grupo.findMany({
      where: {
         grupoId: parseInt(req.params.idGrupo),
         rol: false
      },
      include: { usuario: true }
   })
   res.json(alumnos)
})



export default router