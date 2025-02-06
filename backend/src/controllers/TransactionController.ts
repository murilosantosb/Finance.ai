import UserModel from "../models/User";
import TransactionModel from "../models/Transaction";
import { Request, Response } from "express";
import mongoose from "mongoose";

export async function createTransaction(req: Request, res: Response): Promise<void> {
    try {
        const { title, userId, type, category, amount, paymentMethod, date } = req.body;

        // const userId = new mongoose.Schema.Types.ObjectId(req.body.userId);
        const user = await UserModel.findOne({ googleId: userId });
        
        if(!user) {
            res.status(404).json({ errors: ["Usuário não encontrado!"] });
            console.error("Não foi possível identificar o usuário.");
            return;
        }

        const newTransaction = await TransactionModel.create({
            userId,
            title,
            type,
            category,
            amount,
            paymentMethod,
            date,
        });
        await newTransaction.save();
        res.status(201).json({ message: "Transição criada com sucesso.", newTransaction });
        return;
    } catch (error) {
        console.error("Não foi possível criar a transição.", error);
        res.status(500).json({ errors: ["Erro do servido, tente novamente!"]});
        return;
    }
}

export async function getUserTransactionsById(req: Request, res: Response): Promise<void> {
    try {
        const { googleId } = req.params;

        const user = await UserModel.findOne({ googleId });
         
        if(!user) {
            console.error("Erro ao encontrar usuário");
            res.status(404).json({ errors: ["Usuário não encontrado"] })
            return;
        };

        const userTransactions = await TransactionModel.find({ userId: googleId })

        if(userTransactions.length === 0) {
            console.log("O usuário ainda não fez nenhuma transação.")
            res.status(200).json({ message: ["O usuário não fez nenhuma transação ainda."] });
            return;
        };

        res.status(200).json({ userTransactions });
        return;
    } catch (error) {
        console.error("Erro ao tenta encontrar transações do usuário:", error);
        res.status(500).json({ errors: ["Erro do servidor, tente novamente!"] });
        return;
    }
}