import { create } from "zustand"
import { userProps } from "@/interfaces/userType"


interface UserState {
    user: userProps;
    login: (newUser: userProps) => void; 
}

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

    login: (newUser) => set((state) => ({
        user: { ...state.user, ...newUser }
    }))
}))

export default userStore;
