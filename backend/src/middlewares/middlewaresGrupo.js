import { grupoModel } from '../models/grupoModel.js';
import { usuarioModel } from '../models/usuarioModel.js';
import jsonwebtoken from "jsonwebtoken";

export const existeGrupo = async (req, res, next) => {
    const { claveGrupo } = req.body;
    const grupo = await grupoModel.existeGrupo(claveGrupo)

    if (!grupo)
        return res.status(202).json({ error: "No existe este grupo" });

    req.idGrupo = grupo.id;
    next();
};

export const existeCorreo = async (req, res, next) => {
    const data = jsonwebtoken.verify(req.body.token,"contrasena") 
    const usuario = await usuarioModel.getByEmail(data.correo)

    if (!usuario)
        return res.status(202).json({ error: "Usuario no encontrado" });

    // Almacena el ID del usuario en req
    req.idUsuario = usuario.id;
    next();
};

export const existeRegistro = async (req, res, next) => {
    const { idGrupo, idUsuario } = req;

    const inscripcion = await grupoModel.existeRegistro(Number(idGrupo), Number(idUsuario))

    if (inscripcion) {
        return res.status(202).json({ error: "El usuario ya está inscrito en este grupo" });
    }
    next();
};
