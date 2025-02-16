import { create } from "zustand";
import { CategoryTypeProps } from "@/interfaces/categoriesType";

interface CategoryProps {
    categories: CategoryTypeProps[];
    setUserCategories: (categories: CategoryTypeProps[]) => void;
}

const categoriesStore = create<CategoryProps>((set) => ({
    categories: [],

    setUserCategories: (categories) => set(() => ({
        categories: categories ?? [],
    })),

}))

export default categoriesStore;