import { usuarioModel } from "../models/usuarioModel.js"
import jsonwebtoken from "jsonwebtoken";
import {CambioContrasenaController} from "../controllers/resetpasswordController.js";
import {CambioContrasenaModel} from "../models/resetpasswordModel.js";
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
      try {
         const usuario = await usuarioModel.create(req.body);
   
         // Generar código de validación y asociarlo con el usuario
         const { codigo } = await CambioContrasenaModel.createSolicitud(usuario.correo);
   
         // Enviar el código de validación por correo electrónico
         await CambioContrasenaController.enviarCodigoPorCorreo(usuario.correo, codigo);
   
         res.json({ mensaje: "Usuario creado exitosamente. Se ha enviado un código de validación al correo electrónico." });
      } catch (error) {
         console.error("Error al crear usuario con código de validación:", error);
         res.status(500).json({ mensaje: "Error interno del servidor." });
      }
   }

   static async verificarCodigo(req, res) {
      try {
        const { correo, codigo } = req.body;
    
        // Obtener el usuario y verificar que el código sea válido
        const esCodigoValido = await CambioContrasenaModel.verificarCodigo(correo, codigo);
    
        if (esCodigoValido) {
          // Actualizar el campo verificado del usuario a true
          const esStatusActualizado = await CambioContrasenaModel.actualizarStatus(correo, codigo);
    
          if (esStatusActualizado) {
            // Desactivar el código para que no pueda ser utilizado nuevamente
            await CambioContrasenaModel.desactivarCodigo(correo, codigo);
    
            res.json({ mensaje: "Cuenta verificada con éxito" });
          } else {
            res.status(400).json({ mensaje: "Error al actualizar el estado de verificación del usuario" });
          }
        } else {
          res.status(400).json({ mensaje: "Código no válido o expirado" });
        }
      } catch (error) {
        console.error("Error al verificar el código y actualizar la contraseña:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
      }
    }

   // Modificar usuario
   static async update(req, res) {
      const usuario = await usuarioModel.update(req.correo, req.usuario, req.body)

      if (usuario.id)
         res.json({ token: jsonwebtoken.sign(usuario, "contrasena"), perfil: { id: usuario.id, nombre: usuario.nombre, apellido_paterno: usuario.apellido_paterno, apellido_materno: usuario.apellido_materno, correo: usuario.correo } })
      else
         res.json({ error: 'error al conectar con la base de datos' })
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
      const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);

      if (passwordMatch)
         res.json({ token: jsonwebtoken.sign(usuario, "contrasena"), perfil: { id: usuario.id, nombre: usuario.nombre, apellido_paterno: usuario.apellido_paterno, apellido_materno: usuario.apellido_materno, correo: usuario.correo } })
      else
         res.json({ error: 'la contrasena no coincide' })
   }



}

