import { validationResult } from 'express-validator';
import { grupoModel } from '../models/grupoModel.js';
import { usuarioModel } from '../models/usuarioModel.js';
//import { PreguntaCuesModel } from '../models/PreguntaCuesModel.js';


export const validaErrores = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


export const esProfesor = async (req, res, next) => {
    const { usuarioId } = req;
    const usuario = await usuarioModel.findById(usuarioId);

    if (!usuario)
        return res.status(404).json({ error: "Usuario no encontrado" });

    if (usuario.rol !== "profesor")
        return res.status(403).json({ error: "No tienes permisos para realizar esta acción" });

    next();
};

export const esCreadorDeGrupo = async (req, res, next) => {
    const { idGrupo } = req.params;
    const { usuarioId } = req;

    const grupo = await grupoModel.findById(idGrupo);

    if (!grupo)
        return res.status(404).json({ error: "No existe este grupo" });

    if (grupo.creadorId !== usuarioId)
        return res.status(403).json({ error: "No eres el creador de este grupo" });

    next();
};

export const middlewareEditarCuestionario = [
    existeGrupo,
    validaErrores,
    esProfesor,
    esCreadorDeGrupo,
];