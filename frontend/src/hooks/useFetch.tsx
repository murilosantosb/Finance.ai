"use client";

import { useState, useEffect, useTransition } from "react";
import apiRequest from "@/utils/apiRequest";
import { apiRequestProps } from "@/interfaces/apiType";

export function useFetch<T>({ endpoint, method, body, autoFetch = true }: apiRequestProps) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        startTransition(async () => {
            setError(null);

            try {
                const requestResult = await apiRequest({ endpoint, method, body, autoFetch });
                setData(requestResult);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Erro desconhecido.');
            }
        })
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [endpoint, method, body, autoFetch, fetchData]);

    return { data, isPending, error, refetch: fetchData }
}