
// Model
import UserModel from "../models/User";
// Express
import { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<void>{
  try {
    const { name, email, image, googleId } = req.body;

    let user = await UserModel.findOne({ email });

    if(!user) {
      user = await UserModel.create({
        name,
        email,
        image,
        googleId,
        balance: 0,
        investment: 0,
        revenue: 0,
        expenses: 0,
      });
      await user.save();
      res.status(201).json({ message: "Usuário criado com sucesso.", user });
      return;
    }

    res.status(200).json({ message: "Login bem-sucedido.", user })
    return;
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    res.status(500).json({ errors: "Erro no servido, tente novamente!"});
    return;
  }
}



export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { googleId } = req.params;

    // Buscar usuário pelo email
    const user = await UserModel.findOne({ googleId });

    if (!user) {
        res.status(404).json({ errors: ["Usuário não encontrado!"] });
        return;
    }

     res.status(200).json({ user });
     return;
  } catch (error) {
     console.error("Erro ao buscar usuário:", error);
     res.status(500).json({ errors: "Erro ao buscar usuário." });
     return;
  }
}


export async function getFinanceOfUser(req: Request, res: Response): Promise<void> {
  try {
    const { googleId } = req.params;

    // Buscar usuário pelo email
    const user = await UserModel.findOne({ googleId }).select("balance investment revenue expenses");

    if (!user) {
        res.status(404).json({ errors: ["Usuário não encontrado!"] });
        return;
    }

     res.status(200).json({ user });
     return;
  } catch (error) {
     console.error("Erro ao buscar usuário:", error);
     res.status(500).json({ errors: "Erro ao buscar usuário." });
     return;
  }
}

