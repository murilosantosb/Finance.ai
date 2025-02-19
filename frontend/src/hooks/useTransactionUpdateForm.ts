
// Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatedTransactionSchema } from "@/schemas/transactionSchema";
import { z } from "zod";

//Types
// import { TransactionItemProps } from "@/interfaces/transactionType";

// Utils
import realToCents from "@/utils/realToCents";

// Hooks
import { useSession } from "next-auth/react";
import { setGlobalStatusMessage } from "./useStatusMessage";


type FormData = z.infer<typeof updatedTransactionSchema>;

export const useTransactionUpdateForm = () => {
    const { data: user } = useSession();

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

            setGlobalStatusMessage("success");
            
        } catch (error) {
            console.error("Erro ao tenta atualizar a transação", error);
        }
    }

    return { register, handleSubmit, errors, setValue, onSubmit, watch }
}