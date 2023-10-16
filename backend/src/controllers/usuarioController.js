import { usuarioModel } from "../models/usuarioModel.js"
import bcrypt from 'bcrypt'

export class usuarioController {

   // Consultar usuarios
   static async getAll(req, res) {
      const usuarios = await usuarioModel.getAll()
      res.json(usuarios)
   }

   // Consultar usuario por Correo
   static async getByEmail(req, res) {
      const usuario = await usuarioModel.getByEmail(req.params.correo)
      res.json(usuario)
   }

   // Crear usuario
   static async create(req, res) {
      const usuario = await usuarioModel.create(req.body)
      res.json(usuario)
   }

   // Modificar usuario
   static async update(req, res) {
      const usuario = await usuarioModel.update(req.params.correo, req.body)
      res.json(usuario)
   }

   // Consultar los grupos a los que pertenece ese usuario
   static async getGroups(req, res) {
      const respuesta = await usuarioModel.getGroups(req.params.correo)
      res.json(respuesta)
   }

   //Logeo de un usuario
   static async login(req, res) {
      const { correo, contrasena } = req.params
      const usuario = await usuarioModel.getByEmail(correo)

      const valido = await bcrypt.compare(contrasena,usuario.contrasena)

      if (valido)
         res.json(usuario)
      else
         res.json({ error: 'la contrasena no coincide' })
   }



}