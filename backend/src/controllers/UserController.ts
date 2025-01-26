// Model
import UserModel from "../models/User";
//Express
import { Request, Response } from "express";


export async function login(req: Request, res: Response): Promise<void> {
    
    try {
        const { name, email, image, googleId } = req.body;
        let user = await UserModel.findOne({ googleId: googleId })

        if(!user && email) {
             user = await UserModel.create({
                name: name,
                email: email,
                image: image,
                googleId: googleId,
            })
    
        }
        res.status(201).json({ message: "Usuário logado com sucesso!", user });
    } catch (error) {
        throw new Error("Error ao autenticar o usuário")
    }
}


export async function getUserById(req: Request, res: Response) {

    try {
        const { id: _id } = req.params;

        let user = await UserModel.findById(_id)

        if(user) {
            res.status(200).json({ user })
        }

    } catch (error) {
        res.status(404).json({ errors: "Usuário não encontrado!" })
    }
}