import nodemailer from "nodemailer";
import { CambioContrasenaModel } from "../models/resetpasswordModel.js";

export const resetpasswordController = async (req, res) => {
  const { correo } = req.body;

  try {
    // Obtener el usuario por correo electrónico
    const usuario = await CambioContrasenaModel.getUserByEmail(correo);
    
    if (!usuario) {
      return res.status(400).json({ error: "Correo electrónico no válido" });
    }

    // Obtener el registro de cambio de contraseña asociado al correo
    const cambioContrasena = await CambioContrasenaModel.getCode(correo);

    if (cambioContrasena && cambioContrasena.estado) {
      // El usuario ya tiene un código válido sin usar, reenviar ese código
      const codigoVerificacion = CambioContrasenaModel.generateRandomCode(); // Función para generar el código 

      // Enviar el código de verificación por correo
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ikinnegameplays@gmail.com", // Cambiar por tu usuario de Gmail
          pass: "ndwchcufsgttqmza", // Cambiar por tu contraseña de Gmail
        },
      });

      await transport.sendMail({
        to: correo,
        subject: "Código de Restablecimiento de Contraseña",
        text: `Su código de restablecimiento es: ${codigoVerificacion}`,
      });

      // Actualizar el código y la fecha de caducidad en la base de datos
      await CambioContrasenaModel.update({
        correo,
        codigo: codigoVerificacion,
        fechaCaducidad: new Date(Date.now() + 60 * 1000 * 10), // Actualizar la fecha de caducidad a 10 minutos
        estado: true, // Establecer el estado como verdadero
      });

      res.json({ message: "Se ha reenviado un código de verificación a su correo electrónico." });
    } else {
      // El usuario no tiene un código válido sin usar, proceder a generar uno nuevo
      const codigoVerificacion = CambioContrasenaModel.generateRandomCode();

      // Enviar el código de verificación por correo
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ikinnegameplays@gmail.com", // Cambiar por tu usuario de Gmail
          pass: "ndwchcufsgttqmza", // Cambiar por tu contraseña de Gmail
        },
      });

      await transport.sendMail({
        to: correo,
        subject: "Código de Restablecimiento de Contraseña",
        text: `Su código de restablecimiento es: ${codigoVerificacion}`,
      });

      // Crear la solicitud de cambio de contraseña
      await CambioContrasenaModel.create({ correo });

      res.json({ message: "Se ha enviado un código de verificación a su correo electrónico." });
    }
  } catch (error) {
    console.error("Error en resetpasswordController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};




//ndwchcufsgttqmza