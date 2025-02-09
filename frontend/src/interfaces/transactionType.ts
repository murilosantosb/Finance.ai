export interface TransactionItemProps {
    title: string;
    payment_method: "PIX" | "CARD" | "BILLET"; 
    financial_category: "GAIN" | "SPENT" | "INVESTMENT" | "DEPOSIT" | "SAKE";
    date: string | Date | null;
    amount: string | number;
    userId?: string | undefined;
    _id?: string; 
}  
