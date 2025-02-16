import UserModel from "../models/User";
import CategoryModel from "../models/Category";
import { Request, Response } from "express";

export async function getUserIdCategories(req: Request, res: Response): Promise<void> {
   try {
    const { googleId } = req.params;

    const categories = await CategoryModel.find({ userId: googleId })
        .limit(4)
        .sort({ amount: -1 })
        .exec();

    if(!categories.length) {
        res.status(404).json({ message: ["O usuário ainda não fez nenhuma transação."] });
        return;
    }

     res.status(200).json({ categories: categories })
     return;
   } catch (error) {
     res.status(500).json({ errors: ["Problema do servidor, tente novamente!"] });
     return;
   }; 
};