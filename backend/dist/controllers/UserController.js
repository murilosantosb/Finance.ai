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
exports.login = login;
exports.getUserById = getUserById;
exports.getFinanceOfUser = getFinanceOfUser;
// Model
const User_1 = __importDefault(require("../models/User"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, image, googleId } = req.body;
            let user = yield User_1.default.findOne({ email });
            if (!user) {
                user = yield User_1.default.create({
                    name,
                    email,
                    image,
                    googleId,
                    balance: 0,
                    investment: 0,
                    revenue: 0,
                    expenses: 0,
                });
                yield user.save();
                res.status(201).json({ message: "Usuário criado com sucesso.", user });
                return;
            }
            res.status(200).json({ message: "Login bem-sucedido.", user });
            return;
        }
        catch (error) {
            console.error("Erro ao buscar usuário", error);
            res.status(500).json({ errors: "Erro no servido, tente novamente!" });
            return;
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { googleId } = req.params;
            // Buscar usuário pelo email
            const user = yield User_1.default.findOne({ googleId });
            if (!user) {
                res.status(404).json({ errors: ["Usuário não encontrado!"] });
                return;
            }
            res.status(200).json({ user });
            return;
        }
        catch (error) {
            console.error("Erro ao buscar usuário:", error);
            res.status(500).json({ errors: "Erro ao buscar usuário." });
            return;
        }
    });
}
function getFinanceOfUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { googleId } = req.params;
            // Buscar usuário pelo email
            const user = yield User_1.default.findOne({ googleId }).select("balance investment revenue expenses");
            if (!user) {
                res.status(404).json({ errors: ["Usuário não encontrado!"] });
                return;
            }
            res.status(200).json({ user });
            return;
        }
        catch (error) {
            console.error("Erro ao buscar usuário:", error);
            res.status(500).json({ errors: "Erro ao buscar usuário." });
            return;
        }
    });
}
