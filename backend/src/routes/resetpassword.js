import express from "express";
import { CambioContrasenaController } from "../controllers/resetpasswordController.js";

const cambioContrasenaRouter = express.Router();

// Ruta para buscar un usuario por su correo y enviarle un código de cambio de contraseña
cambioContrasenaRouter.post("/solicitar", CambioContrasenaController.buscarUsuarioPorCorreo);

// Ruta para verificar el código y actualizar la contraseña
cambioContrasenaRouter.patch("/verificar", CambioContrasenaController.verificarCodigo);

// Ruta para reenviar el código de cambio de contraseña
cambioContrasenaRouter.post("/reenviar", CambioContrasenaController.reenviarCodigo);

// Ejemplo de ruta para obtener información sobre una solicitud de cambio de contraseña

export default cambioContrasenaRouter;


