import UserModel from "../models/User";
import TransactionModel from "../models/Transaction";
import CategoryModel from "../models/Category";
import { Request, Response } from "express";
import mongoose from "mongoose";

export async function createTransaction(req: Request, res: Response): Promise<void> {
    try {
        const { title, userId, financial_category, category, amount, payment_method, date } = req.body;

        const user = await UserModel.findOne({ googleId: userId });
        
        if(!user) {
            res.status(404).json({ errors: ["Usuário não encontrado!"] });
            console.error("Não foi possível identificar o usuário.");
            return;
        };

        let updateFields: any = {};

        if(financial_category === "GAIN") {
           updateFields.$inc = { balance: amount, revenue: amount };
        }else if(financial_category === "SPENT") {
            updateFields.$inc = { balance: -amount, expenses: amount };
        }else if (financial_category === "INVESTMENT") {
            updateFields.$inc = { balance: -amount, investment: amount };
        };

        await UserModel.updateOne({ googleId: userId }, updateFields);

        if(!category) {
            res.status(400).json({ errors: ["A categoria é obrigatória!"] });
            return;
        }

        let existingCategory = await CategoryModel.findOne({ userId, name: category });

        if(!existingCategory) {
            existingCategory = await CategoryModel.create({
                userId,
                amount,
                name: category.trim(),
            })
        }else {
            await CategoryModel.updateOne(
                { userId: userId, name: category },
                { $inc: { amount: amount } },
            );
        };

        const newTransaction = await TransactionModel.create({
            userId,
            title,
            financial_category,
            category,
            amount,
            payment_method,
            date,
        });

        res.status(201).json({ message: "Transição criada com sucesso.", newTransaction});
        return;
    } catch (error) {
        console.error("Não foi possível criar a transição.", error);
        res.status(500).json({ errors: ["Erro do servido, tente novamente!"]});
        return;
    }
}


export async function getUserTransactionsById(req: Request, res: Response) {
    try {
        const { googleId } = req.params;
        const { page = "1", limit = "14" } = req.query;

        const user = await UserModel.findOne({ googleId });

        if(!user) {
            console.error("Erro ao encontrar usuário.");
            res.status(404).json({ errors: ["Usuário não encontrado."] });
            return;
        }

        const transactionsLimit = Math.max(Number(limit), 1);
        const currentPage = Math.max(Number(page), 1);
        const skip = (currentPage - 1) * transactionsLimit;

        const totalTransacions = await TransactionModel.countDocuments({ userId: googleId });
        
        const userTransactions = await TransactionModel.find({ userId: googleId })
            .sort({ date: -1 })
            .skip(skip)
            .limit(transactionsLimit)
            .exec();
            
        res.status(200).json({
            userTransactions: userTransactions,
            totalPages: Math.ceil(totalTransacions / transactionsLimit),
            totalTransacions,
            currentPage,
            hasNextPage: skip + transactionsLimit < totalTransacions,
            hasPrevPage: currentPage > 1,
        })    

    } catch (error) {
        console.error("Erro ao tentar encontrar transações do usuário", error);
        res.status(500).json({ errors: ["Erro do servidor, tente novamente!"] })
    }
}

export const deleteTransactionById = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        
        const transaction = await TransactionModel.findById(_id);

        if(!transaction) {
            res.status(404).json({ message: ["A transação não foi encontrada!"] });
            return;
        }

        let updateFields: any = {};

        if(transaction.financial_category === "GAIN") {
            updateFields.$inc = { revenue: -transaction.amount };
        }else if(transaction.financial_category === "SPENT") {
            updateFields.$inc = { expenses: -transaction.amount };
        }else {
            updateFields.$inc = { investment: -transaction.amount };
        };

        await UserModel.updateOne({ googleId: transaction.userId }, updateFields);

        const category = await CategoryModel.findOne({ userId: transaction.userId, name: transaction.category });

        if(!category) {
            res.status(404).json({ message: ["A categoria não foi encontrada."] });
            return;
        }

        await CategoryModel.updateOne(
            { userId: transaction.userId, name: transaction.category },
            { $inc: { amount: -transaction.amount } },
        );

        const deleteTransaction = await TransactionModel.findByIdAndDelete(_id);

        res.status(200).json({ message: ["Transação excluída com sucesso"], transaction: deleteTransaction });
        return;
    } catch (error) {
        res.status(500).json({ errors: ["Erro do servidor, tente novamente!"], error });
        return;
    }
}



export const updateTransactionById = async (req: Request, res: Response): Promise<void> => {
    const session = await mongoose.startSession();

    try {
        const { _id } = req.params;
        const { title, category, amount, payment_method, date } = req.body;

        session.startTransaction();

        const transaction = await TransactionModel.findById(_id).session(session);
        if(!transaction) {
            res.status(404).json({ message: ["A transação não foi encontrada."] });
            return;
        }

        // Valores antigos
        const oldAmount = transaction.amount;
        const oldCategory = transaction.category;
        const financialCategory = transaction.financial_category;
        const userId = transaction.userId;

        // Ajustando dados financeiros do usuário
        let balanceUpdate: number = 0;
        let revenueUpdate: number = 0;
        let expensesUpdate: number = 0;
        let investmentUpdate: number = 0;

        const amountDifference = amount - oldAmount;

        if(financialCategory === "GAIN") {
            balanceUpdate = amountDifference;
            revenueUpdate = amountDifference;
        }else if(financialCategory === "SPENT") {
            balanceUpdate = -amountDifference;
            expensesUpdate = amountDifference;
        }else {
            balanceUpdate = -amountDifference;
            investmentUpdate = amountDifference;
        }

        await UserModel.updateOne(
            { googleId: userId },
            {
                $inc: {
                    balance: balanceUpdate,
                    revenue: revenueUpdate,
                    expenses: expensesUpdate,
                    investment: investmentUpdate,
                }
            }
        ).session(session);

        // Atualizando categorias
        if(oldCategory !== category) {
            await CategoryModel.updateOne(
                { userId, name: oldCategory },
                { $inc: { amount: -oldAmount } }
            ).session(session);

            await CategoryModel.updateOne(
                { userId, name: category },
                { $inc: { amount: amount } },
                { upsert: true }
            ).session(session);

        }else if(oldAmount !== amount) {
            await CategoryModel.updateOne(
                { userId, name: category },
                { $inc: { amount: amountDifference } }
            ).session(session);
        }

        const updateTransaction = {
            title,
            category,
            amount,
            payment_method,
            date,
        };

        await TransactionModel.findByIdAndUpdate(_id, updateTransaction).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Transação atualizada com sucesso", transaction: updateTransaction });
        return;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ errors: ["Erro no servidor, tente novamente!"], error });
        return;
    }
}
