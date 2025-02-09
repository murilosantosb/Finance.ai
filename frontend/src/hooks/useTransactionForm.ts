"use client";

// Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schemas/transactionSchema";
import { z } from "zod";
//API
import { useFetch } from "./useFetch";
//Types
import { TransactionItemProps } from "@/interfaces/transactionType";
// Hooks
import { useSession } from "next-auth/react";
//Utils
import realToCents from "@/utils/realToCents";


export type FormData = z.infer<typeof transactionSchema>;


export const useTransactionForm = (onSuccess: () => void) => {
    const { data: user } = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            title: "",
            financial_category: undefined,
            category: undefined,
            payment_method: undefined,
            date: new Date(),
            userId: "",
        },
    });

    
    const { refetch } = useFetch<TransactionItemProps>({
        endpoint: "/transaction/create",
        method: "POST",
        autoFetch: false,
    })
    
    const onSubmit = async (data: FormData) => {
        try {
            
            const transactionData = {
                title: data.title,
                payment_method: data.payment_method, 
                financial_category: data.financial_category,
                date: data.date ? new Date(data.date).toISOString() : null,
                amount: realToCents({variant: "real_to_cents", money: data.amount}),
                userId: user?.user.googleId,
            };
            
            console.log("Enviando dados para API:", transactionData);

            await refetch(transactionData);

            reset(); 
            onSuccess();
        } catch (error) {
            console.error("Erro ao enviar transação:", error);
        }
    };

    return { register, handleSubmit, errors, setValue, onSubmit, watch};
};
