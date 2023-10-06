import { validationResult } from 'express-validator';
import { grupoModel } from '../models/grupoModel.js';
import { usuarioModel } from '../models/usuarioModel.js';

export const existeGrupo = async (req, res, next) => {
    const { idGrupo } = req.params;
    const idGrupoNumerico = Number(idGrupo);

    if (!Number.isInteger(idGrupoNumerico))
        return res.status(404).json({ error: "El parametro idGrupo no es un entero" });

    const grupo = await grupoModel.existeGrupo(Number(idGrupo))

    if (!grupo)
        return res.status(404).json({ error: "No existe este grupo" });

    next();
};

export const existeCorreo = async (req, res, next) => {
    const usuario = await usuarioModel.getByEmail(req.params.correo)

    if (!usuario)
        return res.status(404).json({ error: "Usuario no encontrado" });

    // Almacena el ID del usuario en req
    req.usuarioId = usuario.id;

    next();
};

export const existeRegistro = async (req, res, next) => {
    const { idGrupo } = req.params;
    const { usuarioId } = req;

    const inscripcion = await grupoModel.existeRegistro(Number(idGrupo), Number(usuarioId))

    if (inscripcion) {
        return res.status(400).json({ error: "El usuario ya está inscrito en este grupo" });
    }
    next();
};


export const validaErrores = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};