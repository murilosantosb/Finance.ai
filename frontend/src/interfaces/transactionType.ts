export interface TransactionItemProps {
    title: string;
    payment_method: "PIX" | "CARD" | "BILLET"; 
    financial_category: "GAIN" | "SPENT" | "INVESTMENT";
    date: string | Date | null;
    amount: number | null | undefined;
    category: "Moradia" | "Alimentação" | "Transporte" | "Saúde" | "Lazer" | "Outros";
    userId?: string | undefined;
    _id?: string; 
}  
