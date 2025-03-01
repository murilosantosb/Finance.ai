import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    name:   { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
},
{
    timestamps: true,
}
);

CategorySchema.index({ userId: 1, name: 1 }, { unique: true });

const Category = mongoose.model("Category", CategorySchema);

export default Category;