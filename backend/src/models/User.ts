import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String},
    googleId: { type: String, default: null },
},
{
    timestamps: true
}
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;