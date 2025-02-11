export interface TransactionItemProps {
    title: string;
    payment_method: "PIX" | "CARD" | "BILLET"; 
    financial_category: "GAIN" | "SPENT" | "INVESTMENT" | "DEPOSIT" | "SAKE";
    date: string | Date | null;
    amount: number | null | undefined;
    userId?: string | undefined;
    _id?: string; 
}  
