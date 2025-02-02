import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String},
    googleId: { type: String, default: null },
    balance: { type: Number, default: 0.000 },
    investment: { type: Number, default: 0.000 },
    revenue: { type: Number, default: 0.000 },
    expenses: { type: Number, default: 0.000 }
},
{
    timestamps: true
}
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;