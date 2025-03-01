"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionById = exports.deleteTransactionById = void 0;
exports.createTransaction = createTransaction;
exports.getUserTransactionsById = getUserTransactionsById;
const User_1 = __importDefault(require("../models/User"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Category_1 = __importDefault(require("../models/Category"));
const mongoose_1 = __importDefault(require("mongoose"));
function createTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        try {
            const { title, userId, financial_category, category, amount, payment_method, date } = req.body;
            session.startTransaction();
            const user = yield User_1.default.findOne({ googleId: userId }).session(session);
            if (!user) {
                res.status(404).json({ errors: ["Usuário não encontrado!"] });
                console.error("Não foi possível identificar o usuário.");
                return;
            }
            let updateFields = {};
            if (financial_category === "GAIN") {
                updateFields.$inc = { balance: amount, revenue: amount };
            }
            else if (financial_category === "SPENT") {
                updateFields.$inc = { balance: -amount, expenses: amount };
            }
            else if (financial_category === "INVESTMENT") {
                updateFields.$inc = { balance: -amount, investment: amount };
            }
            yield User_1.default.updateOne({ googleId: userId }, updateFields).session(session);
            if (!category) {
                res.status(400).json({ errors: ["A categoria é obrigatória!"] });
                return;
            }
            let existingCategory = yield Category_1.default.findOne({ userId: userId, name: category }).session(session);
            if (!existingCategory) {
                yield Category_1.default.create({
                    userId: userId,
                    amount: amount,
                    name: category,
                });
            }
            else {
                yield Category_1.default.updateOne({ userId: userId, name: category }, { $inc: { amount: amount } }).session(session);
            }
            ;
            // Criar transação
            const newTransaction = yield Transaction_1.default.create([{ userId, title, financial_category, category, amount, payment_method, date }], { session });
            yield session.commitTransaction();
            session.endSession();
            res.status(201).json({ message: "Transação criada com sucesso.", newTransaction });
            return;
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            console.error("Não foi possível criar a transação.", error);
            res.status(500).json({ errors: ["Erro no servidor, tente novamente!"] });
            return;
        }
    });
}
function getUserTransactionsById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { googleId } = req.params;
            const { page = "1", limit = "14" } = req.query;
            const user = yield User_1.default.findOne({ googleId });
            if (!user) {
                console.error("Erro ao encontrar usuário.");
                res.status(404).json({ errors: ["Usuário não encontrado."] });
                return;
            }
            const transactionsLimit = Math.max(Number(limit), 1);
            const currentPage = Math.max(Number(page), 1);
            const skip = (currentPage - 1) * transactionsLimit;
            const totalTransacions = yield Transaction_1.default.countDocuments({ userId: googleId });
            const userTransactions = yield Transaction_1.default.find({ userId: googleId })
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
            });
        }
        catch (error) {
            console.error("Erro ao tentar encontrar transações do usuário", error);
            res.status(500).json({ errors: ["Erro do servidor, tente novamente!"] });
        }
    });
}
const deleteTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const transaction = yield Transaction_1.default.findById(_id);
        if (!transaction) {
            res.status(404).json({ message: ["A transação não foi encontrada!"] });
            return;
        }
        let updateFields = {};
        if (transaction.financial_category === "GAIN") {
            updateFields.$inc = { revenue: -transaction.amount };
        }
        else if (transaction.financial_category === "SPENT") {
            updateFields.$inc = { expenses: -transaction.amount };
        }
        else {
            updateFields.$inc = { investment: -transaction.amount };
        }
        ;
        yield User_1.default.updateOne({ googleId: transaction.userId }, updateFields);
        const category = yield Category_1.default.findOne({ userId: transaction.userId, name: transaction.category });
        if (!category) {
            res.status(404).json({ message: ["A categoria não foi encontrada."] });
            return;
        }
        yield Category_1.default.updateOne({ userId: transaction.userId, name: transaction.category }, { $inc: { amount: -transaction.amount } });
        const deleteTransaction = yield Transaction_1.default.findByIdAndDelete(_id);
        res.status(200).json({ message: ["Transação excluída com sucesso"], transaction: deleteTransaction });
        return;
    }
    catch (error) {
        res.status(500).json({ errors: ["Erro do servidor, tente novamente!"], error });
        return;
    }
});
exports.deleteTransactionById = deleteTransactionById;
const updateTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        const { _id } = req.params;
        const { title, category, amount, payment_method, date } = req.body;
        session.startTransaction();
        const transaction = yield Transaction_1.default.findById(_id).session(session);
        if (!transaction) {
            res.status(404).json({ message: ["A transação não foi encontrada."] });
            return;
        }
        // Valores antigos
        const oldAmount = transaction.amount;
        const oldCategory = transaction.category;
        const financialCategory = transaction.financial_category;
        const userId = transaction.userId;
        // Ajustando dados financeiros do usuário
        let balanceUpdate = 0;
        let revenueUpdate = 0;
        let expensesUpdate = 0;
        let investmentUpdate = 0;
        const amountDifference = amount - oldAmount;
        if (financialCategory === "GAIN") {
            balanceUpdate = amountDifference;
            revenueUpdate = amountDifference;
        }
        else if (financialCategory === "SPENT") {
            balanceUpdate = -amountDifference;
            expensesUpdate = amountDifference;
        }
        else {
            balanceUpdate = -amountDifference;
            investmentUpdate = amountDifference;
        }
        yield User_1.default.updateOne({ googleId: userId }, {
            $inc: {
                balance: balanceUpdate,
                revenue: revenueUpdate,
                expenses: expensesUpdate,
                investment: investmentUpdate,
            }
        }).session(session);
        // Atualizando categorias
        if (oldCategory !== category) {
            yield Category_1.default.updateOne({ userId, name: oldCategory }, { $inc: { amount: -oldAmount } }).session(session);
            yield Category_1.default.updateOne({ userId, name: category }, { $inc: { amount: amount } }, { upsert: true }).session(session);
        }
        else if (oldAmount !== amount) {
            yield Category_1.default.updateOne({ userId, name: category }, { $inc: { amount: amountDifference } }).session(session);
        }
        const updateTransaction = {
            title,
            category,
            amount,
            payment_method,
            date,
        };
        yield Transaction_1.default.findByIdAndUpdate(_id, updateTransaction).session(session);
        yield session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "Transação atualizada com sucesso", transaction: updateTransaction });
        return;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.status(500).json({ errors: ["Erro no servidor, tente novamente!"], error });
        return;
    }
});
exports.updateTransactionById = updateTransactionById;
