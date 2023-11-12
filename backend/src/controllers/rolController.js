import { rolModel } from "../models/rolModel.js";

export class rolController {

    static async create(req, res) {
        const rol = await rolModel.create(req.body)
        res.json(rol)
    }

    static async getRol(req, res) {
        const { correo, grupo } = req.params
        const rol = await rolModel.getRol(correo, grupo)
        res.json(rol)
    }

}