import { create } from "zustand";
import { PercentagesProps } from "@/interfaces/percentagesTypes";


const percentagesStore = create<PercentagesProps>((set) => ({
    percentages: {
        gain: 0,
        spent: 0,
        investment: 0,
    },
    
    calculateUserPencentages: (percentage) => set((state) => ({
        percentages: { ...state.percentages, ...percentage },
    }))
}))

export default percentagesStore;