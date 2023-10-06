import { grupoModel } from "../models/grupoModel.js";

export class grupoController {

   //listar grupos
   static async getAll(req, res) {
      const grupos = await grupoModel.getAll()
      res.json(grupos)
   }

   //Listar integrantes de un grupo
   static async getUsers(req, res) {
      const idGrupo = parseInt(req.params.idGrupo)
      const alumnos = await grupoModel.getUsers(idGrupo)
      res.json(alumnos)
   }

   // Creacion de un grupo
   static async create(req, res) {
      const grupo = await grupoModel.create(req.params.correo, req.body)
      res.json(grupo)
   }

   // Inscripcion de un usuario a un grupo
   static async inscripcion(req, res) {
      const { idGrupo } = req.params
      const { usuarioId } = req;
      const inscripcion = await grupoModel.inscripcion(Number(idGrupo), Number(usuarioId))
      res.json(inscripcion)
   }



}