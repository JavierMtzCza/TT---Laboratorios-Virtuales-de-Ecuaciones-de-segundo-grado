import { usuarioModel } from "../models/usuarioModel.js"

export class usuarioController {

   static async getAll(req, res) {
      const usuarios = await usuarioModel.getAll()
      //que renderiza
      res.json(usuarios)
   }

   static async getByEmail(req, res) {
      const usuario = await usuarioModel.getByEmail(req.params.correo)
      res.json(usuario)
   }

   static async create(req, res) {
      const usuario = await usuarioModel.create(req.body)
      res.json(usuario)
   }

   static async update(req, res) {
      const usuario = await usuarioModel.update(req.params.correo, req.body)
      res.json(usuario)
   }

   static async getGroups(req, res) {
      const respuesta = await usuarioModel.getGroups(parseInt(req.params.id))
      var grupos = []

      respuesta.grupos.forEach((elem) =>{
         grupos.push(elem.grupo)
      })

      res.json(grupos)
   }


   static async login(req, res) {
      const { correo, contrasena } = req.params
      const usuario = await usuarioModel.getByEmail(correo)

      if (usuario != null) {
         //validamos la contrasena si encontro al usuario
         if (usuario.contrasena == contrasena)
            res.json(usuario)
         else
            res.json({ error: 'la contrasena no coincide' })
      }
      else {
         //si el usuario es null, significa que no existe un usuario con ese correo
         res.json({ error: 'No hay usuarios' })
      }


   }

}