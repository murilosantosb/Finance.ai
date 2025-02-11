import { create } from "zustand";
import { TransactionItemProps } from "@/interfaces/transactionType";

interface TransactionProps {
    transactions: TransactionItemProps[];
    addTransactions: (transaction: TransactionItemProps) => void;
    setTransactions: (transactions: TransactionItemProps[]) => void;
}

const transactionStore = create<TransactionProps>((set) => ({
   transactions: [],

   addTransactions: (trasaction) => set((state) => ({
        transactions: [trasaction, ...state.transactions]
   })),

   setTransactions: (transaction) => set(() => ({
        transactions: transaction,
   })),

}))

export default transactionStore;

