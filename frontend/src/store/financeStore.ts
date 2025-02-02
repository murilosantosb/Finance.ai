import { create } from "zustand";

interface FinanceState {
    userFinance: {
        balance: number;
        investment: number;
        revenue: number;
        expenses: number;
    }
    updateFinances: (finances: Partial<FinanceState>) => void;
}

const financeStore = create<FinanceState>((set) => ({
    userFinance: {
        balance: 0,
        investment: 0,
        revenue: 0,
        expenses: 0,
    },

    updateFinances: (finances) => set((state) => ({
        ...state,
        ...finances,
    })),
}));

export default financeStore;

