import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    name:   { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
},
{
    timestamps: true,
}
)

const Category = mongoose.model("Category", CategorySchema);

export default Category;