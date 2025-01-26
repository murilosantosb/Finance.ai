import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    googleId: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String},
},
{
    timestamps: true
}
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;