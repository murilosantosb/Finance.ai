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
import { UserFinanceProps } from "@/interfaces/userType"
// Hooks
import { useSession } from "next-auth/react";
import transactionStore from "@/store/transactionStore";
import userStore from "@/store/userStore";
import categoriesStore from "@/store/categoriesStore";
//Utils
import realToCents from "@/utils/realToCents";
import { CategoryTypeProps } from "@/interfaces/categoriesType";


export type FormData = z.infer<typeof transactionSchema>;


export const useTransactionForm = (onSuccess: () => void) => {
    const { data: user } = useSession();
    const { setTransactions } = transactionStore();
    const { getFinanceOfUser } = userStore();
    const { setUserCategories } = categoriesStore();

    const { refetch } = useFetch<{ userTransactions: TransactionItemProps[] }>({
        endpoint: user?.user.googleId ? `/transaction/user/${user.user.googleId}?limit=12` : "",
        method: "GET",
        autoFetch: false,
    });
    
    const { refetch: createTransaction } = useFetch<TransactionItemProps>({
        endpoint: "/transaction/create",
        method: "POST",
        autoFetch: false,
    })

    const { refetch: refetchUserFinances, } = useFetch<{ user: UserFinanceProps}>({
        endpoint: user?.user.googleId ? `/users/finances/${user.user.googleId}` : "",
        method: "GET",
        autoFetch: false,
    });

    const { refetch: refetchUserCategories } = useFetch<{ categories: CategoryTypeProps[] }>({
            endpoint: user?.user.googleId ? `/category/${user?.user.googleId}` : "",
            method: "GET",
            autoFetch: false,
        });

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

    const onSubmit = async (data: FormData) => {
        try {
            
            const transactionData = {
                title: data.title,
                payment_method: data.payment_method, 
                financial_category: data.financial_category,
                category: data.category,
                date: data.date ? new Date(data.date).toISOString() : null,
                amount: Number(realToCents({variant: "real_to_cents", money: data.amount})),
                userId: user?.user.googleId,
            };
            
            console.log("Enviando dados para API:", transactionData);

            const { data: responseData } = await createTransaction(transactionData);

            if (responseData) {
                const updatedData = await refetch();
                const updateUserFinances = await refetchUserFinances();
                const updateUserCategory = await refetchUserCategories();

                if(updatedData.data?.userTransactions) {
                    setTransactions(updatedData.data.userTransactions);
                    
                    if(updateUserFinances.data?.user) {
                        getFinanceOfUser(updateUserFinances.data.user);
                    }

                    if(updateUserCategory.data?.categories) {
                        setUserCategories(updateUserCategory.data.categories);
                    }
                }
            }
            
            reset(); 
            onSuccess();
        } catch (error) {
            console.error("Erro ao enviar transação:", error);
        }
    };

    return { register, handleSubmit, errors, setValue, onSubmit, watch };
};
