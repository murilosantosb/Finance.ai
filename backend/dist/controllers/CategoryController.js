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
exports.getUserIdCategories = getUserIdCategories;
const Category_1 = __importDefault(require("../models/Category"));
function getUserIdCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { googleId } = req.params;
            const categories = yield Category_1.default.find({ userId: googleId })
                .limit(4)
                .sort({ amount: -1 })
                .exec();
            if (!categories.length) {
                res.status(404).json({ message: ["O usuário ainda não fez nenhuma transação."] });
                return;
            }
            res.status(200).json({ categories: categories });
            return;
        }
        catch (error) {
            res.status(500).json({ errors: ["Problema do servidor, tente novamente!"] });
            return;
        }
        ;
    });
}
;
