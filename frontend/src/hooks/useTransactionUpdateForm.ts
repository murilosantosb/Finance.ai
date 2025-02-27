"use client";

// Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatedTransactionSchema } from "@/schemas/transactionSchema";
import { z } from "zod";

//Types
import { TransactionsResponse } from "@/interfaces/transactionType";

// Utils
import realToCents from "@/utils/realToCents";

// Hooks
import { useSession } from "next-auth/react";
import { setGlobalStatusMessage } from "./useStatusMessage";
import transactionStore from "@/store/transactionStore";
import { useFetch } from "./useFetch";
import pagesStore from "@/store/pagesStore";


type FormData = z.infer<typeof updatedTransactionSchema>;

export const useTransactionUpdateForm = (_id: string | undefined) => {
    const { data: user } = useSession();
    const { setTransactions } = transactionStore();
    const { page } = pagesStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(updatedTransactionSchema),
        defaultValues: {
            title: "",
            category: undefined,
            payment_method: undefined,
            date: new Date(),
            userId: "",
        }
    })

    const { refetch: updateTransaction } = useFetch({
        endpoint: _id ? `/transaction/${_id}` : "",
        method: "PATCH",
        autoFetch: false,
    })

    const { refetch: getUserTransactions } = useFetch<TransactionsResponse>({
        endpoint: `/transaction/user/${user?.user.googleId}?page=${page}`,
        method: "GET",
        autoFetch: false,
    })

    const onSubmit = async (data: FormData) => {
        try {
            if(!data.amount) {
                console.error("Não foi possível obter os dados.");
                return;
            }

            const updatedData = {
                title: data.title,
                payment_method: data.payment_method, 
                category: data.category,
                date: data.date ? new Date(data.date).toISOString() : null,
                amount: Number(realToCents({variant: "real_to_cents", money: data.amount})),
                userId: user?.user.googleId,
            };

            console.log("Dados atualizados:", updatedData);

            const { data: responseData } = await updateTransaction(updatedData);

            if(responseData) {
                const updatedUserData = await getUserTransactions();

                if(updatedUserData.data?.userTransactions) {
                    setTransactions(updatedUserData.data.userTransactions);
                }
            };

            setGlobalStatusMessage("success");
            
        } catch (error) {
            console.error("Erro ao tenta atualizar a transação", error);
        }
    }

    return { register, handleSubmit, errors, setValue, onSubmit, watch }
}