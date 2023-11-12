import { CambioContrasenaModel } from "../models/resetpasswordModel.js";

function verifyResetPasswordCode(req, res, next) {
  const { correo, codigoVerificacion } = req.body;

  const cambioContrasena = CambioContrasenaModel.verifyCode(correo, codigoVerificacion);

  if (!cambioContrasena) {
    res.status(403).json({ error: "Código de verificación no válido" });
    return;
  }

  next();
}

module.exports = verifyResetPasswordCode;
