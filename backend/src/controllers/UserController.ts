
// Model
import UserModel from "../models/User";
// Express
import { Request, Response } from "express";



export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, image, googleId } = req.body;

    // Buscar usuário pelo email
    let user = await UserModel.findOne({ email });
    if(user) {
      console.log("Usuário já encontrado:", user);
      res.status(200).json({ message: "Usuário já logado", user })
      return;
    }
      // Criar novo usuário se não encontrado
      user = await UserModel.create({
        name,
        email,
        image,
        googleId,
      });

      res.status(201).json({ message: "Usuário criando com sucesso", user })
  } catch (error) {
     console.error("Erro no login:", error);
     res.status(500).json({ errors: "Erro ao autenticar o usuário." });
  }
}




export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { id: _id } = req.params;

    // Buscar usuário pelo ID
    const user = await UserModel.findById(_id);

    if (!user) {
       res.status(404).json({ errors: "Usuário não encontrado!" });
    }

     res.status(200).json({ user });
  } catch (error) {
     console.error("Erro ao buscar usuário:", error);
     res.status(500).json({ errors: "Erro ao buscar usuário." });
  }
}
