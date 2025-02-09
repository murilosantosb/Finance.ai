"use client";

import { useState, useEffect, useCallback } from "react";
import apiRequest from "@/utils/apiRequest";
import { apiRequestProps } from "@/interfaces/apiType";

export function useFetch<T>({ endpoint, method, body, autoFetch = true }: apiRequestProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = useCallback(async (newBody?: T): Promise<{ data: T | null }> => {
        setIsLoading(true);
        setError(null);

        try {
            const requestResult: T | null = await apiRequest({
                endpoint,
                method,
                body: newBody || body
            });
            
            setData(requestResult);
            return { data: requestResult };
        } catch (error) {
            setError(error instanceof Error ? error.message : "Erro desconhecido.");
        } finally {
            setIsLoading(false);
        }

        return { data };
    }, [data, endpoint, method, body]);

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [fetchData, autoFetch]);

    return { data, isLoading, error, refetch: fetchData };
}
