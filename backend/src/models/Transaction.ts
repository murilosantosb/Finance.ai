import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["Gasto", "Ganho", "Investimento", "Depósito", "Saque"], required: true },
    category: { type: String, enum: ["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Outros"], required: true  },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Pix", "Cartão", "Boleto"] },
    date: { type: Date, required: true },
},
{
    timestamps: true,
}
)

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

export default TransactionModel;