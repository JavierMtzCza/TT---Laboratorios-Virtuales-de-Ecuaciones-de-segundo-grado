import { rolModel } from "../models/rolModel.js";

export class rolController {

    static async create(req,res) {
        const rol = await rolModel.create(req.body)
        res.json(rol)
    }


}