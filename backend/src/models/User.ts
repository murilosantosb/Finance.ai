import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String},
    googleId: {type: String, required: true},
    balance: { type: Number, default: 0 },
    investment: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    expenses: { type: Number, default: 0 }
},
{
    timestamps: true
}
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;