//import { CambioContrasenaModel } from "../models/resetpasswordModel.js";

//async function verifyResetPasswordCode(req, res, next) {
  //const { correo, codigoVerificacion } = req.body;

  /*try {
    const cambioContrasena = await CambioContrasenaModel.verifyCode(correo, codigoVerificacion);

    if (!cambioContrasena) {
      return res.status(403).json({ error: "Código de verificación no válido" });
    }

    // Puedemos agregar la información de cambioContrasena al request por  si es necesario para otros middleware
    // o controladores
    req.cambioContrasena = cambioContrasena;

    next();
  } catch (error) {
    console.error("Error en verificar el Codigo:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default verifyResetPasswordCode;
*/