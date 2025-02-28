"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    image: zod_1.z.string().url().optional(),
    googleId: zod_1.z.string().nullable(),
    balance: zod_1.z.number().min(0).optional(),
    investment: zod_1.z.number().min(0).optional(),
    revenue: zod_1.z.number().min(0).optional(),
    expenses: zod_1.z.number().optional(),
});
