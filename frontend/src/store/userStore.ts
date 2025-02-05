import { create } from "zustand";
import { UserState } from "@/interfaces/userType";


const userStore = create<UserState>((set) => ({
    user: {
        name: "",
        email: "",
        image: "",
        id: "",
        googleId: {},
        balance: 0,
        investment: 0,
        revenue: 0,
        expenses: 0,
    },

    getUserData: (user) => set((state) => ({
        user: { ...state.user, ...user },
    })),

}));

export default userStore;

