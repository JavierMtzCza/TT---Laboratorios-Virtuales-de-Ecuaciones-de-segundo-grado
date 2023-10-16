import { grupoModel } from "../models/grupoModel.js";
import { v1 as uuidv1 } from 'uuid';

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
      const claveGrupo = uuidv1().split("-")[0] //Generamos una clave unica para el grupo
      const grupo = await grupoModel.create(req.params.correo, claveGrupo, req.body)
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