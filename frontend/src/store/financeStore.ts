import { create } from "zustand";

import { UserFinance } from "@/interfaces/userType";
    
interface FinanceState {
    userFinance: UserFinance | null;        
    setUserFinance: (finances: UserFinance) => void;
} 

const financeStore = create<FinanceState>((set) => ({
   userFinance: null,
   setUserFinance: (data) => set({ userFinance: data }),
}));

export default financeStore;

