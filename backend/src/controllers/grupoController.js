import { grupoModel } from "../models/grupoModel.js";
import { v1 as uuidv1 } from 'uuid';
import jsonwebtoken from "jsonwebtoken";

export class grupoController {

   //listar grupos
   static async getAll(req, res) {
      const grupos = await grupoModel.getAll()
      res.json(grupos)
   }

   //Listar integrantes de un grupo
   static async getUsers(req, res) {
      const idGrupo = parseInt(req.params.idGrupo)
      const data = await grupoModel.getUsers(idGrupo)
      const alumnos = []

      if (data.length == 0) {
         res.json({ error: "No hay alumnos inscritos" })
      } else {
         data.forEach((alumno) => { alumnos.push(alumno.Usuario) })
         res.json(alumnos)
      }

   }

   // Creacion de un grupo
   static async create(req, res) {
      const { idUsuario } = req
      const claveGrupo = uuidv1().split("-")[0] //Generamos una clave unica para el grupo
      const grupo = await grupoModel.create(claveGrupo, Number(idUsuario), req.body)
      res.json(grupo)
   }

   // Inscripcion de un usuario a un grupo
   static async inscripcion(req, res) {
      const { idGrupo, idUsuario } = req
      const inscripcion = await grupoModel.inscripcion(Number(idGrupo), Number(idUsuario))
      res.json(inscripcion)
   }

   static async delete(req, res) {
      const { claveGrupo } = req.params
      const grupoEliminado = await grupoModel.eliminarGrupo(claveGrupo)
      res.json(grupoEliminado)
   }

   static async deleteUserFromGroup(req, res) {
      const { claveGrupo, token } = req.params
      const usuario = jsonwebtoken.verify(token, "contrasena")

      const grupo = await grupoModel.existeGrupo(claveGrupo)

      const grupoEliminado = await grupoModel.quitarUsuario(usuario.id, grupo.id)
      res.json(grupoEliminado)
   }

   static async update(req, res) {
      const { claveGrupo } = req.params
      const grupoActualizado = await grupoModel.actualizarGrupo(claveGrupo, req.body)
      res.json(grupoActualizado)
   }

   static async find(req, res) {
      const { nombre } = req.params
      const usuario = jsonwebtoken.verify(req.params.token, "contrasena")
      const gruoposEncontrados = await grupoModel.find(nombre, usuario.id)
      res.json(gruoposEncontrados)
   }

}