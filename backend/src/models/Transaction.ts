import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    financial_category: { type: String, enum: ["GAIN", "SPENT", "INVESTMENT"], required: true },
    category: { type: String, enum: ["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"] },
    amount: { type: Number, required: true },
    payment_method: { type: String, enum: ["PIX", "CARD", "BILLET"], required: true },
    date: { type: Date, required: true },
},
{
    timestamps: true,
}
)

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

export default TransactionModel;