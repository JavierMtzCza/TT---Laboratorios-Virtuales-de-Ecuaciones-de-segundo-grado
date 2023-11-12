import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import { CambioContrasenaModel } from "../models/resetpasswordModel.js";

export const resetpasswordController = async (req, res) => {
  const { correo } = req.body;

  const usuario = await usuarioModel.getByEmail(correo);
  if (!usuario) {
    return res.status(400).json({ error: "Correo electrónico no válido" });
  }

  const codigoVerificacion = Math.random().toString(36).slice(2, 5);
  const codigoVerificacionCifrado = await bcrypt.hash(codigoVerificacion, 10);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ikinnegameplays@gmail.com", // Cambiar por tu usuario de Gmail
      pass: " ", // Cambiar por tu contraseña de Gmail
    },
  });

  await transport.sendMail({
    to: correo,
    subject: "Código de verificación",
    text: `Su código de verificación es: ${codigoVerificacion}`,
  });

  await CambioContrasenaModel.create({ correo }); // Crear la solicitud de cambio de contraseña

  res.json({ message: "Se ha enviado un código de verificación a su correo electrónico." });
};
