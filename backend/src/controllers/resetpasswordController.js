// cambioContrasenaController.js
import { CambioContrasenaModel } from "../models/resetpasswordModel.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export class CambioContrasenaController {
  // Buscar un usuario por su correo
  static async buscarUsuarioPorCorreo(req, res) {
    try {
      const { correo } = req.body;
      const usuario = await CambioContrasenaModel.getUserByEmail(correo);

      if (usuario) {
        // Generar un código único y guardarlo en la base de datos
        const { cambioContrasena, codigo } = await CambioContrasenaModel.createSolicitud(usuario.correo);

        // Enviar el código al correo del usuario usando nodemailer
        await CambioContrasenaController.enviarCodigoPorCorreo(usuario.correo, codigo);

        res.json({ mensaje: "Código enviado exitosamente al correo del usuario." });
      } else {
        res.status(404).json({ mensaje: "Usuario no encontrado o registrado." });
      }
    } catch (error) {
      console.error("Error al buscar usuario por correo:", error);
      res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }

  // Nueva configuración de nodemailer en el controlador
  static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ikinnegameplays@gmail.com", // <- Cambia aquí
      pass: "ndwchcufsgttqmza", // <- Cambia aquí
    },
  });

  // Nueva función enviarCodigoPorCorreo con credenciales pasadas como parámetros
  static async enviarCodigoPorCorreo(correoDestino, codigo) {
    try {
      // Configurar el correo
      const mailOptions = {
        from: "ikinnegameplays@gmail.com", // <- Cambia aquí
        to: correoDestino,
        subject: "Código de Cambio de Contraseña",
        text: `Tu código de cambio de contraseña es: ${codigo}. Este código caducará en 10 minutos.`,
      };

      // Enviar el correo
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error al enviar el código por correo:", error);
    }
  }

  // Verificar si el código es válido y actualizar la contraseña
  static async verificarCodigo(req, res) {
    try {
      const { correo, codigo, nuevaContrasena, confirmarContrasena } = req.body;
  
      // Verificar que la nueva contraseña y la confirmación coincidan
      if (nuevaContrasena !== confirmarContrasena) {
        return res.status(400).json({ mensaje: "La nueva contraseña y la confirmación no coinciden." });
      }
  
      // Obtener el usuario y verificar que el código sea válido
      const esCodigoValido = await CambioContrasenaModel.verificarCodigo(correo, codigo);
  
      if (esCodigoValido) {
        // Obtener el usuario para comparar con la contraseña actual
        const usuario = await CambioContrasenaModel.getUserByEmail(correo);
  
        // Verificar que la contraseña actual coincida
        const passwordMatch = await bcrypt.compare(nuevaContrasena, usuario.contrasena);
  
        if (passwordMatch) {
          return res.status(400).json({ mensaje: "La nueva contraseña no puede ser igual a la contraseña actual." });
        }
  
        // Actualizar la contraseña del usuario
        const contrasenaHasheada = await bcrypt.hash(nuevaContrasena, 10);
        await CambioContrasenaModel.actualizarContrasena(correo, codigo, contrasenaHasheada);
  
        // Desactivar el código para que no pueda ser utilizado nuevamente
        await CambioContrasenaModel.desactivarCodigo(correo, codigo);
  
        res.json({ mensaje: "Contraseña actualizada con éxito" });
      } else {
        res.status(400).json({ mensaje: "Código no válido o expirado" });
      }
    } catch (error) {
      console.error("Error al verificar el código y actualizar la contraseña:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  // Método para reenviar el código
  static async reenviarCodigo(req, res) {
    try {
      const { correo } = req.body;

      const usuario = await CambioContrasenaModel.getUserByEmail(correo);

      if (usuario) {
        const { cambioContrasena, codigo } = await CambioContrasenaModel.createSolicitud(usuario.correo);

        // Envía el código al correo del usuario
        await CambioContrasenaController.enviarCodigoPorCorreo(usuario.correo, codigo); // <- Cambio aquí

        res.json({ mensaje: "Código reenviado exitosamente al correo del usuario." });
      } else {
        res.status(404).json({ mensaje: "Usuario no encontrado o registrado." });
      }
    } catch (error) {
      console.error("Error al reenviar el código:", error);
      res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }
}


//ndwchcufsgttqmza





