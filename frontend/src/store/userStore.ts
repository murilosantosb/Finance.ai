import { create } from "zustand"
import { userProps } from "@/interfaces/user"


interface UserState {
    user: userProps;
    login: (newUser: userProps) => void; 
}

const userStore = create<UserState>((set) => ({
    user: {
        name: "",
        email: "",
        image: "",
    },

    login: (newUser) => set((state) => ({
        user: { ...state.user, ...newUser }
    }))
}))

export default userStore;